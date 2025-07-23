import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Package, Home, LogIn, Truck, QrCode, Factory, Cuboid as Cube, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { items } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to home with search parameter
      window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-cyan-500/20 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-cyan-500/50">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              QuickShell
            </span>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300 backdrop-blur-sm"
                />
              </div>
            </form>
          </div>

          {/* Right Side - Navigation & Icons */}
          <div className="flex items-center space-x-2">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {user?.role === 'admin' && (
                <>
                  <Link 
                    to="/admin-panel" 
                    className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                      isActive('/admin-panel') 
                        ? 'text-red-400 bg-red-500/20 shadow-lg shadow-red-500/25' 
                        : 'text-white/80 hover:text-red-400 hover:bg-white/10'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                  
                  <Link 
                    to="/admin" 
                    className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                      isActive('/admin') 
                        ? 'text-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25' 
                        : 'text-white/80 hover:text-purple-400 hover:bg-white/10'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link 
                    to="/delivery-tracker" 
                    className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                      isActive('/delivery-tracker') 
                        ? 'text-green-400 bg-green-500/20 shadow-lg shadow-green-500/25' 
                        : 'text-white/80 hover:text-green-400 hover:bg-white/10'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Delivery</span>
                  </Link>
                  
                  <Link 
                    to="/factory" 
                    className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                      isActive('/factory') 
                        ? 'text-orange-400 bg-orange-500/20 shadow-lg shadow-orange-500/25' 
                        : 'text-white/80 hover:text-orange-400 hover:bg-white/10'
                    }`}
                  >
                    <Factory className="w-4 h-4" />
                    <span>Factory</span>
                  </Link>
                </>
              )}

              {user && (
                <Link 
                  to="/orders" 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                    isActive('/orders') 
                      ? 'text-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                      : 'text-white/80 hover:text-blue-400 hover:bg-white/10'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
              )}
            </nav>

            {/* Home Icon */}
            <Link 
              to="/" 
              className={`p-3 rounded-xl transition-all duration-300 ${
                isActive('/') 
                  ? 'text-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/25' 
                  : 'text-white/80 hover:text-cyan-400 hover:bg-white/10'
              }`}
            >
              <Home className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-3 text-white/80 hover:text-cyan-400 transition-all duration-300 hover:bg-white/10 rounded-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/80 font-medium hidden sm:inline">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-white/80 hover:text-red-400 transition-colors duration-300 px-3 py-2 rounded-xl hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 px-3 py-2 text-white/80 hover:text-cyan-400 transition-all duration-300 hover:bg-white/10 rounded-xl"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-cyan-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* QR Scanner - Bottom Right Small Icon */}
        <Link 
          to="/qr-scanner" 
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-2xl transition-all duration-300 z-40 ${
            isActive('/qr-scanner')
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/50 hover:scale-110'
          }`}
        >
          <QrCode className="w-5 h-5" />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-cyan-500/20">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                />
              </div>
            </form>

            <Link 
              to="/" 
              className="block px-3 py-2 text-white/80 hover:text-cyan-400 hover:bg-white/10 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {user?.role === 'admin' && (
              <>
                <Link 
                  to="/admin-panel" 
                  className="block px-3 py-2 text-white/80 hover:text-red-400 hover:bg-white/10 rounded-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 text-white/80 hover:text-purple-400 hover:bg-white/10 rounded-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/delivery-tracker" 
                  className="block px-3 py-2 text-white/80 hover:text-green-400 hover:bg-white/10 rounded-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Delivery Tracker
                </Link>
                <Link 
                  to="/factory" 
                  className="block px-3 py-2 text-white/80 hover:text-orange-400 hover:bg-white/10 rounded-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Factory Management
                </Link>
              </>
            )}
            {user && (
              <Link 
                to="/orders" 
                className="block px-3 py-2 text-white/80 hover:text-blue-400 hover:bg-white/10 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {!user && (
              <Link 
                to="/register" 
                className="block px-3 py-2 text-white/80 hover:text-cyan-400 hover:bg-white/10 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;