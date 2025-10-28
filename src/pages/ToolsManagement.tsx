import { useEffect, useState } from 'react';
import { supabase, ToolEquipment } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Wrench, Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

const conditionColors = {
  excellent: 'bg-green-100 text-green-700',
  good: 'bg-blue-100 text-blue-700',
  fair: 'bg-amber-100 text-amber-700',
  poor: 'bg-red-100 text-red-700',
};

export const ToolsManagement = () => {
  const { user } = useAuth();
  const [tools, setTools] = useState<ToolEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolEquipment | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'tool' as const,
    purchase_date: '',
    purchase_cost: '',
    condition: 'good' as const,
    last_maintenance_date: '',
    next_maintenance_date: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      loadTools();
    }
  }, [user]);

  const loadTools = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tools_equipment')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error loading tools:', error);
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
        purchase_cost: Number(formData.purchase_cost) || 0,
        purchase_date: formData.purchase_date || null,
        last_maintenance_date: formData.last_maintenance_date || null,
        next_maintenance_date: formData.next_maintenance_date || null,
      };

      if (editingTool) {
        const { error } = await supabase
          .from('tools_equipment')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingTool.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('tools_equipment').insert({
          ...payload,
          user_id: user.id,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingTool(null);
      resetForm();
      loadTools();
    } catch (error) {
      console.error('Error saving tool:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'tool',
      purchase_date: '',
      purchase_cost: '',
      condition: 'good',
      last_maintenance_date: '',
      next_maintenance_date: '',
      notes: '',
    });
  };

  const handleEdit = (tool: ToolEquipment) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      type: tool.type,
      purchase_date: tool.purchase_date || '',
      purchase_cost: String(tool.purchase_cost),
      condition: tool.condition,
      last_maintenance_date: tool.last_maintenance_date || '',
      next_maintenance_date: tool.next_maintenance_date || '',
      notes: tool.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool/equipment?')) return;

    try {
      const { error } = await supabase.from('tools_equipment').delete().eq('id', id);
      if (error) throw error;
      loadTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  const today = new Date();
  const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const maintenanceDue = tools.filter((tool) => {
    if (!tool.next_maintenance_date) return false;
    const maintenanceDate = new Date(tool.next_maintenance_date);
    return maintenanceDate <= thirtyDaysLater;
  });

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
          <h1 className="text-2xl font-bold text-gray-800">Tools & Equipment</h1>
          <p className="text-gray-600 mt-1">{tools.length} items tracked</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTool(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Tool
        </button>
      </div>

      {maintenanceDue.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Maintenance Due</h3>
            <p className="text-sm text-amber-800">
              {maintenanceDue.length} item{maintenanceDue.length !== 1 ? 's' : ''} require
              maintenance soon: {maintenanceDue.map((tool) => tool.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingTool ? 'Edit Tool/Equipment' : 'Add Tool/Equipment'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingTool(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tractor"
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
                  <option value="tool">Tool</option>
                  <option value="machinery">Machinery</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="other">Other</option>
                </select>
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
                  Purchase Cost
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.purchase_cost}
                  onChange={(e) => setFormData({ ...formData, purchase_cost: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="5000.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      condition: e.target.value as typeof formData.condition,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Maintenance Date
                </label>
                <input
                  type="date"
                  value={formData.last_maintenance_date}
                  onChange={(e) =>
                    setFormData({ ...formData, last_maintenance_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Maintenance Date
                </label>
                <input
                  type="date"
                  value={formData.next_maintenance_date}
                  onChange={(e) =>
                    setFormData({ ...formData, next_maintenance_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional information..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTool(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingTool ? 'Update' : 'Add'} Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const needsMaintenance =
            tool.next_maintenance_date &&
            new Date(tool.next_maintenance_date) <= thirtyDaysLater;

          return (
            <div key={tool.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Wrench className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{tool.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{tool.type}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(tool)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
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
                      conditionColors[tool.condition]
                    }`}
                  >
                    {tool.condition.charAt(0).toUpperCase() + tool.condition.slice(1)}
                  </span>
                </div>

                {needsMaintenance && (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-800">Maintenance Due</span>
                  </div>
                )}

                {tool.purchase_cost > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Purchase Cost</span>
                    <span className="font-semibold text-gray-800">
                      ${tool.purchase_cost.toFixed(2)}
                    </span>
                  </div>
                )}

                {tool.last_maintenance_date && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Maintenance</span>
                    <span className="font-medium text-gray-800">
                      {new Date(tool.last_maintenance_date).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {tool.next_maintenance_date && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Maintenance</span>
                    <span
                      className={`font-medium ${
                        needsMaintenance ? 'text-amber-600' : 'text-gray-800'
                      }`}
                    >
                      {new Date(tool.next_maintenance_date).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {tool.notes && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{tool.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {tools.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No tools or equipment yet. Add your first item to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
