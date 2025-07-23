import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Package, Clock, Navigation, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderLocation {
  id: string;
  customerName: string;
  address: string;
  lat: number;
  lng: number;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered';
  deliveryBoy: string;
  estimatedTime: string;
  distance: number;
}

const LiveMapTracker = () => {
  const [orders, setOrders] = useState<OrderLocation[]>([
    {
      id: 'ord1',
      customerName: 'John Doe',
      address: 'Flat 101, Sunrise Apartments, Juhu, Mumbai',
      lat: 19.0896,
      lng: 72.8656,
      status: 'in-transit',
      deliveryBoy: 'Rajesh Kumar',
      estimatedTime: '25 mins',
      distance: 3.2
    },
    {
      id: 'ord2',
      customerName: 'Sarah Wilson',
      address: 'Office 205, Tech Park, Powai, Mumbai',
      lat: 19.1136,
      lng: 72.8697,
      status: 'picked-up',
      deliveryBoy: 'Amit Singh',
      estimatedTime: '45 mins',
      distance: 8.7
    },
    {
      id: 'ord3',
      customerName: 'Mike Johnson',
      address: 'House 15, Green Valley, Versova, Mumbai',
      lat: 19.1317,
      lng: 72.8142,
      status: 'pending',
      deliveryBoy: 'Priya Sharma',
      estimatedTime: '1 hour',
      distance: 12.5
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'picked-up': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'in-transit': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'delivered': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Live Order Tracking
          </h1>
          <p className="text-gray-300">Real-time delivery tracking and inventory management</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Simulation */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 h-96"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Live Map View
                </h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">
                    {orders.filter(o => o.status === 'in-transit').length} In Transit
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">
                    {orders.filter(o => o.status === 'picked-up').length} Picked Up
                  </span>
                </div>
              </div>
              
              {/* Simulated Map */}
              <div className="relative w-full h-80 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl overflow-hidden">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="border-b border-white/10" style={{ height: '10%' }}></div>
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute border-r border-white/10 h-full" style={{ left: `${i * 10}%`, width: '1px' }}></div>
                  ))}
                </div>
                
                {/* Order Markers */}
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      order.status === 'in-transit' ? 'bg-purple-500 animate-pulse' :
                      order.status === 'picked-up' ? 'bg-blue-500' :
                      order.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 20}%`
                    }}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {order.customerName}
                    </div>
                  </motion.div>
                ))}
                
                {/* Delivery Routes */}
                <svg className="absolute inset-0 w-full h-full">
                  {orders.map((order, index) => (
                    <motion.path
                      key={order.id}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: order.status === 'in-transit' ? 0.7 : order.status === 'picked-up' ? 0.3 : 0 }}
                      transition={{ duration: 2, delay: index * 0.5 }}
                      d={`M ${10 + index * 15}% ${20 + index * 10}% Q ${30 + index * 20}% ${40 + index * 15}% ${20 + index * 25}% ${30 + index * 20}%`}
                      stroke={order.status === 'in-transit' ? '#8B5CF6' : '#3B82F6'}
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Order Details */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                Active Orders
              </h3>
              
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedOrder === order.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/30'
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">#{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <User className="w-3 h-3" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{order.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Truck className="w-3 h-3" />
                        <span>{order.deliveryBoy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-blue-400">
                          <Clock className="w-3 h-3" />
                          <span>{order.estimatedTime}</span>
                        </div>
                        <span className="text-purple-400">{order.distance} km</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Selected Order Details */}
            {selectedOrder && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
              >
                {(() => {
                  const order = orders.find(o => o.id === selectedOrder);
                  if (!order) return null;
                  
                  return (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Order Details</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Order ID:</span>
                          <span className="text-white font-medium">#{order.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Customer:</span>
                          <span className="text-white font-medium">{order.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Delivery Boy:</span>
                          <span className="text-white font-medium">{order.deliveryBoy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Distance:</span>
                          <span className="text-purple-400 font-medium">{order.distance} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">ETA:</span>
                          <span className="text-blue-400 font-medium">{order.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-gray-300 text-xs mb-2">Delivery Address:</p>
                        <p className="text-white text-sm">{order.address}</p>
                      </div>
                      
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contact Delivery Boy
                      </button>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapTracker;