-- Orders table for La Marzocco Water Audit products
-- Consolidated schema with full idempotency
-- Run this in Supabase SQL Editor - safe to run multiple times

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  
  -- Machine and Product Information
  product_type TEXT DEFAULT 'lm_water_97', -- Type of product purchased (lm_water_97, etc.)
  machine_type TEXT, -- linea_mini, linea_micra, gs3, slayer
  
  -- Water Parameters (stored with dummy defaults, updated post-purchase)
  water_hardness_ppm INTEGER DEFAULT 150,
  daily_shots INTEGER DEFAULT 4,
  serial_number TEXT DEFAULT 'TBD',
  
  -- Water Source (collected on success page)
  water_source TEXT, -- bottled, mixed, tap, unknown
  
  -- Payment Information
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount_paid INTEGER DEFAULT 9700, -- in cents ($97.00)
  
  -- Status and Timestamps
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending', 'pending_payment', 'paid', 'fulfilled', 'refunded')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  fulfilled_at TIMESTAMP, -- When audit report was delivered to customer
  
  -- Fulfillment
  ics_file_url TEXT, -- URL/path to the audit report or recipe card
  lsi_report_url TEXT, -- URL/path to LSI calculation report
  custom_recipe TEXT, -- The water recipe prescription
  
  -- Customer Information
  customer_ip TEXT,
  
  -- Notes and Support
  notes TEXT, -- Internal notes on order
  refund_reason TEXT, -- Reason for refund if applicable
  
  -- Constraints
  CONSTRAINT valid_water_hardness CHECK (water_hardness_ppm > 0 AND water_hardness_ppm < 1000),
  CONSTRAINT valid_daily_shots CHECK (daily_shots > 0 AND daily_shots < 100)
);

-- Create indexes for faster lookups (idempotent)
CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email);
CREATE INDEX IF NOT EXISTS orders_product_type_idx ON orders(product_type);
CREATE INDEX IF NOT EXISTS orders_machine_type_idx ON orders(machine_type);
CREATE INDEX IF NOT EXISTS orders_stripe_session_idx ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_water_source_idx ON orders(water_source);

-- Ensure status constraint includes all required values (idempotent)
DO $$ 
BEGIN
  -- Drop old constraint if it exists and is missing 'pending_payment'
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'orders_status_check' 
    AND conrelid = 'orders'::regclass
  ) THEN
    -- Check if constraint definition includes all required statuses
    DECLARE
      constraint_def TEXT;
    BEGIN
      SELECT pg_get_constraintdef(oid) INTO constraint_def
      FROM pg_constraint 
      WHERE conname = 'orders_status_check' 
      AND conrelid = 'orders'::regclass;
      
      -- If constraint is missing 'pending_payment', drop and recreate
      IF constraint_def NOT LIKE '%pending_payment%' THEN
        ALTER TABLE orders DROP CONSTRAINT orders_status_check;
        ALTER TABLE orders
        ADD CONSTRAINT orders_status_check
        CHECK (status IN ('pending', 'pending_payment', 'paid', 'fulfilled', 'refunded'));
      END IF;
    END;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated insert" ON orders;
DROP POLICY IF EXISTS "Allow authenticated read" ON orders;

-- Policy: Service role can do everything (for API endpoints)
CREATE POLICY "Allow authenticated insert" ON orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON orders
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON orders TO service_role;
GRANT SELECT ON orders TO anon;
