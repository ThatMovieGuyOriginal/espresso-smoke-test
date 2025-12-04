-- Supabase: create `waitlist` table

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'contacted', 'converted')),
  source TEXT DEFAULT 'landing_page'
);

-- Indexes for quicker lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON waitlist(status);

-- Enable Row Level Security (adjust policies as needed)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts if you choose (for MVP only). Adjust for production.
CREATE POLICY IF NOT EXISTS "Allow public insert" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Restrict selects to authenticated users (adjust as needed)
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
