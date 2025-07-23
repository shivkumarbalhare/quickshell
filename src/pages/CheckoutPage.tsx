import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { items, total, discountedTotal, discount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentCharges, setPaymentCharges] = useState(0);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'card'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('');
  const [paymentProgress, setPaymentProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'paymentMethod') {
      // Add extra charges for card payments
      if (e.target.value === 'card') {
        setPaymentCharges(30);
      } else {
        setPaymentCharges(0);
      }
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('Validating payment details...');
    setPaymentProgress(20);

    // Simulate real-time payment processing steps
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPaymentStep('Connecting to payment gateway...');
    setPaymentProgress(40);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPaymentStep('Processing payment...');
    setPaymentProgress(60);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPaymentStep('Verifying transaction...');
    setPaymentProgress(80);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPaymentStep('Payment successful! Creating order...');
    setPaymentProgress(100);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate delivery date based on payment method
    const deliveryDays = formData.paymentMethod === 'cod' ? 5 : 4;
    const estimatedDelivery = new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000);
    // Create order
    const order = {
      id: Date.now().toString(),
      items: items,
      total: Math.round((discountedTotal + paymentCharges) * 1.18),
      originalTotal: Math.round((total + paymentCharges) * 1.18),
      discount: discount,
      paymentCharges: paymentCharges,
      paymentMethod: formData.paymentMethod,
      customerInfo: formData,
      status: 'confirmed',
      date: new Date().toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      canCancel: true,
      cancelDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    // Save order to localStorage (in real app, this would be sent to backend)
    const existingOrders = JSON.parse(localStorage.getItem('quicksell_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('quicksell_orders', JSON.stringify(existingOrders));

    clearCart();
    toast.success('Order placed successfully!');
    navigate('/orders');
    setIsProcessing(false);
  };

  const finalTotal = Math.round((discountedTotal + paymentCharges) * 1.18);
  const originalFinalTotal = Math.round((total + paymentCharges) * 1.18);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Shipping Address</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Street address, apartment, suite, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      formData.paymentMethod === 'card' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'card' && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, RuPay (+₹30 processing fee)</div>
                      <div className="text-xs text-blue-600">Delivery: 4 days</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      formData.paymentMethod === 'upi' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'upi' && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">UPI</div>
                      <div className="text-sm text-gray-500">Pay using UPI apps</div>
                      <div className="text-xs text-blue-600">Delivery: 4 days</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      formData.paymentMethod === 'cod' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'cod' && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive</div>
                      <div className="text-xs text-orange-600">Delivery: 4-5 days</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  
                  {discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount.code})</span>
                      <span>-₹{(total - discountedTotal).toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{Math.round((discountedTotal + paymentCharges) * 0.18).toLocaleString()}</span>
                  </div>
                  
                  {paymentCharges > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Payment Processing Fee</span>
                      <span>₹{paymentCharges}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <div className="text-right">
                      {discount && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{originalFinalTotal.toLocaleString()}
                        </div>
                      )}
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2 mt-6"
                >
                  {isProcessing ? (
                    <div className="flex flex-col items-center w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{paymentStep}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${paymentProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm mt-2 opacity-80">{paymentProgress}% Complete</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Your payment information is secure and encrypted
                </p>
                
                {/* Real-time Payment Status */}
                {isProcessing && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-800 font-medium">Processing Payment</span>
                    </div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Secure 256-bit SSL encryption active</p>
                      <p>• Transaction ID: TXN{Date.now().toString().slice(-8)}</p>
                      <p>• Estimated completion: {Math.ceil((100 - paymentProgress) / 20)} seconds</p>
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <p className="font-medium mb-2">Terms & Conditions:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Orders can be cancelled within 24 hours of placement</li>
                    <li>• Electronics: 7-day return policy</li>
                    <li>• Fashion items: 15-day return policy</li>
                    <li>• Future Tech items: Non-returnable</li>
                    <li>• GST included in final price</li>
                    <li>• Secure payment processing with 256-bit encryption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;