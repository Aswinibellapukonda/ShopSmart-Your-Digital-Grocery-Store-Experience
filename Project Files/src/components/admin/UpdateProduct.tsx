import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, X, Upload, Search, Edit, Trash2 } from 'lucide-react';
import { products } from '../../data/mockData';

const UpdateProduct: React.FC = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    unit: '',
    inStock: true,
    organic: false,
    featured: false,
    image: ''
  });

  const categories = [
    { id: 'fresh', name: 'Fresh Produce' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'meat', name: 'Meat & Seafood' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'pantry', name: 'Pantry' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const units = [
    'per item', 'per lb', 'per kg', 'per bunch', 'per dozen',
    'per gallon', 'per container', 'per package', 'per bottle'
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      description: product.description,
      unit: product.unit,
      inStock: product.inStock,
      organic: product.organic || false,
      featured: product.featured || false,
      image: product.image
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the updated data to your backend
    console.log('Updated product data:', formData);
    alert('Product updated successfully!');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      alert('Product deleted successfully!');
      setSelectedProduct(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Products</h1>
        <p className="text-gray-600">Search and edit existing products</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Search & List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Products</h2>
            
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search products..."
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedProduct?.id === product.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details & Edit Form */}
        <div className="lg:col-span-2">
          {selectedProduct ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Product' : 'Product Details'}
                </h2>
                <div className="flex space-x-2">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                        In Stock
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="organic"
                        checked={formData.organic}
                        onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
                        Organic Product
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                        Featured Product
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Update Product</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Price:</span>
                          <p className="text-lg font-semibold text-emerald-600">
                            ${selectedProduct.price}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Unit:</span>
                          <p className="text-lg font-semibold">{selectedProduct.unit}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Category:</span>
                          <p className="text-lg font-semibold capitalize">{selectedProduct.category}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Status:</span>
                          <p className={`text-lg font-semibold ${
                            selectedProduct.inStock ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Product</h3>
              <p className="text-gray-500">Choose a product from the list to view and edit its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;