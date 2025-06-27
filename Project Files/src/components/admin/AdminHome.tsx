import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Edit, 
  CreditCard, 
  MessageSquare, 
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign
} from 'lucide-react';

const AdminHome: React.FC = () => {
  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Add fresh products to your inventory',
      icon: Plus,
      link: '/admin/add-products',
      color: 'bg-emerald-500'
    },
    {
      title: 'Manage Categories',
      description: 'Organize your product categories',
      icon: Package,
      link: '/admin/add-categories',
      color: 'bg-blue-500'
    },
    {
      title: 'Update Products',
      description: 'Edit existing product information',
      icon: Edit,
      link: '/admin/update-product/1',
      color: 'bg-purple-500'
    },
    {
      title: 'Payment Management',
      description: 'Handle payments and transactions',
      icon: CreditCard,
      link: '/admin/payments',
      color: 'bg-orange-500'
    },
    {
      title: 'Customer Feedback',
      description: 'Review customer feedback and ratings',
      icon: MessageSquare,
      link: '/admin/feedback',
      color: 'bg-pink-500'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View detailed analytics and reports',
      icon: TrendingUp,
      link: '/admin/dashboard',
      color: 'bg-indigo-500'
    }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      change: '+12%',
      icon: Package,
      color: 'text-emerald-600'
    },
    {
      title: 'Active Users',
      value: '5,678',
      change: '+8%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Orders Today',
      value: '89',
      change: '+23%',
      icon: ShoppingCart,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue',
      value: '$12,345',
      change: '+15%',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Admin Portal</h1>
        <p className="text-gray-600">Manage your grocery store efficiently with our comprehensive admin tools</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New product added', item: 'Organic Bananas', time: '2 hours ago', type: 'success' },
            { action: 'Order completed', item: 'Order #ORD-2024-001', time: '4 hours ago', type: 'info' },
            { action: 'Customer feedback', item: '5-star review received', time: '6 hours ago', type: 'success' },
            { action: 'Product updated', item: 'Fresh Strawberries', time: '1 day ago', type: 'warning' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'info' ? 'bg-blue-500' :
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;