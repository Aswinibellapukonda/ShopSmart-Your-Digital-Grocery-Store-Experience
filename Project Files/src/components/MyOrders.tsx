import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Truck } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
}

const MyOrders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 42.50,
      items: [
        {
          id: '1',
          name: 'Organic Bananas',
          image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=100',
          quantity: 2,
          price: 2.99
        },
        {
          id: '2',
          name: 'Fresh Strawberries',
          image: 'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=100',
          quantity: 1,
          price: 4.99
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 28.75,
      items: [
        {
          id: '3',
          name: 'Whole Milk',
          image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=100',
          quantity: 1,
          price: 3.49
        }
      ]
    }
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-8" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">When you place your first order, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <div className="flex -space-x-2 flex-1">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                    
                    {order.status === 'delivered' && (
                      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order #{selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">
                Placed on {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedOrder.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;