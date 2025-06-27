import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Customers',
      value: '5,678',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Products Sold',
      value: '8,901',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$45.99', status: 'Delivered', time: '2 hours ago' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$32.50', status: 'Processing', time: '4 hours ago' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: '$78.25', status: 'Shipped', time: '6 hours ago' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: '$23.75', status: 'Pending', time: '8 hours ago' }
  ];

  const topProducts = [
    { name: 'Organic Bananas', sold: 234, revenue: '$701.66' },
    { name: 'Fresh Strawberries', sold: 189, revenue: '$943.11' },
    { name: 'Whole Milk', sold: 156, revenue: '$544.44' },
    { name: 'Free-Range Eggs', sold: 134, revenue: '$802.66' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                    <Eye className="h-4 w-4 inline mr-1" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Chart Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Sales Overview</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-lg">
              Revenue
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              Orders
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Sales chart would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;