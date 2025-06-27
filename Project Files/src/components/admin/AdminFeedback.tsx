import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Search, 
  Filter,
  Eye,
  Reply,
  Archive,
  Trash2,
  TrendingUp
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  customer: string;
  email: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  status: 'new' | 'responded' | 'archived';
  orderNumber?: string;
}

const AdminFeedback: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  // Mock feedback data
  const feedbackItems: FeedbackItem[] = [
    {
      id: '1',
      customer: 'John Doe',
      email: 'john@example.com',
      rating: 5,
      category: 'general',
      comment: 'Excellent service! The groceries were fresh and delivered on time. Very satisfied with the quality.',
      date: '2024-01-15T10:30:00Z',
      status: 'new',
      orderNumber: 'ORD-2024-001'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      rating: 4,
      category: 'delivery',
      comment: 'Good quality products, but the delivery was slightly delayed. Overall happy with the service.',
      date: '2024-01-14T16:45:00Z',
      status: 'responded',
      orderNumber: 'ORD-2024-002'
    },
    {
      id: '3',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      rating: 3,
      category: 'product-quality',
      comment: 'Some items were not as fresh as expected. The bananas were overripe.',
      date: '2024-01-13T09:15:00Z',
      status: 'new'
    },
    {
      id: '4',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      rating: 5,
      category: 'website',
      comment: 'Love the new website design! Very easy to navigate and place orders.',
      date: '2024-01-12T14:20:00Z',
      status: 'archived'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Experience' },
    { value: 'delivery', label: 'Delivery Service' },
    { value: 'product-quality', label: 'Product Quality' },
    { value: 'website', label: 'Website/App' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  const stats = [
    {
      title: 'Total Feedback',
      value: '1,234',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Average Rating',
      value: '4.2',
      change: '+0.3',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Response Rate',
      value: '89%',
      change: '+5%',
      icon: Reply,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Satisfaction',
      value: '92%',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const filteredFeedback = feedbackItems.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.orderNumber && item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const handleStatusChange = (id: string, newStatus: 'new' | 'responded' | 'archived') => {
    // Here you would update the status in your backend
    console.log(`Updating feedback ${id} status to ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Feedback</h1>
          <p className="text-gray-600">Monitor and respond to customer feedback and reviews</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-green-600">
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
              placeholder="Search feedback by customer, comment, or order..."
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Customer Reviews & Feedback</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredFeedback.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
              <p className="text-gray-500">
                {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Customer feedback will appear here'
                }
              </p>
            </div>
          ) : (
            filteredFeedback.map((feedback) => (
              <div key={feedback.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feedback.customer}
                        </h3>
                        <p className="text-sm text-gray-600">{feedback.email}</p>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= feedback.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(feedback.status)}`}>
                        {feedback.status}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3">{feedback.comment}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{formatDate(feedback.date)}</span>
                      {feedback.orderNumber && (
                        <span>Order: {feedback.orderNumber}</span>
                      )}
                      <span className="capitalize">{feedback.category.replace('-', ' ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedFeedback(feedback)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleStatusChange(feedback.id, 'responded')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Mark as Responded"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleStatusChange(feedback.id, 'archived')}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Archive"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => console.log('Delete feedback', feedback.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Feedback Details</h2>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedFeedback.customer}
                    </h3>
                    <p className="text-gray-600">{selectedFeedback.email}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= selectedFeedback.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedFeedback.comment}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Date:</span>
                    <p className="text-gray-600">{formatDate(selectedFeedback.date)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Category:</span>
                    <p className="text-gray-600 capitalize">
                      {selectedFeedback.category.replace('-', ' ')}
                    </p>
                  </div>
                  {selectedFeedback.orderNumber && (
                    <div>
                      <span className="font-medium text-gray-900">Order:</span>
                      <p className="text-gray-600">{selectedFeedback.orderNumber}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-900">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedFeedback.status)}`}>
                      {selectedFeedback.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Response</h4>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Type your response to the customer..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                    Send Response
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedFeedback.id, 'archived')}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;