import { useEffect, useState } from 'react';
import { supabase, InventoryItem } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Package, Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

const typeColors = {
  seed: 'bg-green-100 text-green-700',
  fertilizer: 'bg-amber-100 text-amber-700',
  pesticide: 'bg-red-100 text-red-700',
  supply: 'bg-blue-100 text-blue-700',
  other: 'bg-gray-100 text-gray-700',
};

export const InventoryManagement = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    type: 'seed' as const,
    category: '',
    quantity: '',
    unit: '',
    supplier: '',
    purchase_date: '',
    expiry_date: '',
    alert_level: '',
    cost_per_unit: '',
  });

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const loadItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        alert_level: Number(formData.alert_level) || 0,
        cost_per_unit: Number(formData.cost_per_unit) || 0,
        purchase_date: formData.purchase_date || null,
        expiry_date: formData.expiry_date || null,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('inventory')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('inventory').insert({
          ...payload,
          user_id: user.id,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingItem(null);
      resetForm();
      loadItems();
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'seed',
      category: '',
      quantity: '',
      unit: '',
      supplier: '',
      purchase_date: '',
      expiry_date: '',
      alert_level: '',
      cost_per_unit: '',
    });
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      category: item.category || '',
      quantity: String(item.quantity),
      unit: item.unit,
      supplier: item.supplier || '',
      purchase_date: item.purchase_date || '',
      expiry_date: item.expiry_date || '',
      alert_level: String(item.alert_level),
      cost_per_unit: String(item.cost_per_unit),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase.from('inventory').delete().eq('id', id);
      if (error) throw error;
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const filteredItems =
    filterType === 'all' ? items : items.filter((item) => item.type === filterType);
  const lowStockItems = items.filter((item) => item.quantity <= item.alert_level);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600 mt-1">{items.length} items tracked</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Low Stock Alert</h3>
            <p className="text-sm text-amber-800">
              {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} running low on
              stock: {lowStockItems.map((item) => item.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'seed', 'fertilizer', 'pesticide', 'supply', 'other'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              filterType === type
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingItem ? 'Edit Item' : 'Add Item'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Premium Wheat Seeds"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as typeof formData.type })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="seed">Seed</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="pesticide">Pesticide</option>
                  <option value="supply">Supply</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Organic"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="kg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="AgriSupplies Co."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Unit
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_per_unit}
                  onChange={(e) => setFormData({ ...formData, cost_per_unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="5.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Level (Low Stock Threshold)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.alert_level}
                  onChange={(e) => setFormData({ ...formData, alert_level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchase_date}
                  onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isLowStock = item.quantity <= item.alert_level;
          return (
            <div key={item.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    {item.category && (
                      <p className="text-sm text-gray-500">{item.category}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      typeColors[item.type]
                    }`}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>

                {isLowStock && (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-800">Low Stock</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quantity</span>
                  <span
                    className={`font-semibold ${isLowStock ? 'text-amber-600' : 'text-gray-800'}`}
                  >
                    {item.quantity} {item.unit}
                  </span>
                </div>

                {item.supplier && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Supplier</span>
                    <span className="font-medium text-gray-800">{item.supplier}</span>
                  </div>
                )}

                {item.cost_per_unit > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cost/Unit</span>
                    <span className="font-semibold text-gray-800">
                      ${item.cost_per_unit.toFixed(2)}
                    </span>
                  </div>
                )}

                {item.expiry_date && (
                  <div className="pt-2 border-t border-gray-100 text-sm">
                    <span className="text-gray-600">Expires: </span>
                    <span className="font-medium text-gray-800">
                      {new Date(item.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No items found. Add your first inventory item to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
