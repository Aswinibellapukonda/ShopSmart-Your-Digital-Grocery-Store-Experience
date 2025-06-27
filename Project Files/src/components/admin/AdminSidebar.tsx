import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Package, 
  Plus, 
  Edit, 
  CreditCard, 
  MessageSquare,
  LogOut,
  Settings
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/home', icon: Home, label: 'Home' },
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/add-categories', icon: Plus, label: 'Add Categories' },
    { path: '/admin/add-products', icon: Package, label: 'Add Products' },
    { path: '/admin/update-product/1', icon: Edit, label: 'Update Products' },
    { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { path: '/admin/feedback', icon: MessageSquare, label: 'Feedback' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path.includes('update-product') && location.pathname.includes('update-product'));
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-emerald-400">FreshMart Admin</h2>
        <p className="text-gray-400 text-sm mt-2">Management Portal</p>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 px-4">
          <div className="border-t border-gray-700 pt-4 space-y-2">
            <Link
              to="/admin/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;