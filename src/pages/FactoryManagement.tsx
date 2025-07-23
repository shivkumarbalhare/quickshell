import React, { useState, useEffect } from 'react';
import { Factory, Package, TrendingUp, AlertTriangle, Users, Truck, MapPin, Clock, CheckCircle, XCircle, Settings, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';

interface FactoryData {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentProduction: number;
  efficiency: number;
  status: 'active' | 'maintenance' | 'offline';
  products: string[];
  workers: number;
  lastUpdated: string;
}

interface ProductionOrder {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  factoryId: string;
  status: 'pending' | 'in-production' | 'completed' | 'delayed';
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  priority: 'low' | 'medium' | 'high';
}

const FactoryManagement = () => {
  const [factories, setFactories] = useState<FactoryData[]>([
    {
      id: 'f1',
      name: 'Electronics Manufacturing Unit',
      location: 'Mumbai, Maharashtra',
      capacity: 1000,
      currentProduction: 750,
      efficiency: 85,
      status: 'active',
      products: ['1', '2', '3', '6', '8'],
      workers: 45,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'f2',
      name: 'Furniture Production Center',
      location: 'Bangalore, Karnataka',
      capacity: 500,
      currentProduction: 320,
      efficiency: 78,
      status: 'active',
      products: ['4'],
      workers: 28,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'f3',
      name: 'Fashion & Accessories Hub',
      location: 'Delhi, NCR',
      capacity: 800,
      currentProduction: 0,
      efficiency: 0,
      status: 'maintenance',
      products: ['7'],
      workers: 35,
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([
    {
      id: 'po1',
      productId: '1',
      productName: 'Premium Wireless Headphones',
      quantity: 100,
      factoryId: 'f1',
      status: 'in-production',
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expectedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high'
    },
    {
      id: 'po2',
      productId: '4',
      productName: 'Ergonomic Office Chair',
      quantity: 50,
      factoryId: 'f2',
      status: 'completed',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      expectedCompletion: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      actualCompletion: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium'
    },
    {
      id: 'po3',
      productId: '2',
      productName: 'Smart Fitness Watch',
      quantity: 200,
      factoryId: 'f1',
      status: 'pending',
      startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      expectedCompletion: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high'
    }
  ]);

  const [selectedFactory, setSelectedFactory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 border-green-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'offline': return 'text-red-600 bg-red-100 border-red-200';
      case 'pending': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'in-production': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'delayed': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalProduction = factories.reduce((sum, factory) => sum + factory.currentProduction, 0);
  const totalCapacity = factories.reduce((sum, factory) => sum + factory.capacity, 0);
  const averageEfficiency = factories.reduce((sum, factory) => sum + factory.efficiency, 0) / factories.length;
  const activeFactories = factories.filter(f => f.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Factory Management
          </h1>
          <p className="text-gray-600">Monitor production, manage inventory, and optimize factory operations</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Factories</p>
                <p className="text-3xl font-bold text-indigo-600">{activeFactories}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Factory className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Production</p>
                <p className="text-3xl font-bold text-purple-600">{totalProduction}</p>
                <p className="text-xs text-gray-500">/ {totalCapacity} capacity</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                <p className={`text-3xl font-bold ${getEfficiencyColor(averageEfficiency)}`}>
                  {averageEfficiency.toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-3xl font-bold text-orange-600">
                  {productionOrders.filter(o => o.status === 'in-production' || o.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8 border border-white/20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Factory Overview', icon: Factory },
                { id: 'production', name: 'Production Orders', icon: Package },
                { id: 'analytics', name: 'Analytics', icon: BarChart3 }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Factory List */}
            <div className="lg:col-span-2 space-y-6">
              {factories.map((factory) => (
                <motion.div
                  key={factory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 cursor-pointer transition-all duration-200 ${
                    selectedFactory === factory.id
                      ? 'border-indigo-500 bg-indigo-50/50'
                      : 'border-white/20 hover:border-indigo-300'
                  }`}
                  onClick={() => setSelectedFactory(factory.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Factory className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{factory.name}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {factory.location}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(factory.status)}`}>
                      {factory.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-600">{factory.currentProduction}</p>
                      <p className="text-sm text-gray-600">Current Production</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{factory.capacity}</p>
                      <p className="text-sm text-gray-600">Max Capacity</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${getEfficiencyColor(factory.efficiency)}`}>
                        {factory.efficiency}%
                      </p>
                      <p className="text-sm text-gray-600">Efficiency</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{factory.workers}</p>
                      <p className="text-sm text-gray-600">Workers</p>
                    </div>
                  </div>

                  {/* Production Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Production Utilization</span>
                      <span>{Math.round((factory.currentProduction / factory.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(factory.currentProduction / factory.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Manufacturing Products:</p>
                    <div className="flex flex-wrap gap-2">
                      {factory.products.map(productId => {
                        const product = products.find(p => p.id === productId);
                        return product ? (
                          <span key={productId} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                            {product.name.substring(0, 20)}...
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Factory Details */}
            <div>
              {selectedFactory ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 sticky top-24"
                >
                  {(() => {
                    const factory = factories.find(f => f.id === selectedFactory);
                    if (!factory) return null;
                    
                    return (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Factory Details</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(factory.status)}`}>
                              {factory.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700">Location</p>
                            <p className="text-gray-900">{factory.location}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700">Capacity Utilization</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${(factory.currentProduction / factory.capacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {Math.round((factory.currentProduction / factory.capacity) * 100)}%
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700">Efficiency Rating</p>
                            <p className={`text-2xl font-bold ${getEfficiencyColor(factory.efficiency)}`}>
                              {factory.efficiency}%
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700">Workforce</p>
                            <p className="text-gray-900">{factory.workers} workers</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700">Last Updated</p>
                            <p className="text-gray-900">{new Date(factory.lastUpdated).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 space-y-2">
                          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                            View Detailed Report
                          </button>
                          <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Factory Settings
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 text-center">
                  <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a factory to view details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Production Orders</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Order ID</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Product</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Quantity</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Factory</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Priority</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Expected Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productionOrders.map(order => {
                    const factory = factories.find(f => f.id === order.factoryId);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-6 font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{order.productName}</p>
                            <p className="text-sm text-gray-600">ID: {order.productId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">
                          {order.quantity}
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-900">{factory?.name}</p>
                          <p className="text-sm text-gray-600">{factory?.location}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(order.priority)}`}>
                            {order.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {new Date(order.expectedCompletion).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Production Efficiency</h3>
              <div className="space-y-4">
                {factories.map(factory => (
                  <div key={factory.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{factory.name}</p>
                      <p className="text-sm text-gray-600">{factory.location}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getEfficiencyColor(factory.efficiency)}`}>
                        {factory.efficiency}%
                      </p>
                      <p className="text-sm text-gray-600">Efficiency</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
              <div className="space-y-4">
                {['pending', 'in-production', 'completed', 'delayed'].map(status => {
                  const count = productionOrders.filter(o => o.status === status).length;
                  const percentage = (count / productionOrders.length) * 100;
                  
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {status.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-600">{count} orders</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            status === 'completed' ? 'bg-green-500' :
                            status === 'in-production' ? 'bg-blue-500' :
                            status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactoryManagement;