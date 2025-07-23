import React from 'react';
import { Package, MapPin, Calendar, CreditCard, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const { user } = useAuth();

  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('quicksell_orders') || '[]');

  // Add live tracking data
  const trackingSteps = [
    { id: 1, name: 'Order Confirmed', icon: CheckCircle, completed: true },
    { id: 2, name: 'Processing', icon: Package, completed: true },
    { id: 3, name: 'Shipped', icon: Truck, completed: true },
    { id: 4, name: 'Out for Delivery', icon: Truck, completed: false },
    { id: 5, name: 'Delivered', icon: CheckCircle, completed: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your orders</h2>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>
          <div className="text-center py-12">
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-gray-300 mb-8">Start shopping to see your orders here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-8">
      {/* Futuristic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
          >
            My Orders
          </motion.h1>
          <p className="text-gray-300 mt-2">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
        </div>

        <div className="space-y-6">
          {orders.map((order: any) => (
            <motion.div 
              key={order.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30"
            >
              {/* Order Header */}
              <div className="bg-black/20 px-6 py-4 border-b border-cyan-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-cyan-400" />
                      <span className="font-semibold text-white">
                        Order #{order.id}
                      </span>
                      
                      {/* Cancel Button - Only show if within 24 hours */}
                      {order.canCancel && new Date() < new Date(order.cancelDeadline) && order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this order?')) {
                              // Update order status to cancelled
                              const orders = JSON.parse(localStorage.getItem('quicksell_orders') || '[]');
                              const updatedOrders = orders.map((o: any) => 
                                o.id === order.id ? { ...o, status: 'cancelled', canCancel: false } : o
                              );
                              localStorage.setItem('quicksell_orders', JSON.stringify(updatedOrders));
                              window.location.reload();
                            }
                          }}
                          className="px-3 py-1 text-sm bg-red-500/20 text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/30 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                      
                      {/* Show time remaining for cancellation */}
                      {order.canCancel && new Date() < new Date(order.cancelDeadline) && order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <span className="text-xs text-yellow-400">
                          Cancel within: {Math.ceil((new Date(order.cancelDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60))}h
                        </span>
                      )}
                    </div>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-bold">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Order Tracking */}
              <div className="px-6 py-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-cyan-400" />
                  Live Tracking - Real-time Updates
                </h4>
                
                {/* Payment Status */}
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">Payment Processed Successfully</span>
                  </div>
                  <div className="text-xs text-green-300 mt-1">
                    Transaction ID: TXN{order.id.slice(-8)} | 
                    Method: {order.paymentMethod?.toUpperCase()} | 
                    Amount: ₹{order.total.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : index === 3 
                              ? 'bg-yellow-500 text-white animate-pulse' 
                              : 'bg-gray-600 text-gray-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs mt-2 text-center ${
                          step.completed ? 'text-green-400' : index === 3 ? 'text-yellow-400' : 'text-gray-400'
                        }`}>
                          {step.name}
                        </span>
                        {index < trackingSteps.length - 1 && (
                          <div className={`absolute w-16 h-0.5 mt-5 ml-16 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-600'
                          }`} style={{ transform: 'translateX(-50%)' }}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-yellow-400 text-sm flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Live ETA: {new Date(order.estimatedDelivery).toLocaleDateString()} 
                    ({order.paymentMethod === 'cod' ? '4-5 days' : '4 days'} from order date)
                  </p>
                  <div className="mt-2 text-xs text-cyan-400">
                    Last updated: {new Date().toLocaleTimeString()} • Auto-refresh every 30s
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Items */}
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-white mb-4">Items Ordered</h3>
                    <div className="space-y-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white truncate">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-300">
                              Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-cyan-400">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h3 className="font-semibold text-white mb-4">Delivery Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">
                            {order.customerInfo.firstName} {order.customerInfo.lastName}
                          </p>
                          <p className="text-gray-300">{order.customerInfo.address}</p>
                          <p className="text-gray-300">
                            {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.pincode}
                          </p>
                          <p className="text-gray-300">{order.customerInfo.phone}</p>
                        </div>
                      </div>
                      
                      {order.estimatedDelivery && (
                        <div className="pt-3 border-t border-cyan-500/20">
                          <p className="text-gray-300">
                            <strong>Estimated Delivery:</strong><br />
                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;