export type FoodStatus = 'fresh' | 'expiring' | 'expired';

export interface FoodItem {
  id: string;
  user_id: string;
  name: string;
  expiration_date: string;
  status: FoodStatus;
  created_at: string;
  updated_at: string;
}

export interface FoodStats {
  total: number;
  fresh: number;
  expiring: number;
  expired: number;
}