import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Clock, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PlaceOrder: React.FC = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      instructions: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    },
    delivery: {
      date: '',
      timeSlot: ''
    }
  });

  const subtotal = state.total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (section: string, field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    dispatch({ type: 'CLEAR_CART' });
    navigate('/orders');
  };

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  const getMinDeliveryDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Delivery Address */}
          {step === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={orderData.address.street}
                    onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={orderData.address.city}
                      onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={orderData.address.state}
                      onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={orderData.address.zipCode}
                    onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="ZIP Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    value={orderData.address.instructions}
                    onChange={(e) => handleInputChange('address', 'instructions', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-semibold"
              >
                Continue to Delivery Time
              </button>
            </div>
          )}

          {/* Step 2: Delivery Time */}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Time</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    min={getMinDeliveryDate()}
                    value={orderData.delivery.date}
                    onChange={(e) => handleInputChange('delivery', 'date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleInputChange('delivery', 'timeSlot', slot)}
                        className={`p-3 text-left border rounded-lg transition-colors ${
                          orderData.delivery.timeSlot === slot
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-semibold"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={orderData.payment.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={orderData.payment.expiryDate}
                      onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={orderData.payment.cvv}
                      onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={orderData.payment.nameOnCard}
                    onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <p className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-semibold"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span className="text-emerald-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;