-- Orders table for paid customers
-- Run this in Supabase SQL Editor after creating the project

-- Drop table if exists (for clean re-runs) - this also drops associated policies
DROP TABLE IF EXISTS orders CASCADE;

-- Create orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  water_hardness_ppm INTEGER NOT NULL,
  daily_shots INTEGER NOT NULL,
  serial_number TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  created_at TIMESTAMP DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'refunded')),
  amount_paid INTEGER, -- in cents
  customer_ip TEXT,
  CONSTRAINT valid_water_hardness CHECK (water_hardness_ppm > 0 AND water_hardness_ppm < 1000),
  CONSTRAINT valid_daily_shots CHECK (daily_shots > 0 AND daily_shots < 100)
);

-- Create indexes for faster lookups
CREATE INDEX orders_email_idx ON orders(email);
CREATE INDEX orders_stripe_session_idx ON orders(stripe_session_id);
CREATE INDEX orders_status_idx ON orders(status);
CREATE INDEX orders_created_at_idx ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

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
