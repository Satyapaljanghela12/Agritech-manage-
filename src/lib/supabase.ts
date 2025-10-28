import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  farm_name?: string;
  location?: string;
  role: 'farmer' | 'manager' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface LandParcel {
  id: string;
  user_id: string;
  name: string;
  area: number;
  soil_type?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Crop {
  id: string;
  user_id: string;
  land_parcel_id?: string;
  name: string;
  variety?: string;
  area_planted: number;
  planted_on: string;
  expected_harvest_date: string;
  actual_harvest_date?: string;
  status: 'planned' | 'planted' | 'growing' | 'harvested' | 'failed';
  yield_expected: number;
  yield_actual?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  user_id: string;
  name: string;
  type: 'seed' | 'fertilizer' | 'pesticide' | 'supply' | 'other';
  category?: string;
  quantity: number;
  unit: string;
  supplier?: string;
  purchase_date?: string;
  expiry_date?: string;
  alert_level: number;
  cost_per_unit: number;
  created_at: string;
  updated_at: string;
}

export interface ToolEquipment {
  id: string;
  user_id: string;
  name: string;
  type: 'tool' | 'machinery' | 'vehicle' | 'other';
  purchase_date?: string;
  purchase_cost: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface FinancialRecord {
  id: string;
  user_id: string;
  type: 'expense' | 'revenue';
  category: string;
  description?: string;
  amount: number;
  date: string;
  crop_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'harvest' | 'maintenance' | 'inventory' | 'financial' | 'general';
  status: 'unread' | 'read';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}
