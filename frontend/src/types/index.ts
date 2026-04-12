export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  farmName?: string;
  location?: string;
  role: 'farmer' | 'manager' | 'admin';
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandParcel {
  _id: string;
  userId: string;
  name: string;
  area: number;
  soilType?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Crop {
  _id: string;
  userId: string;
  landParcelId?: string;
  name: string;
  variety?: string;
  areaPlanted: number;
  plantedOn: string;
  expectedHarvestDate: string;
  actualHarvestDate?: string;
  status: 'planned' | 'planted' | 'growing' | 'harvested' | 'failed';
  yieldExpected: number;
  yieldActual?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  _id: string;
  userId: string;
  name: string;
  type: 'seed' | 'fertilizer' | 'pesticide' | 'supply' | 'other';
  category?: string;
  quantity: number;
  unit: string;
  supplier?: string;
  purchaseDate?: string;
  expiryDate?: string;
  alertLevel: number;
  costPerUnit: number;
  createdAt: string;
  updatedAt: string;
}

export interface ToolEquipment {
  _id: string;
  userId: string;
  name: string;
  type: 'tool' | 'machinery' | 'vehicle' | 'other';
  purchaseDate?: string;
  purchaseCost: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialRecord {
  _id: string;
  userId: string;
  type: 'expense' | 'revenue';
  category: string;
  description?: string;
  amount: number;
  date: string;
  cropId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'harvest' | 'maintenance' | 'inventory' | 'financial' | 'general';
  status: 'unread' | 'read';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
