import { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AIChatbot } from './AIChatbot';
import { WeatherWidget } from './WeatherWidget';
import { LocationMap } from './LocationMap';
import {
  LayoutDashboard,
  MapPin,
  Wheat,
  Package,
  Wrench,
  DollarSign,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Sprout,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'land', label: 'Land', icon: MapPin },
  { id: 'crops', label: 'Crops', icon: Wheat },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export const Layout = ({ children, currentPage, onNavigate }: LayoutProps) => {
  const { profile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Farmagrid</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{profile?.farm_name || 'Your Farm'}</p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{profile?.role || 'Farmer'}</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute bottom-full left-3 right-3 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1">
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setProfileOpen(false);
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
                  >
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Profile Settings</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
                  >
                    <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64 lg:pr-80">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 capitalize lg:block hidden">
              {currentPage}
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('notifications')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition relative"
                title="View notifications"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                title="Toggle weather and map"
              >
                {rightSidebarOpen ? (
                  <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>

      <aside
        className={`fixed inset-y-0 right-0 z-30 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-200 lg:translate-x-0 overflow-y-auto ${
          rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Location & Weather</h3>
            <button
              onClick={() => setRightSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <WeatherWidget />

          <LocationMap location={profile?.location} />
        </div>
      </aside>

      {(sidebarOpen || (rightSidebarOpen && window.innerWidth < 1024)) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}

      <AIChatbot />
    </div>
  );
};
