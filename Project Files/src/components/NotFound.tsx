import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ShoppingBag } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-emerald-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors group"
          >
            <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Go to Homepage
          </Link>
          
          <Link
            to="/home"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors group"
          >
            <ShoppingBag className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Continue Shopping
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Customer Support</h3>
              <p className="text-gray-600">Get help from our support team</p>
              <Link to="/feedback" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Contact Support →
              </Link>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Browse Products</h3>
              <p className="text-gray-600">Explore our fresh groceries</p>
              <Link to="/home" className="text-emerald-600 hover:text-emerald-700 font-medium">
                View Products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;