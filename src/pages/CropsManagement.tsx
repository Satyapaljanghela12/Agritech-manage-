import { useEffect, useState } from 'react';
import { supabase, Crop, LandParcel } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Wheat, Plus, Edit2, Trash2, X, Calendar } from 'lucide-react';

const statusColors = {
  planned: 'bg-gray-100 text-gray-700',
  planted: 'bg-blue-100 text-blue-700',
  growing: 'bg-green-100 text-green-700',
  harvested: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

export const CropsManagement = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [parcels, setParcels] = useState<LandParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    area_planted: '',
    planted_on: '',
    expected_harvest_date: '',
    status: 'planned' as const,
    yield_expected: '',
    land_parcel_id: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      const [cropsData, parcelsData] = await Promise.all([
        supabase
          .from('crops')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('land_parcels')
          .select('*')
          .eq('user_id', user.id)
          .order('name'),
      ]);

      if (cropsData.error) throw cropsData.error;
      if (parcelsData.error) throw parcelsData.error;

      setCrops(cropsData.data || []);
      setParcels(parcelsData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
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
        area_planted: Number(formData.area_planted),
        yield_expected: Number(formData.yield_expected) || 0,
        land_parcel_id: formData.land_parcel_id || null,
      };

      if (editingCrop) {
        const { error } = await supabase
          .from('crops')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingCrop.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('crops').insert({
          ...payload,
          user_id: user.id,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingCrop(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving crop:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      variety: '',
      area_planted: '',
      planted_on: '',
      expected_harvest_date: '',
      status: 'planned',
      yield_expected: '',
      land_parcel_id: '',
      notes: '',
    });
  };

  const handleEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setFormData({
      name: crop.name,
      variety: crop.variety || '',
      area_planted: String(crop.area_planted),
      planted_on: crop.planted_on,
      expected_harvest_date: crop.expected_harvest_date,
      status: crop.status,
      yield_expected: String(crop.yield_expected),
      land_parcel_id: crop.land_parcel_id || '',
      notes: crop.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this crop?')) return;

    try {
      const { error } = await supabase.from('crops').delete().eq('id', id);
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  const totalAreaCultivated = crops.reduce((sum, crop) => sum + Number(crop.area_planted), 0);

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
          <h1 className="text-2xl font-bold text-gray-800">Crops Management</h1>
          <p className="text-gray-600 mt-1">
            {totalAreaCultivated.toFixed(1)} acres under cultivation
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCrop(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Crop
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingCrop ? 'Edit Crop' : 'Add Crop'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingCrop(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Wheat"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Winter Wheat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Parcel
                </label>
                <select
                  value={formData.land_parcel_id}
                  onChange={(e) => setFormData({ ...formData, land_parcel_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select parcel (optional)</option>
                  {parcels.map((parcel) => (
                    <option key={parcel.id} value={parcel.id}>
                      {parcel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area Planted (acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.area_planted}
                  onChange={(e) => setFormData({ ...formData, area_planted: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="5.0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planted On
                </label>
                <input
                  type="date"
                  value={formData.planted_on}
                  onChange={(e) => setFormData({ ...formData, planted_on: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Harvest Date
                </label>
                <input
                  type="date"
                  value={formData.expected_harvest_date}
                  onChange={(e) =>
                    setFormData({ ...formData, expected_harvest_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as typeof formData.status,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="planned">Planned</option>
                  <option value="planted">Planted</option>
                  <option value="growing">Growing</option>
                  <option value="harvested">Harvested</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Yield (tons)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.yield_expected}
                  onChange={(e) => setFormData({ ...formData, yield_expected: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10.0"
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
                    setEditingCrop(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingCrop ? 'Update' : 'Add'} Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Wheat className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{crop.name}</h3>
                  {crop.variety && (
                    <p className="text-sm text-gray-500">{crop.variety}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(crop)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(crop.id)}
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
                    statusColors[crop.status]
                  }`}
                >
                  {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Area</span>
                <span className="font-semibold text-gray-800">{crop.area_planted} acres</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Planted</span>
                <span className="font-medium text-gray-800">
                  {new Date(crop.planted_on).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Expected Harvest</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(crop.expected_harvest_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {crop.yield_expected > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expected Yield</span>
                  <span className="font-semibold text-gray-800">
                    {crop.yield_expected} tons
                  </span>
                </div>
              )}

              {crop.notes && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{crop.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {crops.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Wheat className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No crops yet. Add your first crop to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
