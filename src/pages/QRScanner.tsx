import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, Package, Star, ShoppingCart, X, Scan, Cuboid as Cube, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [showProductQR, setShowProductQR] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>('');
  const { addToCart } = useCart();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          console.log('QR Code scanned:', decodedText);
          setScanResult(decodedText);
          
          // Try to find product by ID from QR code
          const productId = decodedText.split('product-')[1];
          const product = products.find(p => p.id === productId);
          
          if (product) {
            setScannedProduct(product);
          } else {
            // If not a product QR, show the raw result
            setScannedProduct({ id: 'unknown', name: 'Unknown Product', description: `Scanned: ${decodedText}` });
          }
          
          setIsScanning(false);
          scanner.clear();
        },
        (error) => {
          console.warn('QR scan error:', error);
        }
      );

      scannerRef.current = scanner;

      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
      };
    }
  }, [isScanning]);

  const startScanning = () => {
    setIsScanning(true);
    setScannedProduct(null);
    setScanResult('');
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  };

  const generateProductQR = (productId: string) => {
    return `https://quickshell.com/product-${productId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-8">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            QR Scanner
          </h1>
          <p className="text-xl text-gray-300">Scan product QR codes for instant access and futuristic shopping experience</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Scanner Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 p-8"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
                <QrCode className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Product Scanner</h3>
              <p className="text-gray-300 mb-8">Point your camera at a product QR code</p>

              {!isScanning ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScanning}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <Camera className="w-6 h-6" />
                  Start Scanning
                </motion.button>
              ) : (
                <div className="space-y-6">
                  <div id="qr-reader" className="mx-auto max-w-sm rounded-2xl overflow-hidden"></div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopScanning}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <X className="w-5 h-5" />
                    Stop Scanning
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Scanned Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-purple-400" />
              Scanned Product
            </h3>

            <AnimatePresence mode="wait">
              {scannedProduct ? (
                <motion.div
                  key="product"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {scannedProduct.image && (
                    <img
                      src={scannedProduct.image}
                      alt={scannedProduct.name}
                      className="w-full h-56 object-cover rounded-2xl shadow-lg"
                    />
                  )}
                  
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">
                      {scannedProduct.name}
                    </h4>
                    
                    {scannedProduct.price && (
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          ₹{scannedProduct.price.toLocaleString()}
                        </span>
                        {scannedProduct.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-300">
                              {scannedProduct.rating} ({scannedProduct.reviews})
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{scannedProduct.description}</p>
                    
                    {scannedProduct.category && (
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                          {scannedProduct.category}
                        </span>
                        {scannedProduct.stock !== undefined && (
                          <span className={`px-4 py-2 rounded-full text-sm border ${
                            scannedProduct.stock > 0 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {scannedProduct.stock > 0 ? `${scannedProduct.stock} in stock` : 'Out of stock'}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {scannedProduct.price && scannedProduct.stock > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(scannedProduct)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                      </motion.button>
                    )}
                    
                    {scannedProduct.id !== 'unknown' && (
                      <div className="flex gap-3 mt-4">
                        <Link
                          to={`/product/${scannedProduct.id}`}
                          className="flex-1 bg-gray-700/50 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-600/50 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/product-3d/${scannedProduct.id}`}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                        >
                          <Cube className="w-4 h-4" />
                          3D View
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <Scan className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                  <p className="text-gray-400 text-lg">Scan a QR code to see product details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Product QR Codes Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-500/30 p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <h3 className="text-3xl font-bold text-white">Product QR Codes</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 12).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="bg-white p-4 rounded-xl mb-4 shadow-lg">
                    <QRCode
                      value={generateProductQR(product.id)}
                      size={120}
                      className="mx-auto"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-bold text-white text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-cyan-400 font-bold text-lg mb-3">
                    ₹{product.price.toLocaleString()}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProductQR(showProductQR === product.id ? null : product.id)}
                    className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    {showProductQR === product.id ? 'Hide Details' : 'View Details'}
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {showProductQR === product.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/20"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                      <p className="text-xs text-gray-300 line-clamp-3 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-300">{product.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRScanner;