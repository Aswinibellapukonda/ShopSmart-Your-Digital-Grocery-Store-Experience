import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Leaf, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { dispatch } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
          <div className="flex">
            <div className="relative w-48 h-32">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.organic && (
                <div className="absolute top-2 left-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Leaf className="h-3 w-3" />
                  <span>Organic</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-4 flex justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{product.unit}</span>
                </div>
                
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.organic && (
            <div className="absolute top-3 left-3 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Leaf className="h-3 w-3" />
              <span>Organic</span>
            </div>
          )}
          {product.originalPrice && (
            <div className="absolute top-3 right-3 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-emerald-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">{product.unit}</span>
          </div>
          
          <button
            onClick={addToCart}
            disabled={!product.inStock}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
          >
            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;