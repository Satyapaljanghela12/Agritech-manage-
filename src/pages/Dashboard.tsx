import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  MapPin,
  Wheat,
  Package,
  Wrench,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface DashboardStats {
  totalLand: number;
  activeCrops: number;
  upcomingHarvests: number;
  lowStockItems: number;
  maintenanceDue: number;
  totalExpenses: number;
  totalRevenue: number;
  profitLoss: number;
}

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps = {}) => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLand: 0,
    activeCrops: 0,
    upcomingHarvests: 0,
    lowStockItems: 0,
    maintenanceDue: 0,
    totalExpenses: 0,
    totalRevenue: 0,
    profitLoss: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const [
        landData,
        cropsData,
        inventoryData,
        toolsData,
        expensesData,
        revenueData,
      ] = await Promise.all([
        supabase
          .from('land_parcels')
          .select('area')
          .eq('user_id', user.id),
        supabase
          .from('crops')
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['planted', 'growing']),
        supabase
          .from('inventory')
          .select('*')
          .eq('user_id', user.id),
        supabase
          .from('tools_equipment')
          .select('*')
          .eq('user_id', user.id),
        supabase
          .from('financial_records')
          .select('amount')
          .eq('user_id', user.id)
          .eq('type', 'expense'),
        supabase
          .from('financial_records')
          .select('amount')
          .eq('user_id', user.id)
          .eq('type', 'revenue'),
      ]);

      const totalLand = landData.data?.reduce((sum, land) => sum + Number(land.area), 0) || 0;
      const activeCrops = cropsData.data?.length || 0;

      const today = new Date();
      const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      const upcomingHarvests =
        cropsData.data?.filter((crop) => {
          const harvestDate = new Date(crop.expected_harvest_date);
          return harvestDate >= today && harvestDate <= thirtyDaysLater;
        }).length || 0;

      const lowStockItems =
        inventoryData.data?.filter((item) => item.quantity <= item.alert_level).length || 0;

      const maintenanceDue =
        toolsData.data?.filter((tool) => {
          if (!tool.next_maintenance_date) return false;
          const maintenanceDate = new Date(tool.next_maintenance_date);
          return maintenanceDate <= thirtyDaysLater;
        }).length || 0;

      const totalExpenses =
        expensesData.data?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
      const totalRevenue =
        revenueData.data?.reduce((sum, rev) => sum + Number(rev.amount), 0) || 0;
      const profitLoss = totalRevenue - totalExpenses;

      setStats({
        totalLand,
        activeCrops,
        upcomingHarvests,
        lowStockItems,
        maintenanceDue,
        totalExpenses,
        totalRevenue,
        profitLoss,
      });

      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentActivity(notifications || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your farm operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => handleNavigate('land')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-left group"
          title="View and manage land parcels"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Land</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalLand.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">acres</p>
        </button>

        <button
          onClick={() => handleNavigate('crops')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-left group"
          title="View and manage crops"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition">
              <Wheat className="w-6 h-6 text-amber-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Crops</p>
          <p className="text-3xl font-bold text-gray-800">{stats.activeCrops}</p>
          <p className="text-xs text-gray-500 mt-1">in cultivation</p>
        </button>

        <button
          onClick={() => handleNavigate('crops')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-left group"
          title="View upcoming harvests"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Upcoming Harvests</p>
          <p className="text-3xl font-bold text-gray-800">{stats.upcomingHarvests}</p>
          <p className="text-xs text-gray-500 mt-1">in 30 days</p>
        </button>

        <button
          onClick={() => handleNavigate('notifications')}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all text-left group"
          title="View all alerts and notifications"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Alerts</p>
          <p className="text-3xl font-bold text-gray-800">
            {stats.lowStockItems + stats.maintenanceDue}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.lowStockItems} low stock, {stats.maintenanceDue} maintenance
          </p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Financial Overview</h3>
            <button
              onClick={() => handleNavigate('finance')}
              className="text-sm text-green-600 hover:text-green-700 transition flex items-center gap-1"
              title="View detailed financial records"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${stats.totalExpenses.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-4 rounded-lg ${
                stats.profitLoss >= 0 ? 'bg-emerald-50' : 'bg-orange-50'
              }`}
            >
              <div>
                <p className="text-sm text-gray-600">Net Profit/Loss</p>
                <p
                  className={`text-2xl font-bold ${
                    stats.profitLoss >= 0 ? 'text-emerald-600' : 'text-orange-600'
                  }`}
                >
                  ${Math.abs(stats.profitLoss).toFixed(2)}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stats.profitLoss >= 0
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {stats.profitLoss >= 0 ? 'Profit' : 'Loss'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button
              onClick={() => handleNavigate('notifications')}
              className="text-sm text-green-600 hover:text-green-700 transition flex items-center gap-1"
              title="View all notifications"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => handleNavigate('inventory')}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white hover:shadow-lg transition-all text-left group"
          title="Manage inventory and supplies"
        >
          <Package className="w-8 h-8 mb-3 opacity-80 group-hover:opacity-100 transition" />
          <p className="text-sm opacity-90 mb-1">Inventory Items</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Track supplies</p>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
          </div>
        </button>

        <button
          onClick={() => handleNavigate('tools')}
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white hover:shadow-lg transition-all text-left group"
          title="Manage tools and equipment"
        >
          <Wrench className="w-8 h-8 mb-3 opacity-80 group-hover:opacity-100 transition" />
          <p className="text-sm opacity-90 mb-1">Equipment</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Manage tools</p>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
          </div>
        </button>

        <button
          onClick={() => handleNavigate('crops')}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white hover:shadow-lg transition-all text-left group"
          title="Monitor crop health and growth"
        >
          <Wheat className="w-8 h-8 mb-3 opacity-80 group-hover:opacity-100 transition" />
          <p className="text-sm opacity-90 mb-1">Crop Health</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Monitor growth</p>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
          </div>
        </button>

        <button
          onClick={() => handleNavigate('land')}
          className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-6 text-white hover:shadow-lg transition-all text-left group"
          title="Organize and manage land parcels"
        >
          <MapPin className="w-8 h-8 mb-3 opacity-80 group-hover:opacity-100 transition" />
          <p className="text-sm opacity-90 mb-1">Land Parcels</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Organize land</p>
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
          </div>
        </button>
      </div>
    </div>
  );
};
