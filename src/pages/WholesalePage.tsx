import React, { useState } from 'react';
import { Package, TrendingUp, Shield, Users, Calculator, FileText, CreditCard, Truck, ShoppingCart, Plus, Minus, Download, Building, User, Hash, Phone, MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import toast from 'react-hot-toast';

interface WholesaleCartItem {
  id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  quantity: number;
  image: string;
  category: string;
}

interface BusinessForm {
  contactName: string;
  companyName: string;
  gstNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const WholesalePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minQuantity, setMinQuantity] = useState(50);
  const [wholesaleCart, setWholesaleCart] = useState<WholesaleCartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [businessForm, setBusinessForm] = useState<BusinessForm>({
    contactName: '',
    companyName: '',
    gstNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const getWholesalePrice = (price: number, quantity: number) => {
    if (quantity >= 100) return price * 0.7; // 30% discount
    if (quantity >= 50) return price * 0.8; // 20% discount
    return price * 0.9; // 10% discount
  };
  
  const calculateGST = (price: number) => price * 0.18;
  
  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const addToWholesaleCart = (product: any) => {
    const wholesalePrice = getWholesalePrice(product.price, minQuantity);
    const existingItem = wholesaleCart.find(item => item.id === product.id);
    
    if (existingItem) {
      setWholesaleCart(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + minQuantity }
          : item
      ));
    } else {
      setWholesaleCart(prev => [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        wholesalePrice,
        quantity: minQuantity,
        image: product.image,
        category: product.category
      }]);
    }
    toast.success(`Added ${minQuantity} units to wholesale cart!`);
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 50) {
      toast.error('Minimum quantity is 50 units');
      return;
    }
    setWholesaleCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setWholesaleCart(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleBusinessFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Form submitted! Our wholesale team will contact you within 24 hours.');
    setShowBusinessForm(false);
    setBusinessForm({
      contactName: '',
      companyName: '',
      gstNumber: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
  };

  const downloadCatalog = () => {
    // Simulate catalog download
    const catalogData = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      retailPrice: product.price,
      wholesalePrice50: getWholesalePrice(product.price, 50),
      wholesalePrice100: getWholesalePrice(product.price, 100),
      stock: product.stock
    }));
    
    const dataStr = JSON.stringify(catalogData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'QuickShell_Wholesale_Catalog.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Catalog downloaded successfully!');
  };

  const cartTotal = wholesaleCart.reduce((sum, item) => {
    const gst = item.wholesalePrice * item.quantity * 0.18;
    return sum + (item.wholesalePrice * item.quantity) + gst;
  }, 0);

  const cartItemsCount = wholesaleCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Wholesale Portal
          </h1>
          <p className="text-xl text-gray-300 mb-8">Premium Quality Products for Business Partners</p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-blue-500/30 p-6 rounded-2xl"
            >
              <Package className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Bulk Orders</h3>
              <p className="text-gray-300 text-sm">Minimum 50 units per order</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-purple-500/30 p-6 rounded-2xl"
            >
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-300 text-sm">Up to 30% wholesale discount</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-pink-500/30 p-6 rounded-2xl"
            >
              <Shield className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">GST Compliant</h3>
              <p className="text-gray-300 text-sm">Full GST invoicing & returns</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm border border-green-500/30 p-6 rounded-2xl"
            >
              <Truck className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-300 text-sm">2-3 days bulk delivery</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/30 rounded-xl text-white backdrop-blur-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <label className="text-white text-sm">Min Qty:</label>
                <input
                  type="number"
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(Number(e.target.value))}
                  min="50"
                  step="10"
                  className="w-20 px-2 py-2 bg-white/10 border border-white/30 rounded-xl text-white text-center"
                />
              </div>
            </div>
            
            <div className="text-white text-sm">
              <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                {minQuantity >= 100 ? '30%' : minQuantity >= 50 ? '20%' : '10%'} Discount Applied
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => {
            const wholesalePrice = getWholesalePrice(product.price, minQuantity);
            const gstAmount = calculateGST(wholesalePrice);
            const totalPrice = wholesalePrice + gstAmount;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30">
                      {product.category}
                    </span>
                    <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                      {product.stock} Available
                    </span>
                  </div>
                  
                  <h3 className="text-white font-bold mb-3 line-clamp-2">{product.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Retail Price:</span>
                      <span className="text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Wholesale Price:</span>
                      <span className="text-blue-400 font-semibold">₹{wholesalePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">GST (18%):</span>
                      <span className="text-yellow-400">₹{gstAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-white/20 pt-2">
                      <span className="text-white">Total per unit:</span>
                      <span className="text-green-400">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Order Value ({minQuantity} units):</span>
                    </div>
                    <div className="text-xl font-bold text-green-400">
                      ₹{(totalPrice * minQuantity).toLocaleString()}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                    onClick={() => addToWholesaleCart(product)}
                    <ShoppingCart className="w-4 h-4 inline mr-2" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Business Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-blue-400" />
              GST & Pricing
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex justify-between">
                <span>GST Rate:</span>
                <span className="text-yellow-400 font-semibold">18%</span>
              </div>
              <div className="flex justify-between">
                <span>50-99 units:</span>
                <span className="text-green-400 font-semibold">20% Discount</span>
              </div>
              <div className="flex justify-between">
                <span>100+ units:</span>
                <span className="text-green-400 font-semibold">30% Discount</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Terms:</span>
                <span className="text-blue-400 font-semibold">Net 30 Days</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-400" />
              Business Policies
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>• Minimum order quantity: 50 units</p>
              <p>• Bulk delivery: 2-3 business days</p>
              <p>• GST invoices provided for all orders</p>
              <p>• 30-day return policy for defective items</p>
              <p>• Dedicated account manager support</p>
              <p>• Volume discounts for regular customers</p>
              <p>• Secure payment processing</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Wholesale Business?</h3>
          <p className="text-gray-300 mb-6">Contact our wholesale team for custom pricing and bulk orders</p>
              onClick={() => setShowBusinessForm(true)}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Contact Wholesale Team
              onClick={downloadCatalog}
            </button>
            <button className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
              Download Catalog
            </button>
          </div>
        </motion.div>

        {/* Wholesale Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl z-40"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wholesaleCart.length}
              </span>
            )}
          </div>
        </motion.button>

        {/* Wholesale Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Wholesale Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {wholesaleCart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your wholesale cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wholesaleCart.map(item => {
                      const gst = item.wholesalePrice * item.quantity * 0.18;
                      const total = (item.wholesalePrice * item.quantity) + gst;
                      
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <p className="text-sm text-blue-600">₹{item.wholesalePrice.toLocaleString()} per unit</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 10)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-16 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 10)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{total.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Inc. GST</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {wholesaleCart.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total (Inc. GST):</span>
                    <span className="text-2xl font-bold text-green-600">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowBusinessForm(true);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Proceed to Business Details
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Business Form Modal */}
        {showBusinessForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Business Information</h3>
                <button
                  onClick={() => setShowBusinessForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleBusinessFormSubmit} className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessForm.contactName}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessForm.companyName}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Hash className="w-4 h-4 inline mr-1" />
                      GST Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessForm.gstNumber}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, gstNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="GST registration number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={businessForm.phone}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your contact number"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={businessForm.email}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Business Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessForm.address}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={businessForm.city}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      required
                      value={businessForm.state}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={businessForm.pincode}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, pincode: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="PIN Code"
                    />
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Order Summary</h4>
                  <p className="text-sm text-blue-700">
                    {cartItemsCount} items • Total: ₹{cartTotal.toLocaleString()} (Inc. GST)
                  </p>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBusinessForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WholesalePage;