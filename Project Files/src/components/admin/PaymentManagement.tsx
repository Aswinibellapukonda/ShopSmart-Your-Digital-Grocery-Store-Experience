import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: 'card' | 'paypal' | 'bank';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  transactionId: string;
}

const PaymentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  // Mock payment data
  const payments: Payment[] = [
    {
      id: '1',
      orderId: 'ORD-2024-001',
      customer: 'John Doe',
      amount: 45.99,
      method: 'card',
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      transactionId: 'TXN-001'
    },
    {
      id: '2',
      orderId: 'ORD-2024-002',
      customer: 'Jane Smith',
      amount: 32.50,
      method: 'paypal',
      status: 'pending',
      date: '2024-01-15T09:15:00Z',
      transactionId: 'TXN-002'
    },
    {
      id: '3',
      orderId: 'ORD-2024-003',
      customer: 'Mike Johnson',
      amount: 78.25,
      method: 'card',
      status: 'failed',
      date: '2024-01-14T16:45:00Z',
      transactionId: 'TXN-003'
    },
    {
      id: '4',
      orderId: 'ORD-2024-004',
      customer: 'Sarah Wilson',
      amount: 23.75,
      method: 'bank',
      status: 'completed',
      date: '2024-01-14T14:20:00Z',
      transactionId: 'TXN-004'
    }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Successful Payments',
      value: '1,234',
      change: '+8.2%',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending Payments',
      value: '23',
      change: '-5.1%',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Failed Payments',
      value: '12',
      change: '+2.3%',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'refunded':
        return <XCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'paypal':
        return <div className="w-4 h-4 bg-blue-600 rounded-full"></div>;
      case 'bank':
        return <div className="w-4 h-4 bg-gray-600 rounded"></div>;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
          <p className="text-gray-600">Monitor and manage all payment transactions</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} vs last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
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
              placeholder="Search by order ID, customer, or transaction ID..."
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Methods</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.transactionId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.orderId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      ${payment.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm text-gray-900 capitalize">
                        {payment.method}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-900 flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || methodFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Payment transactions will appear here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;