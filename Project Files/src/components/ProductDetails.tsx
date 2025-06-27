import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, Heart, Share2, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link to="/home" className="text-emerald-600 hover:text-emerald-700">
          Return to shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const productImages = [product.image, product.image, product.image]; // In a real app, products would have multiple images

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm mb-8">
        <Link to="/home" className="text-emerald-600 hover:text-emerald-700">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600 capitalize">{product.category}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex space-x-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-emerald-600' : 'border-gray-200'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-emerald-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-gray-600">{product.unit}</span>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {product.description}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-emerald-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Delivery</div>
                  <div className="text-sm text-gray-600">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-emerald-600" />
                <div>
                  <div className="font-medium text-gray-900">Quality Guarantee</div>
                  <div className="text-sm text-gray-600">100% satisfaction</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-emerald-600" />
                <div>
                  <div className="font-medium text-gray-900">Easy Returns</div>
                  <div className="text-sm text-gray-600">7-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t border-gray-200 mb-16">
        <nav className="flex space-x-8">
          {['description', 'reviews', 'nutrition'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description} This premium product is carefully selected for its quality and freshness. 
                Our commitment to excellence ensures that every item meets our high standards before reaching your table.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Write a Review
                </button>
              </div>
              {/* Sample reviews */}
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">by Customer {index + 1}</span>
                    </div>
                    <p className="text-gray-700">
                      Great product! Fresh and high quality. Would definitely recommend.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nutrition Information</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600">
                  Detailed nutrition information will be available soon. Please check the product packaging for complete nutritional details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;