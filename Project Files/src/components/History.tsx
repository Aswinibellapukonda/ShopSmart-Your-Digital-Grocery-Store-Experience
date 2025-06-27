import React, { useState } from 'react';
import { Calendar, Package, Clock, CheckCircle, XCircle, Search } from 'lucide-react';

interface HistoryItem {
  id: string;
  type: 'order' | 'delivery' | 'return';
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
  amount?: number;
  orderId?: string;
}

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock history data
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'order',
      date: '2024-01-15',
      description: 'Order placed - Fresh groceries delivery',
      status: 'completed',
      amount: 42.50,
      orderId: 'ORD-2024-001'
    },
    {
      id: '2',
      type: 'delivery',
      date: '2024-01-16',
      description: 'Order delivered successfully',
      status: 'completed',
      orderId: 'ORD-2024-001'
    },
    {
      id: '3',
      type: 'order',
      date: '2024-01-10',
      description: 'Order placed - Dairy products',
      status: 'completed',
      amount: 28.75,
      orderId: 'ORD-2024-002'
    },
    {
      id: '4',
      type: 'order',
      date: '2024-01-08',
      description: 'Order cancelled - Payment failed',
      status: 'cancelled',
      amount: 35.20,
      orderId: 'ORD-2024-003'
    }
  ];

  const filteredHistory = historyItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.orderId && item.orderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'delivery':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'return':
        return <XCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-600">Track all your order activities and transactions</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search orders, descriptions..."
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Activities</option>
            <option value="order">Orders Only</option>
            <option value="delivery">Deliveries Only</option>
            <option value="return">Returns Only</option>
          </select>
        </div>
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No history found</h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Your order history will appear here once you start shopping'
              }
            </p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(item.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.description}
                      </h3>
                      {getStatusIcon(item.status)}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      
                      {item.orderId && (
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4" />
                          <span>{item.orderId}</span>
                        </div>
                      )}
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {item.amount && (
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${item.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {item.type}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {filteredHistory.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {filteredHistory.filter(item => item.type === 'order' && item.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredHistory.filter(item => item.type === 'delivery').length}
              </div>
              <div className="text-sm text-gray-600">Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ${filteredHistory
                  .filter(item => item.amount && item.status === 'completed')
                  .reduce((sum, item) => sum + (item.amount || 0), 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;