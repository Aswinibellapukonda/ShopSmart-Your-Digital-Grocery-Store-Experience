import React from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search..."
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <Settings className="h-6 w-6" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;