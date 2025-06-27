import React, { useState } from 'react';
import { Plus, Save, X, Upload, Image } from 'lucide-react';

const AddProducts: React.FC = () => {
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

  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = [
    { id: 'fresh', name: 'Fresh Produce' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'meat', name: 'Meat & Seafood' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'pantry', name: 'Pantry' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const units = [
    'per item',
    'per lb',
    'per kg',
    'per bunch',
    'per dozen',
    'per gallon',
    'per container',
    'per package',
    'per bottle'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Product data:', formData);
    alert('Product added successfully!');
    
    // Reset form
    setFormData({
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
    setImagePreview('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Add fresh products to your inventory</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>
              
              {imagePreview && (
                <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Options</h3>
            
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
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Add Product</span>
            </button>
            
            <button
              type="button"
              onClick={() => {
                setFormData({
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
                setImagePreview('');
              }}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Clear Form</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;