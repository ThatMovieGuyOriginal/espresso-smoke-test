-- Migration: Add 'pending_payment' to orders status check constraint
-- Run this in Supabase SQL Editor to fix the checkout error
-- This allows orders to be created with status='pending_payment' before Stripe redirect
-- IDEMPOTENT: Safe to run multiple times

-- Drop the existing check constraint (only if it exists)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'orders_status_check' 
        AND conrelid = 'orders'::regclass
    ) THEN
        ALTER TABLE orders DROP CONSTRAINT orders_status_check;
    END IF;
END $$;

-- Add the new check constraint with 'pending_payment' included
ALTER TABLE orders
ADD CONSTRAINT orders_status_check
CHECK (status IN ('pending', 'pending_payment', 'paid', 'fulfilled', 'refunded'));

-- Verify the constraint was updated
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'orders'::regclass 
AND conname = 'orders_status_check';
