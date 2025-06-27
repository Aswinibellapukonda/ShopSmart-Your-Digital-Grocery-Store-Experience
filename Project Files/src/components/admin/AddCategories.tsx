import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const AddCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Fresh Produce', icon: 'Leaf', color: 'bg-green-100 text-green-700', description: 'Fresh fruits and vegetables' },
    { id: '2', name: 'Dairy & Eggs', icon: 'Milk', color: 'bg-blue-100 text-blue-700', description: 'Milk, cheese, eggs and dairy products' },
    { id: '3', name: 'Meat & Seafood', icon: 'Fish', color: 'bg-red-100 text-red-700', description: 'Fresh meat and seafood' },
    { id: '4', name: 'Bakery', icon: 'Cookie', color: 'bg-yellow-100 text-yellow-700', description: 'Bread, pastries and baked goods' }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Package',
    color: 'bg-gray-100 text-gray-700',
    description: ''
  });

  const colorOptions = [
    'bg-green-100 text-green-700',
    'bg-blue-100 text-blue-700',
    'bg-red-100 text-red-700',
    'bg-yellow-100 text-yellow-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-pink-100 text-pink-700',
    'bg-indigo-100 text-indigo-700'
  ];

  const iconOptions = [
    'Package', 'Leaf', 'Milk', 'Fish', 'Cookie', 'Coffee', 'Apple', 'Carrot',
    'Beef', 'Wheat', 'Grape', 'Cherry', 'Banana', 'Pizza', 'IceCream'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setCategories(categories.map(cat => 
        cat.id === editingId 
          ? { ...cat, ...formData }
          : cat
      ));
      setEditingId(null);
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData
      };
      setCategories([...categories, newCategory]);
      setIsAddingNew(false);
    }
    
    setFormData({ name: '', icon: 'Package', color: 'bg-gray-100 text-gray-700', description: '' });
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color,
      description: category.description
    });
    setEditingId(category.id);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({ name: '', icon: 'Package', color: 'bg-gray-100 text-gray-700', description: '' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Categories</h1>
          <p className="text-gray-600">Add, edit, and organize your product categories</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      formData.color === color ? 'border-emerald-500' : 'border-gray-200'
                    } ${color}`}
                  >
                    <div className="w-full h-4 rounded"></div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter category description"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingId ? 'Update Category' : 'Add Category'}</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Existing Categories</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {categories.map((category) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
            
            return (
              <div key={category.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddCategories;