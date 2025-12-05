# Payment Flow Architecture (Fixed)

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ESPRESSO SCHEDULES                          │
│                     Payment Flow Architecture                       │
└─────────────────────────────────────────────────────────────────────┘

CLIENT SIDE (Browser)                    SERVER SIDE (API)           EXTERNAL
────────────────────────────────────────────────────────────────────────────
                                                                      
1. ORDER FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━
   User fills form
   (email, water_hardness, 
    daily_shots, serial_number)
            │
            └──→ Validate form client-side
                 ├─ Email format check ✓
                 ├─ Water hardness 1-999 ✓
                 └─ Daily shots 1-99 ✓
                            │
                            ├────→ POST /api/orders
                            │      (status='pending_payment')
                            │            │
                            │            └────→ [Supabase Database]
                            │                   CREATE order
                            │                   status='pending_payment'
                            │                   ✅ Data SAFE here
                            │                            │
                            │      ←──────────────────────
                            │      { success: true, 
                            │        order: {...} }


2. STRIPE REDIRECT
━━━━━━━━━━━━━━━━━
   User has $49 charge pending
   (Not yet paid, only authorized)
            │
            └──→ Clear sessionStorage
                 (No longer needed)
                            │
                            └──→ Redirect to Stripe
                                 https://buy.stripe.com/...
                                        │
                                        │  ⚠️  DANGER ZONE
                                        │  (Browser can crash here)
                                        │  (Network can fail here)
                                        │  (User can abandon here)
                                        │
                                        └────→ [Stripe]
                                               Payment processing
                                                     │


3. PAYMENT CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━
   Stripe returns to success page
   With session_id in URL params
            │
            └──→ /success page loads
                 (useEffect triggers)
                            │
                            └────→ POST /api/orders/confirm
                                   { email, stripe_session_id }
                                        │
                                        └────→ [Supabase]
                                               Find order with
                                               status='pending_payment'
                                               Update → status='paid'
                                               ✅ Payment confirmed
                                                     │
                                               ←──────
                                               { success: true,
                                                 order: {...} }
                            │
                            └──→ Display success message
                                 "✅ Payment Successful!"


4. EDGE CASE: BROWSER CRASH DURING STRIPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   User at Stripe checkout
   Browser/app crashes
            │
            └──→ ❌ Never returns to /success page
                 (Old: Data lost)
                 (NEW: Data SAFE in Supabase) ✅
                            │
                            ├────→ Stripe still processes payment
                            │      (Idempotent, won't charge twice)
                            │            │
                            │            └────→ [Stripe Dashboard]
                            │                   Payment shows PAID
                            │                   session_id recorded
                            │
                            └────→ [Supabase]
                                   Order still exists
                                   status='pending_payment'
                                   
                                   Manual Recovery:
                                   1. Check Stripe dashboard
                                   2. Find matching session_id
                                   3. Query: SELECT * FROM orders
                                             WHERE status='pending_payment'
                                             AND created_at > NOW() - 1 hour
                                   4. Verify payment
                                   5. Update: UPDATE orders SET status='paid'


5. EDGE CASE: DUPLICATE PAYMENT ATTEMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   User submits form twice
            │
            ├────→ POST /api/orders #1
            │      → Order created (status='pending_payment')
            │      → Redirect to Stripe
            │
            └────→ POST /api/orders #2
                   (User clicked submit again)
                   → /api/orders/route.ts checks:
                     "Is this email already in paid orders?"
                   → If YES: Return 409 Conflict
                   → If NO: Create new pending_payment order
                          (Same email, different stripe_session_id)
                   
                   Risk mitigation:
                   - Stripe prevents duplicate charges
                   - Form shows loading state (prevents double-click)
                   - Frontend disables submit button


DATA FLOW SUMMARY
═══════════════════════════════════════════════════════════════

BEFORE FIX (Vulnerable):
Form → sessionStorage → Stripe → /success → Supabase
                    ⚠️ Lost if session dies

AFTER FIX (Safe):
Form → Supabase (pending) → Stripe → /success → Supabase (paid)
       ✅ Data safe immediately ✅ Confirmed later

```

## Database State Timeline

```
T=0:00  Customer submits form
        ├─ POST /api/orders (status='pending_payment')
        └─ Supabase INSERT:
           {
             id: "uuid-123",
             email: "user@example.com",
             water_hardness_ppm: 150,
             daily_shots: 20,
             serial_number: "LM123456",
             status: "pending_payment",    ← KEY: Order exists NOW
             created_at: "2024-01-15T10:00:00Z",
             customer_ip: "192.168.1.1"
           }

T=0:01  Redirect to Stripe
        └─ Order still in database ✅

T=0:30  Payment processes at Stripe
        ├─ Customer authorized $49
        ├─ Stripe generates session_id: "cs_test_xyz..."
        └─ Order still in database ✅

T=1:00  (Browser crashes)
        └─ Order still in database ✅
           (Can recover via email matching)

T=5:00  Customer returns to success page
        ├─ POST /api/orders/confirm
        │  { email: "user@example.com",
        │    stripe_session_id: "cs_test_xyz..." }
        └─ Supabase UPDATE:
           WHERE email='user@example.com' 
           AND status='pending_payment'
           SET status='paid'
           SET stripe_session_id='cs_test_xyz...'
           ← Order confirmed, safe forever

T=5:01  Success page displays
        └─ ✅ Payment Successful!
           ✅ Email confirmation sent
           ✅ Customer in system, awaiting schedule
```

## Error Handling

```
SCENARIO: Order exists but /success endpoint fails

1. User completes Stripe payment ✓
2. Stripe returns to /success
3. POST /api/orders/confirm fails (network error)
4. Error shown to user

RECOVERY:
   Option A: User clicks "Try Again" 
             (Endpoint is idempotent, safe to retry)
   
   Option B: Email confirmation sent anyway
             (Stripe successfully processed)
   
   Option C: Manual verification
             SELECT * FROM orders WHERE stripe_session_id = '...'
             UPDATE status = 'paid'


SCENARIO: Order doesn't exist when confirming

1. User deleted browser data mid-flow
2. Order somehow lost
3. /api/orders/confirm gets no email

RESPONSE:
   {
     "error": "Email is required",
     "status": 400
   }

RECOVERY:
   User contacts support with Stripe confirmation number
   Admin verifies payment in Stripe
   Admin creates order with status='paid'
```

## Capacity Management

```
Old Flow: Checked capacity only when writing to DB (after payment)
Problem: Customer could pay, then be told "capacity full"

New Flow: Check capacity when CONFIRMING payment
Benefit: Still allows flexible capacity, but checks at right time

Logic in /api/orders/route.ts:
- If status='pending_payment': Skip capacity check
- If status='paid': Check capacity (15 orders max)

Result:
- Multiple users can submit forms (pending_payment)
- Only first 15 to PAY (status='paid') are accepted
- Rest automatically fallback to waitlist
```

## Monitoring & Operations

```
DAILY CHECKS:
1. Query pending orders (stuck for >4 hours):
   SELECT * FROM orders 
   WHERE status='pending_payment' 
   AND created_at < NOW() - INTERVAL '4 hours';
   
   ACTION: Email user with confirmation link or status update

2. Query today's paid orders:
   SELECT COUNT(*) FROM orders 
   WHERE status='paid' 
   AND created_at::date = TODAY();
   
   ACTION: Track revenue, send daily summary

3. Check for mismatches (Stripe vs Supabase):
   Compare Stripe Dashboard session IDs with 
   orders table stripe_session_id values
   
   ACTION: Investigate any gaps


WEEKLY CHECKS:
1. Fulfillment rate:
   SELECT COUNT(*) FROM orders 
   WHERE status='fulfilled' 
   AND fulfilled_at > NOW() - INTERVAL '7 days';

2. Refund rate:
   SELECT COUNT(*) FROM orders 
   WHERE status='refunded' 
   AND created_at > NOW() - INTERVAL '7 days';

3. Revenue:
   SELECT SUM(49) FROM orders 
   WHERE status='paid' 
   AND created_at > NOW() - INTERVAL '7 days';
```

---

**Status:** ✅ Production Ready
**Last Updated:** Post-Critical-Fix
**Deployment:** Vercel (Auto-deploy on push to main)
