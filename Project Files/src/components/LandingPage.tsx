import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Star, ArrowRight, Leaf, Clock, CreditCard } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Same-day delivery available for orders placed before 2 PM"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guaranteed",
      description: "Fresh products with 100% satisfaction guarantee"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Organic Selection",
      description: "Wide range of organic and locally sourced products"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Secure Payment",
      description: "Safe and secure payment options with encrypted checkout"
    }
  ];

  const categories = [
    {
      title: "Fresh Produce",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Farm-fresh fruits and vegetables"
    },
    {
      title: "Dairy & Eggs",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Fresh dairy products and free-range eggs"
    },
    {
      title: "Meat & Seafood",
      image: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Premium quality meat and fresh seafood"
    },
    {
      title: "Bakery",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Freshly baked bread and pastries"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Fresh Groceries
                  <span className="block text-emerald-200">Delivered Daily</span>
                </h1>
                <p className="text-xl text-emerald-100 leading-relaxed">
                  Shop from our wide selection of fresh produce, organic foods, and everyday essentials. 
                  Experience the convenience of online grocery shopping with same-day delivery.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/home"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors duration-200 group"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/home"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-emerald-600 transition-colors duration-200"
                >
                  Browse Categories
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <div className="text-emerald-100">
                  <span className="font-semibold">4.9/5</span> from 2,500+ reviews
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fresh groceries"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-emerald-400 rounded-2xl transform rotate-3 opacity-20"></div>
              <div className="absolute inset-0 bg-emerald-500 rounded-2xl transform -rotate-3 opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FreshMart?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to bringing you the freshest products with unmatched convenience and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Discover fresh products across all your favorite categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/home"
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">50K+</div>
              <div className="text-emerald-200 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">5K+</div>
              <div className="text-emerald-200 text-lg">Products</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-emerald-200 text-lg">Support</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">99%</div>
              <div className="text-emerald-200 text-lg">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of satisfied customers and experience the future of grocery shopping
            </p>
            <Link
              to="/home"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-200 group text-lg"
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Shop Now
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;