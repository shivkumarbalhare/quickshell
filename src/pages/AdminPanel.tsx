import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Factory, 
  Package, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../data/products';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">Admin privileges required</p>
          <button
            onClick={() => navigate('/admin-login')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-200' };
    if (stock <= 5) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-50 border-green-200' };
  };

  const stats = {
    totalProducts: products.length,
    lowStockProducts: products.filter(p => p.stock > 0 && p.stock <= 5).length,
    outOfStockProducts: products.filter(p => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-md border-r border-white/10 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold">Admin Panel</h2>
                <p className="text-gray-400 text-sm">QuickSell</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'inventory', name: 'Inventory', icon: Package },
                { id: 'factory', name: 'Factory', icon: Factory },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeSection === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Welcome back, {user.name}</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Products</p>
                      <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Low Stock</p>
                      <p className="text-3xl font-bold text-orange-400">{stats.lowStockProducts}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Out of Stock</p>
                      <p className="text-3xl font-bold text-red-400">{stats.outOfStockProducts}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Inventory Value</p>
                      <p className="text-3xl font-bold text-green-400">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/factory')}
                      className="w-full flex items-center gap-3 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
                    >
                      <Factory className="w-5 h-5" />
                      Manage Factory
                    </button>
                    <button
                      onClick={() => setActiveSection('inventory')}
                      className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
                    >
                      <Package className="w-5 h-5" />
                      View Inventory
                    </button>
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white"
                    >
                      <BarChart3 className="w-5 h-5" />
                      Analytics Dashboard
                    </button>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Factory Status</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Inventory System</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Last Backup</span>
                      <span className="text-gray-400">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'inventory' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
                <button 
                  onClick={() => setActiveSection('add-product')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/20">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-white">Product</th>
                        <th className="text-left py-4 px-6 font-semibold text-white">Category</th>
                        <th className="text-left py-4 px-6 font-semibold text-white">Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-white">Stock</th>
                        <th className="text-left py-4 px-6 font-semibold text-white">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {products.map(product => {
                        const stockStatus = getStockStatus(product.stock);
                        return (
                          <tr key={product.id} className="hover:bg-white/5 transition-colors duration-200">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                <div>
                                  <p className="font-medium text-white">{product.name}</p>
                                  <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                                {product.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-semibold text-white">
                              ₹{product.price.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 font-medium text-white">
                              {product.stock}
                            </td>
                            <td className="py-4 px-6">
                              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${stockStatus.color}`}>
                                {stockStatus.text}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors duration-200">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-500/20 rounded-lg transition-colors duration-200">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'add-product' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Add New Product</h1>
                <button
                  onClick={() => setActiveSection('inventory')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Back to Inventory
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Category</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="" className="bg-slate-800">Select Category</option>
                      <option value="Electronics" className="bg-slate-800">Electronics</option>
                      <option value="Fashion" className="bg-slate-800">Fashion</option>
                      <option value="Furniture" className="bg-slate-800">Furniture</option>
                      <option value="Appliances" className="bg-slate-800">Appliances</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Price (₹)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-2">Product Image URL</label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter product description"
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Add product to home page (simulate)
                        alert('Product added successfully! It will appear on the home page.');
                        setActiveSection('inventory');
                      }}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Add & Show on Home
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {activeSection === 'factory' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Factory Management</h1>
                <button
                  onClick={() => navigate('/factory')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Factory className="w-4 h-4" />
                  Open Factory Dashboard
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-gray-300 text-center py-8">
                  Click "Open Factory Dashboard" to access the full factory management system with production monitoring, order tracking, and analytics.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-gray-300 text-center py-8">User management features coming soon...</p>
              </div>
            </motion.div>
          )}

          {activeSection === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-white">System Settings</h1>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-gray-300 text-center py-8">System settings panel coming soon...</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;