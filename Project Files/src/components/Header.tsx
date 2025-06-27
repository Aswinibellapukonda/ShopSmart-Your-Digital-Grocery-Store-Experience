import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import CartModal from './CartModal';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery }) => {
  const { state: cartState } = useCart();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-emerald-600">FreshMart</h1>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-600 text-white rounded-full text-xs flex items-center justify-center font-medium">
                    {cartState.itemCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <button
                      onClick={logout}
                      className="hidden md:block text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <User className="h-6 w-6" />
                    <span className="hidden md:block text-sm">Sign In</span>
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
};

export default Header;