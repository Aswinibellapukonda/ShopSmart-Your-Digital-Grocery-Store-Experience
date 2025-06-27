import React from 'react';
import * as Icons from 'lucide-react';
import { categories } from '../data/mockData';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            selectedCategory === '' 
              ? 'bg-emerald-100 text-emerald-700 font-medium' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                selectedCategory === category.id 
                  ? 'bg-emerald-100 text-emerald-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${category.color}`}>
                <IconComponent className="h-4 w-4" />
              </div>
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;