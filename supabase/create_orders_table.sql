-- Orders table for La Marzocco Water Audit products
-- Consolidated schema with full idempotency
-- Run this in Supabase SQL Editor - safe to run multiple times

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  water_hardness_ppm INTEGER DEFAULT 150,
  daily_shots INTEGER DEFAULT 4,
  serial_number TEXT DEFAULT 'TBD',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  created_at TIMESTAMP DEFAULT now(),
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending', 'pending_payment', 'paid', 'fulfilled', 'refunded')),
  amount_paid INTEGER DEFAULT 9700,
  customer_ip TEXT,
  fulfilled_at TIMESTAMP,
  ics_file_url TEXT,
  notes TEXT,
  refund_reason TEXT,
  CONSTRAINT valid_water_hardness CHECK (water_hardness_ppm > 0 AND water_hardness_ppm < 1000),
  CONSTRAINT valid_daily_shots CHECK (daily_shots > 0 AND daily_shots < 100)
);

-- Add new columns if they don't exist (idempotent)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'product_type') THEN
    ALTER TABLE orders ADD COLUMN product_type TEXT DEFAULT 'lm_water_97';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'machine_type') THEN
    ALTER TABLE orders ADD COLUMN machine_type TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'water_source') THEN
    ALTER TABLE orders ADD COLUMN water_source TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'updated_at') THEN
    ALTER TABLE orders ADD COLUMN updated_at TIMESTAMP DEFAULT now();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'lsi_report_url') THEN
    ALTER TABLE orders ADD COLUMN lsi_report_url TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'custom_recipe') THEN
    ALTER TABLE orders ADD COLUMN custom_recipe TEXT;
  END IF;
END $$;

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
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'orders_status_check' 
    AND conrelid = 'orders'::regclass
  ) THEN
    DECLARE
      constraint_def TEXT;
    BEGIN
      SELECT pg_get_constraintdef(oid) INTO constraint_def
      FROM pg_constraint 
      WHERE conname = 'orders_status_check' 
      AND conrelid = 'orders'::regclass;
      
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
