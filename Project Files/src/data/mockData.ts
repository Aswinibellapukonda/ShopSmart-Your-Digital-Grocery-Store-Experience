import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'fresh', name: 'Fresh Produce', icon: 'Leaf', color: 'bg-green-100 text-green-700' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'Milk', color: 'bg-blue-100 text-blue-700' },
  { id: 'meat', name: 'Meat & Seafood', icon: 'Fish', color: 'bg-red-100 text-red-700' },
  { id: 'bakery', name: 'Bakery', icon: 'Cookie', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'pantry', name: 'Pantry', icon: 'Package', color: 'bg-purple-100 text-purple-700' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee', color: 'bg-orange-100 text-orange-700' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    originalPrice: 3.49,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fresh',
    description: 'Fresh organic bananas, perfect for snacking or smoothies. Rich in potassium and natural sugars.',
    unit: 'per bunch',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    organic: true,
    featured: true
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    price: 4.99,
    image: 'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fresh',
    description: 'Sweet and juicy strawberries, locally sourced. Perfect for desserts or eating fresh.',
    unit: 'per container',
    inStock: true,
    rating: 4.9,
    reviews: 89,
    featured: true
  },
  {
    id: '3',
    name: 'Whole Milk',
    price: 3.49,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'dairy',
    description: 'Fresh whole milk from local farms. Rich in calcium and protein.',
    unit: 'per gallon',
    inStock: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: '4',
    name: 'Free-Range Eggs',
    price: 5.99,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'dairy',
    description: 'Fresh free-range eggs from happy chickens. Perfect for baking and cooking.',
    unit: 'per dozen',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    organic: true
  },
  {
    id: '5',
    name: 'Atlantic Salmon',
    price: 12.99,
    image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'meat',
    description: 'Fresh Atlantic salmon fillet, rich in omega-3 fatty acids.',
    unit: 'per lb',
    inStock: true,
    rating: 4.6,
    reviews: 78
  },
  {
    id: '6',
    name: 'Artisan Sourdough',
    price: 4.99,
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'bakery',
    description: 'Handcrafted sourdough bread with a crispy crust and soft interior.',
    unit: 'per loaf',
    inStock: true,
    rating: 4.8,
    reviews: 92,
    featured: true
  },
  {
    id: '7',
    name: 'Organic Pasta',
    price: 2.49,
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pantry',
    description: 'Premium organic pasta made from durum wheat semolina.',
    unit: 'per package',
    inStock: true,
    rating: 4.5,
    reviews: 67,
    organic: true
  },
  {
    id: '8',
    name: 'Cold Brew Coffee',
    price: 6.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'beverages',
    description: 'Smooth and refreshing cold brew coffee, ready to drink.',
    unit: 'per bottle',
    inStock: true,
    rating: 4.7,
    reviews: 134
  },
  {
    id: '9',
    name: 'Avocados',
    price: 1.99,
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fresh',
    description: 'Ripe Hass avocados, perfect for toast, salads, or guacamole.',
    unit: 'each',
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '10',
    name: 'Greek Yogurt',
    price: 4.49,
    image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'dairy',
    description: 'Creamy Greek yogurt, high in protein and probiotics.',
    unit: 'per container',
    inStock: true,
    rating: 4.8,
    reviews: 145
  }
];