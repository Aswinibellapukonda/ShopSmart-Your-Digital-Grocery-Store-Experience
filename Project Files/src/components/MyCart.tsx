import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MyCart: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/home"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{state.itemCount} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.unit}</p>
                  <p className="text-lg font-bold text-emerald-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">
                {state.total > 50 ? 'Free' : '$5.99'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${(state.total * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-emerald-600">
                  ${(state.total + (state.total > 50 ? 0 : 5.99) + state.total * 0.08).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {state.total < 50 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-emerald-700">
                Add ${(50 - state.total).toFixed(2)} more for free shipping!
              </p>
            </div>
          )}

          <Link
            to="/checkout"
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-semibold text-center block"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/home"
            className="w-full text-center text-emerald-600 hover:text-emerald-700 font-medium mt-4 block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCart;