import React from 'react';
import { Loader2 } from 'lucide-react';

const LoaderSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <div className="absolute inset-0 h-12 w-12 border-4 border-emerald-200 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading...</h3>
        <p className="text-gray-600">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoaderSpinner;