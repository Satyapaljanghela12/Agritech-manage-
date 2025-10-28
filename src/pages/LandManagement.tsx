import { useEffect, useState } from 'react';
import { supabase, LandParcel } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Plus, Edit2, Trash2, X } from 'lucide-react';

export const LandManagement = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState<LandParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingParcel, setEditingParcel] = useState<LandParcel | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    soil_type: '',
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      loadParcels();
    }
  }, [user]);

  const loadParcels = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('land_parcels')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParcels(data || []);
    } catch (error) {
      console.error('Error loading parcels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingParcel) {
        const { error } = await supabase
          .from('land_parcels')
          .update({
            ...formData,
            area: Number(formData.area),
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingParcel.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('land_parcels').insert({
          ...formData,
          area: Number(formData.area),
          user_id: user.id,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingParcel(null);
      setFormData({ name: '', area: '', soil_type: '', location: '', notes: '' });
      loadParcels();
    } catch (error) {
      console.error('Error saving parcel:', error);
    }
  };

  const handleEdit = (parcel: LandParcel) => {
    setEditingParcel(parcel);
    setFormData({
      name: parcel.name,
      area: String(parcel.area),
      soil_type: parcel.soil_type || '',
      location: parcel.location || '',
      notes: parcel.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this land parcel?')) return;

    try {
      const { error } = await supabase.from('land_parcels').delete().eq('id', id);

      if (error) throw error;
      loadParcels();
    } catch (error) {
      console.error('Error deleting parcel:', error);
    }
  };

  const totalArea = parcels.reduce((sum, parcel) => sum + Number(parcel.area), 0);

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
          <h1 className="text-2xl font-bold text-gray-800">Land Management</h1>
          <p className="text-gray-600 mt-1">
            Total: {totalArea.toFixed(1)} acres across {parcels.length} parcels
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingParcel(null);
            setFormData({ name: '', area: '', soil_type: '', location: '', notes: '' });
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Parcel
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingParcel ? 'Edit Land Parcel' : 'Add Land Parcel'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingParcel(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parcel Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="North Field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area (acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soil Type
                </label>
                <input
                  type="text"
                  value={formData.soil_type}
                  onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Loamy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Section A"
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
                    setEditingParcel(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingParcel ? 'Update' : 'Add'} Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parcels.map((parcel) => (
          <div key={parcel.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{parcel.name}</h3>
                  <p className="text-sm text-gray-500">{parcel.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(parcel)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(parcel.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Area</span>
                <span className="font-semibold text-gray-800">{parcel.area} acres</span>
              </div>
              {parcel.soil_type && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Soil Type</span>
                  <span className="font-medium text-gray-800">{parcel.soil_type}</span>
                </div>
              )}
              {parcel.notes && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{parcel.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {parcels.length === 0 && (
          <div className="col-span-full text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No land parcels yet. Add your first parcel to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
