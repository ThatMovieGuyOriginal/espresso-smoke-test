-- Supabase: create `waitlist` table

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'contacted', 'converted')),
  consent BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'landing_page'
);

-- Indexes for quicker lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON waitlist(status);

-- Enable Row Level Security (adjust policies as needed)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts if you choose (for MVP only). Adjust for production.
-- Drop existing policies if present so this script can be re-run safely
DROP POLICY IF EXISTS "Allow public insert" ON waitlist;
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Restrict selects to authenticated users (adjust as needed)
DROP POLICY IF EXISTS "Allow authenticated read" ON waitlist;
CREATE POLICY "Allow authenticated read" ON waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- If you run this file again and want idempotency for the new column:
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS consent BOOLEAN DEFAULT true;
-- Double opt-in columns
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS confirmation_token TEXT;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE;
