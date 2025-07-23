import React, { useState } from 'react';
import { Package, TrendingUp, Shield, Users, Calculator, FileText, CreditCard, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const WholesalePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minQuantity, setMinQuantity] = useState(50);
  
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
                    Add to Wholesale Cart
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Contact Wholesale Team
            </button>
            <button className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
              Download Catalog
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WholesalePage;