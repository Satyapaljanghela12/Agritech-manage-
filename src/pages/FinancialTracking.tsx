import { useEffect, useState } from 'react';
import { supabase, FinancialRecord, Crop } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DollarSign, Plus, Edit2, Trash2, X, TrendingUp, TrendingDown } from 'lucide-react';

export const FinancialTracking = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FinancialRecord | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [formData, setFormData] = useState({
    type: 'expense' as const,
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    crop_id: '',
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      const [recordsData, cropsData] = await Promise.all([
        supabase
          .from('financial_records')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false }),
        supabase.from('crops').select('*').eq('user_id', user.id).order('name'),
      ]);

      if (recordsData.error) throw recordsData.error;
      if (cropsData.error) throw cropsData.error;

      setRecords(recordsData.data || []);
      setCrops(cropsData.data || []);
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
        amount: Number(formData.amount),
        crop_id: formData.crop_id || null,
      };

      if (editingRecord) {
        const { error } = await supabase
          .from('financial_records')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editingRecord.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('financial_records').insert({
          ...payload,
          user_id: user.id,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingRecord(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      category: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      crop_id: '',
    });
  };

  const handleEdit = (record: FinancialRecord) => {
    setEditingRecord(record);
    setFormData({
      type: record.type,
      category: record.category,
      description: record.description || '',
      amount: String(record.amount),
      date: record.date,
      crop_id: record.crop_id || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      const { error } = await supabase.from('financial_records').delete().eq('id', id);
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredRecords =
    filterType === 'all'
      ? records
      : records.filter((record) => record.type === filterType);

  const totalExpenses = records
    .filter((r) => r.type === 'expense')
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const totalRevenue = records
    .filter((r) => r.type === 'revenue')
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const netProfit = totalRevenue - totalExpenses;

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
          <h1 className="text-2xl font-bold text-gray-800">Financial Tracking</h1>
          <p className="text-gray-600 mt-1">{records.length} transactions recorded</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingRecord(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <p className="text-3xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </div>
          <p className="text-3xl font-bold text-gray-800">${totalExpenses.toFixed(2)}</p>
        </div>

        <div
          className={`rounded-xl p-6 border ${
            netProfit >= 0
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-orange-50 border-orange-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-2 rounded-lg ${
                netProfit >= 0 ? 'bg-emerald-100' : 'bg-orange-100'
              }`}
            >
              <DollarSign
                className={`w-5 h-5 ${
                  netProfit >= 0 ? 'text-emerald-600' : 'text-orange-600'
                }`}
              />
            </div>
            <p
              className={`text-sm font-medium ${
                netProfit >= 0 ? 'text-emerald-700' : 'text-orange-700'
              }`}
            >
              Net {netProfit >= 0 ? 'Profit' : 'Loss'}
            </p>
          </div>
          <p
            className={`text-3xl font-bold ${
              netProfit >= 0 ? 'text-emerald-700' : 'text-orange-700'
            }`}
          >
            ${Math.abs(netProfit).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'expense', 'revenue'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingRecord ? 'Edit Transaction' : 'Add Transaction'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingRecord(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as typeof formData.type })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="expense">Expense</option>
                  <option value="revenue">Revenue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Seeds, Labor, Sales, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="100.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Related Crop (Optional)
                </label>
                <select
                  value={formData.crop_id}
                  onChange={(e) => setFormData({ ...formData, crop_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingRecord(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingRecord ? 'Update' : 'Add'} Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        record.type === 'revenue'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {record.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.description}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                      record.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {record.type === 'revenue' ? '+' : '-'}${Number(record.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No transactions yet. Add your first transaction to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
