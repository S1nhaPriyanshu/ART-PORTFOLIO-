-- Supabase PostgreSQL Schema for Atelier Tenebris

-- Create custom enum types
CREATE TYPE commission_status AS ENUM (
  'pending_payment',
  'paid',
  'in_progress',
  'revision',
  'completed',
  'cancelled',
  'refunded',
  'payment_failed'
);

CREATE TYPE teaser_status AS ENUM (
  'upcoming',
  'revealed',
  'archived'
);

-- ==========================================
-- Table: portfolio_items
-- ==========================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  image VARCHAR(500) NOT NULL,
  full_res_image VARCHAR(500),
  thumbnail VARCHAR(500),
  span INTEGER DEFAULT 1,
  year INTEGER,
  tags TEXT[],
  dimensions JSONB,
  medium VARCHAR(200),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- Table: commissions
-- ==========================================
CREATE TABLE IF NOT EXISTS commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref VARCHAR(20) UNIQUE NOT NULL,
  tier_name VARCHAR(50) NOT NULL,
  tier_price_min INTEGER NOT NULL,
  tier_price_max INTEGER NOT NULL,
  description TEXT NOT NULL,
  email VARCHAR(254) NOT NULL,
  style VARCHAR(50),
  notes TEXT,
  reference_files TEXT[],
  status commission_status DEFAULT 'pending_payment',
  payment_intent_id VARCHAR(200),
  amount_paid INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_commissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_commissions_timestamp
BEFORE UPDATE ON commissions
FOR EACH ROW
EXECUTE FUNCTION update_commissions_updated_at();


-- ==========================================
-- Table: newsletter_subscribers
-- ==========================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(254) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);


-- ==========================================
-- Table: teasers
-- ==========================================
CREATE TABLE IF NOT EXISTS teasers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  date VARCHAR(100),
  image VARCHAR(500) NOT NULL,
  status teaser_status DEFAULT 'upcoming',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- Setup Row Level Security (RLS) policies
-- Note: Adjust policies based on your authentication strategy.
-- Assuming public read access for portfolio and teasers, but restricted access otherwise.
-- ==========================================

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON portfolio_items FOR SELECT USING (true);

ALTER TABLE teasers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public teasers are viewable by everyone." ON teasers FOR SELECT USING (true);

-- End of Schema
