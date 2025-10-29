import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthForm } from './components/AuthForm';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { LandManagement } from './pages/LandManagement';
import { CropsManagement } from './pages/CropsManagement';
import { InventoryManagement } from './pages/InventoryManagement';
import { ToolsManagement } from './pages/ToolsManagement';
import { FinancialTracking } from './pages/FinancialTracking';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'land':
        return <LandManagement />;
      case 'crops':
        return <CropsManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'tools':
        return <ToolsManagement />;
      case 'finance':
        return <FinancialTracking />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
