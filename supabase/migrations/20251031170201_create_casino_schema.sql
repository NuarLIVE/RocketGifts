/*
  # Rocket Gifts Casino Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User ID from Telegram
      - `telegram_id` (bigint, unique) - Telegram user ID
      - `username` (text) - Telegram username
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `avatar_url` (text) - Telegram avatar URL
      - `balance` (numeric) - User's current balance in stars
      - `referral_code` (text, unique) - User's unique referral code
      - `referred_by` (uuid) - ID of user who referred this user
      - `wallet_connected` (boolean) - Whether user has connected a wallet
      - `wallet_address` (text) - Connected wallet address
      - `created_at` (timestamptz) - Account creation timestamp
      - `last_login` (timestamptz) - Last login timestamp

    - `referrals`
      - `id` (uuid, primary key)
      - `referrer_id` (uuid) - User who referred
      - `referred_id` (uuid) - User who was referred
      - `created_at` (timestamptz) - When referral was created

    - `nft_items`
      - `id` (uuid, primary key)
      - `name` (text) - NFT name
      - `image_url` (text) - NFT image URL
      - `rarity` (text) - common, rare, epic, legendary
      - `value` (numeric) - NFT value in stars
      - `created_at` (timestamptz)

    - `inventory`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Owner of the item
      - `nft_id` (uuid) - Reference to NFT item
      - `acquired_at` (timestamptz) - When item was won
      - `game_type` (text) - Which game it was won from

    - `game_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Player
      - `game_type` (text) - cases, upgrades, slots, roulette, free_case
      - `bet_amount` (numeric) - Amount wagered (0 for free case)
      - `result` (text) - win or loss
      - `prize_value` (numeric) - Value of prize if won
      - `nft_won_id` (uuid) - NFT won if applicable
      - `created_at` (timestamptz) - When game was played

    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - User who made transaction
      - `type` (text) - deposit, withdrawal, bet, win
      - `amount` (numeric) - Transaction amount
      - `balance_before` (numeric) - Balance before transaction
      - `balance_after` (numeric) - Balance after transaction
      - `description` (text) - Transaction description
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for referral relationships
    
  3. Important Notes
    - All monetary values use numeric type for precision
    - Telegram IDs are stored as bigint to handle large numbers
    - Referral codes are auto-generated unique strings
    - RLS ensures users can only access their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id bigint UNIQUE NOT NULL,
  username text,
  first_name text,
  last_name text,
  avatar_url text,
  balance numeric DEFAULT 0 NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_by uuid REFERENCES users(id),
  wallet_connected boolean DEFAULT false,
  wallet_address text,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  referred_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(referrer_id, referred_id)
);

-- Create NFT items table
CREATE TABLE IF NOT EXISTS nft_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  rarity text NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  value numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  nft_id uuid REFERENCES nft_items(id) NOT NULL,
  acquired_at timestamptz DEFAULT now(),
  game_type text NOT NULL
);

-- Create game history table
CREATE TABLE IF NOT EXISTS game_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  game_type text NOT NULL CHECK (game_type IN ('cases', 'upgrades', 'slots', 'roulette', 'free_case')),
  bet_amount numeric DEFAULT 0 NOT NULL,
  result text NOT NULL CHECK (result IN ('win', 'loss')),
  prize_value numeric DEFAULT 0,
  nft_won_id uuid REFERENCES nft_items(id),
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bet', 'win')),
  amount numeric NOT NULL,
  balance_before numeric NOT NULL,
  balance_after numeric NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_game_history_user ON game_history(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE nft_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for referrals table
CREATE POLICY "Users can view their referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "System can insert referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for nft_items (public read)
CREATE POLICY "Anyone can view NFT items"
  ON nft_items FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for inventory
CREATE POLICY "Users can view own inventory"
  ON inventory FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can add to inventory"
  ON inventory FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for game_history
CREATE POLICY "Users can view own game history"
  ON game_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create game history"
  ON game_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code on user creation
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL OR NEW.referral_code = '' THEN
    NEW.referral_code := generate_referral_code();
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM users WHERE referral_code = NEW.referral_code) LOOP
      NEW.referral_code := generate_referral_code();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_referral_code
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_referral_code();