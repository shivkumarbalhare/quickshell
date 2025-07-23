import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Clock, Package, User, Phone, Navigation, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  assignedOrders: string[];
  status: 'active' | 'inactive' | 'on-delivery';
  vehicleType: string;
  rating: number;
}

interface DeliveryOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  assignedDeliveryBoy?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  distance: number;
  priority: 'low' | 'medium' | 'high';
}

const DeliveryTracker = () => {
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([
    {
      id: 'db1',
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      currentLocation: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Andheri West, Mumbai'
      },
      assignedOrders: ['ord1', 'ord2'],
      status: 'on-delivery',
      vehicleType: 'Bike',
      rating: 4.8
    },
    {
      id: 'db2',
      name: 'Amit Singh',
      phone: '+91 9876543211',
      currentLocation: {
        lat: 19.0896,
        lng: 72.8656,
        address: 'Bandra East, Mumbai'
      },
      assignedOrders: ['ord3'],
      status: 'active',
      vehicleType: 'Scooter',
      rating: 4.6
    },
    {
      id: 'db3',
      name: 'Priya Sharma',
      phone: '+91 9876543212',
      currentLocation: {
        lat: 19.1136,
        lng: 72.8697,
        address: 'Malad West, Mumbai'
      },
      assignedOrders: [],
      status: 'inactive',
      vehicleType: 'Bike',
      rating: 4.9
    }
  ]);

  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: 'ord1',
      customerId: 'cust1',
      customerName: 'John Doe',
      customerPhone: '+91 9876543220',
      deliveryAddress: 'Flat 101, Sunrise Apartments, Juhu, Mumbai - 400049',
      products: [
        { id: '1', name: 'Premium Wireless Headphones', quantity: 1, price: 4999 },
        { id: '2', name: 'Smart Fitness Watch', quantity: 1, price: 8999 }
      ],
      status: 'in-transit',
      assignedDeliveryBoy: 'db1',
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      distance: 5.2,
      priority: 'high'
    },
    {
      id: 'ord2',
      customerId: 'cust2',
      customerName: 'Sarah Wilson',
      customerPhone: '+91 9876543221',
      deliveryAddress: 'Office 205, Tech Park, Powai, Mumbai - 400076',
      products: [
        { id: '3', name: 'Professional DSLR Camera', quantity: 1, price: 45999 }
      ],
      status: 'picked-up',
      assignedDeliveryBoy: 'db1',
      estimatedDelivery: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      distance: 8.7,
      priority: 'medium'
    },
    {
      id: 'ord3',
      customerId: 'cust3',
      customerName: 'Mike Johnson',
      customerPhone: '+91 9876543222',
      deliveryAddress: 'House 15, Green Valley, Versova, Mumbai - 400061',
      products: [
        { id: '4', name: 'Ergonomic Office Chair', quantity: 1, price: 12999 },
        { id: '5', name: 'Bluetooth Speaker', quantity: 2, price: 2499 }
      ],
      status: 'assigned',
      assignedDeliveryBoy: 'db2',
      estimatedDelivery: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      distance: 3.8,
      priority: 'low'
    }
  ]);

  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'on-delivery': return 'text-blue-600 bg-blue-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'assigned': return 'text-purple-600 bg-purple-100';
      case 'picked-up': return 'text-orange-600 bg-orange-100';
      case 'in-transit': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, actualDelivery: newStatus === 'delivered' ? new Date().toISOString() : order.actualDelivery }
        : order
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Delivery Tracker
          </h1>
          <p className="text-gray-600">Real-time delivery management and tracking</p>
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
                <p className="text-sm font-medium text-gray-600">Active Delivery Boys</p>
                <p className="text-3xl font-bold text-green-600">
                  {deliveryBoys.filter(db => db.status === 'active' || db.status === 'on-delivery').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
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
                <p className="text-sm font-medium text-gray-600">Orders in Transit</p>
                <p className="text-3xl font-bold text-blue-600">
                  {orders.filter(order => order.status === 'in-transit' || order.status === 'picked-up').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-orange-600">
                  {orders.filter(order => order.status === 'pending' || order.status === 'assigned').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
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
                <p className="text-sm font-medium text-gray-600">Delivered Today</p>
                <p className="text-3xl font-bold text-purple-600">
                  {orders.filter(order => order.status === 'delivered').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Boys Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Delivery Team
              </h3>
            </div>
            
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {deliveryBoys.map((deliveryBoy) => (
                <motion.div
                  key={deliveryBoy.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedDeliveryBoy === deliveryBoy.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedDeliveryBoy(deliveryBoy.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {deliveryBoy.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{deliveryBoy.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {deliveryBoy.phone}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deliveryBoy.status)}`}>
                      {deliveryBoy.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{deliveryBoy.currentLocation.address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vehicle: {deliveryBoy.vehicleType}</span>
                      <span className="text-gray-600">Rating: ⭐ {deliveryBoy.rating}</span>
                    </div>
                    <div className="text-gray-600">
                      Active Orders: {deliveryBoy.assignedOrders.length}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Orders Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Active Orders
              </h3>
            </div>
            
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedOrder === order.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedOrder(order.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                        {order.priority.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{order.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Distance: {order.distance} km</span>
                      <span className="text-gray-600">
                        ETA: {new Date(order.estimatedDelivery).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      Products: {order.products.length} items
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-3">
                      {order.status === 'assigned' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, 'picked-up');
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {order.status === 'picked-up' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, 'in-transit');
                          }}
                          className="px-3 py-1 bg-orange-500 text-white rounded-lg text-xs hover:bg-orange-600 transition-colors"
                        >
                          In Transit
                        </button>
                      )}
                      {order.status === 'in-transit' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, 'delivered');
                          }}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition-colors"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Selected Order Details */}
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
          >
            {(() => {
              const order = orders.find(o => o.id === selectedOrder);
              if (!order) return null;
              
              return (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Details - #{order.id}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {order.customerName}</p>
                        <p><strong>Phone:</strong> {order.customerPhone}</p>
                        <p><strong>Address:</strong> {order.deliveryAddress}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Status:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </p>
                        <p><strong>Priority:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs border ${getPriorityColor(order.priority)}`}>
                            {order.priority.toUpperCase()}
                          </span>
                        </p>
                        <p><strong>Distance:</strong> {order.distance} km</p>
                        <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleString()}</p>
                        {order.actualDelivery && (
                          <p><strong>Actual Delivery:</strong> {new Date(order.actualDelivery).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 rounded-lg">
                          <tr>
                            <th className="text-left py-2 px-4">Product</th>
                            <th className="text-left py-2 px-4">Quantity</th>
                            <th className="text-left py-2 px-4">Price</th>
                            <th className="text-left py-2 px-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product) => (
                            <tr key={product.id} className="border-t">
                              <td className="py-2 px-4">{product.name}</td>
                              <td className="py-2 px-4">{product.quantity}</td>
                              <td className="py-2 px-4">₹{product.price.toLocaleString()}</td>
                              <td className="py-2 px-4">₹{(product.price * product.quantity).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracker;