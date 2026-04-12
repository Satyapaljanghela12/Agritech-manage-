const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message);
  }
  return res.json();
};

export const api = {
  // Auth
  register: async (email: string, password: string, fullName: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    });
    return handleResponse(res);
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  getProfile: async () => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  updateProfile: async (updates: any) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },

  // Land Parcels
  getLandParcels: async () => {
    const res = await fetch(`${API_URL}/land-parcels`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  createLandParcel: async (data: any) => {
    const res = await fetch(`${API_URL}/land-parcels`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateLandParcel: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/land-parcels/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteLandParcel: async (id: string) => {
    const res = await fetch(`${API_URL}/land-parcels/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Crops
  getCrops: async () => {
    const res = await fetch(`${API_URL}/crops`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  createCrop: async (data: any) => {
    const res = await fetch(`${API_URL}/crops`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateCrop: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/crops/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteCrop: async (id: string) => {
    const res = await fetch(`${API_URL}/crops/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Inventory
  getInventory: async () => {
    const res = await fetch(`${API_URL}/inventory`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  createInventoryItem: async (data: any) => {
    const res = await fetch(`${API_URL}/inventory`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateInventoryItem: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteInventoryItem: async (id: string) => {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Tools & Equipment
  getTools: async () => {
    const res = await fetch(`${API_URL}/tools`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  createTool: async (data: any) => {
    const res = await fetch(`${API_URL}/tools`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateTool: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/tools/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteTool: async (id: string) => {
    const res = await fetch(`${API_URL}/tools/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Financial Records
  getFinancialRecords: async () => {
    const res = await fetch(`${API_URL}/financial`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  createFinancialRecord: async (data: any) => {
    const res = await fetch(`${API_URL}/financial`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  updateFinancialRecord: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/financial/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteFinancialRecord: async (id: string) => {
    const res = await fetch(`${API_URL}/financial/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Notifications
  getNotifications: async () => {
    const res = await fetch(`${API_URL}/notifications`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  markNotificationAsRead: async (id: string) => {
    const res = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  deleteNotification: async (id: string) => {
    const res = await fetch(`${API_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};
