import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Customer Components
import Header from './components/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import MyCart from './components/MyCart';
import MyOrders from './components/MyOrders';
import PlaceOrder from './components/PlaceOrder';
import History from './components/History';
import Feedback from './components/Feedback';
import NotFound from './components/NotFound';
import LoaderSpinner from './components/LoaderSpinner';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AddCategories from './components/admin/AddCategories';
import AddProducts from './components/admin/AddProducts';
import UpdateProduct from './components/admin/UpdateProduct';
import AdminLogin from './components/admin/AdminLogin';
import AdminHeader from './components/admin/AdminHeader';
import AdminSidebar from './components/admin/AdminSidebar';
import AdminHome from './components/admin/AdminHome';
import PaymentManagement from './components/admin/PaymentManagement';
import AdminFeedback from './components/admin/AdminFeedback';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {isLoading && <LoaderSpinner />}
            
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <LandingPage />
                  <Footer />
                </>
              } />
              
              <Route path="/home" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <Home searchQuery={searchQuery} />
                  <Footer />
                </>
              } />
              
              <Route path="/product/:id" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <ProductDetails />
                  <Footer />
                </>
              } />
              
              <Route path="/cart" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <MyCart />
                  <Footer />
                </>
              } />
              
              <Route path="/orders" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <MyOrders />
                  <Footer />
                </>
              } />
              
              <Route path="/checkout" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <PlaceOrder />
                  <Footer />
                </>
              } />
              
              <Route path="/history" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <History />
                  <Footer />
                </>
              } />
              
              <Route path="/feedback" element={
                <>
                  <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
                  <Feedback />
                  <Footer />
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <AdminDashboard />
                  </div>
                </div>
              } />
              
              <Route path="/admin/home" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <AdminHome />
                  </div>
                </div>
              } />
              
              <Route path="/admin/add-categories" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <AddCategories />
                  </div>
                </div>
              } />
              
              <Route path="/admin/add-products" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <AddProducts />
                  </div>
                </div>
              } />
              
              <Route path="/admin/update-product/:id" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <UpdateProduct />
                  </div>
                </div>
              } />
              
              <Route path="/admin/payments" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <PaymentManagement />
                  </div>
                </div>
              } />
              
              <Route path="/admin/feedback" element={
                <div className="flex">
                  <AdminSidebar />
                  <div className="flex-1">
                    <AdminHeader />
                    <AdminFeedback />
                  </div>
                </div>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;