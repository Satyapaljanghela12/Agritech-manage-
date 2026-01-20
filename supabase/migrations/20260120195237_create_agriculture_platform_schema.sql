/*
  # Agriculture Management Platform Database Schema

  ## Overview
  Complete database schema for managing farms, crops, land, inventory, equipment, and finances.

  ## 1. New Tables

  ### users_profiles
  Extended user profile information for farmers and farm managers:
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `phone` (text)
  - `farm_name` (text)
  - `location` (text)
  - `role` (text) - farmer, manager, admin
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### land_parcels
  Farm land parcel management:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users_profiles)
  - `name` (text)
  - `area` (numeric) - in acres or hectares
  - `soil_type` (text)
  - `location` (text)
  - `latitude` (numeric, optional)
  - `longitude` (numeric, optional)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### crops
  Crop planting and tracking:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users_profiles)
  - `land_parcel_id` (uuid, references land_parcels)
  - `name` (text)
  - `variety` (text)
  - `area_planted` (numeric)
  - `planted_on` (date)
  - `expected_harvest_date` (date)
  - `actual_harvest_date` (date, optional)
  - `status` (text) - planned, planted, growing, harvested, failed
  - `yield_expected` (numeric)
  - `yield_actual` (numeric, optional)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### inventory
  Seeds, fertilizers, pesticides, and supplies:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users_profiles)
  - `name` (text)
  - `type` (text) - seed, fertilizer, pesticide, supply
  - `category` (text)
  - `quantity` (numeric)
  - `unit` (text)
  - `supplier` (text)
  - `purchase_date` (date)
  - `expiry_date` (date, optional)
  - `alert_level` (numeric) - minimum stock threshold
  - `cost_per_unit` (numeric)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### tools_equipment
  Farm tools and machinery:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users_profiles)
  - `name` (text)
  - `type` (text) - tool, machinery, vehicle
  - `purchase_date` (date)
  - `purchase_cost` (numeric)
  - `condition` (text) - excellent, good, fair, poor
  - `last_maintenance_date` (date, optional)
  - `next_maintenance_date` (date, optional)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### financial_records
  Expenses and revenue tracking:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users_profiles)
  - `type` (text) - expense, revenue
  - `category` (text) - seeds, fertilizer, labor, equipment, sales, etc.
  - `description` (text)
  - `amount` (numeric)
  - `date` (date)
  - `crop_id` (uuid, optional, references crops)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### notifications
  System notifications and alerts:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users_profiles)
  - `title` (text)
  - `message` (text)
  - `type` (text) - harvest, maintenance, inventory, financial, general
  - `status` (text) - unread, read
  - `priority` (text) - low, medium, high
  - `created_at` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Authenticated users required for all operations
*/

CREATE TABLE IF NOT EXISTS users_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  farm_name text,
  location text,
  role text DEFAULT 'farmer' CHECK (role IN ('farmer', 'manager', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS land_parcels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  area numeric NOT NULL CHECK (area > 0),
  soil_type text,
  location text,
  latitude numeric,
  longitude numeric,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE land_parcels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own land parcels"
  ON land_parcels FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own land parcels"
  ON land_parcels FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own land parcels"
  ON land_parcels FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own land parcels"
  ON land_parcels FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  land_parcel_id uuid REFERENCES land_parcels(id) ON DELETE SET NULL,
  name text NOT NULL,
  variety text,
  area_planted numeric NOT NULL CHECK (area_planted > 0),
  planted_on date NOT NULL,
  expected_harvest_date date NOT NULL,
  actual_harvest_date date,
  status text DEFAULT 'planned' CHECK (status IN ('planned', 'planted', 'growing', 'harvested', 'failed')),
  yield_expected numeric DEFAULT 0,
  yield_actual numeric,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE crops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own crops"
  ON crops FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own crops"
  ON crops FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own crops"
  ON crops FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own crops"
  ON crops FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('seed', 'fertilizer', 'pesticide', 'supply', 'other')),
  category text,
  quantity numeric NOT NULL DEFAULT 0,
  unit text NOT NULL,
  supplier text,
  purchase_date date,
  expiry_date date,
  alert_level numeric DEFAULT 0,
  cost_per_unit numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own inventory"
  ON inventory FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inventory"
  ON inventory FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own inventory"
  ON inventory FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own inventory"
  ON inventory FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS tools_equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('tool', 'machinery', 'vehicle', 'other')),
  purchase_date date,
  purchase_cost numeric DEFAULT 0,
  condition text DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  last_maintenance_date date,
  next_maintenance_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tools_equipment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tools"
  ON tools_equipment FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tools"
  ON tools_equipment FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tools"
  ON tools_equipment FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tools"
  ON tools_equipment FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS financial_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('expense', 'revenue')),
  category text NOT NULL,
  description text,
  amount numeric NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  crop_id uuid REFERENCES crops(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own financial records"
  ON financial_records FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own financial records"
  ON financial_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own financial records"
  ON financial_records FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own financial records"
  ON financial_records FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('harvest', 'maintenance', 'inventory', 'financial', 'general')),
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_land_parcels_user_id ON land_parcels(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_user_id ON crops(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_status ON crops(status);
CREATE INDEX IF NOT EXISTS idx_inventory_user_id ON inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_type ON inventory(type);
CREATE INDEX IF NOT EXISTS idx_tools_user_id ON tools_equipment(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_user_id ON financial_records(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_type ON financial_records(type);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);