import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  balance: number;
  referral_code: string;
  referred_by?: string;
  wallet_connected: boolean;
  wallet_address?: string;
  created_at: string;
  last_login: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  created_at: string;
  referred_user?: User;
}

export interface NFTItem {
  id: string;
  name: string;
  image_url: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  user_id: string;
  nft_id: string;
  acquired_at: string;
  game_type: string;
  nft_item?: NFTItem;
}

export interface GameHistory {
  id: string;
  user_id: string;
  game_type: 'cases' | 'upgrades' | 'slots' | 'roulette' | 'free_case';
  bet_amount: number;
  result: 'win' | 'loss';
  prize_value?: number;
  nft_won_id?: string;
  created_at: string;
  nft_item?: NFTItem;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  balance_before: number;
  balance_after: number;
  description?: string;
  created_at: string;
}
