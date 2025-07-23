import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder, Environment, PerspectiveCamera } from '@react-three/drei';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ZoomIn, ZoomOut, Palette, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import * as THREE from 'three';

// 3D Product Component
const Product3DModel = ({ productType, color = '#3B82F6' }: { productType: string; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const renderProduct = () => {
    switch (productType) {
      case 'Electronics':
        return (
          <group ref={meshRef}>
            {/* Headphones */}
            <Box args={[2, 0.3, 2]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Box>
            <Sphere args={[0.8]} position={[-1.2, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </Sphere>
            <Sphere args={[0.8]} position={[1.2, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </Sphere>
            <Cylinder args={[0.1, 0.1, 1.5]} position={[0, 0.75, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#2D3748" metalness={0.9} roughness={0.1} />
            </Cylinder>
          </group>
        );
      case 'Furniture':
        return (
          <group ref={meshRef}>
            {/* Chair */}
            <Box args={[1.5, 0.2, 1.5]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Box args={[1.5, 2, 0.2]} position={[0, 1, -0.65]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Cylinder args={[0.05, 0.05, 1]} position={[-0.6, -0.5, -0.6]}>
              <meshStandardMaterial color="#2D3748" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1]} position={[0.6, -0.5, -0.6]}>
              <meshStandardMaterial color="#2D3748" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1]} position={[-0.6, -0.5, 0.6]}>
              <meshStandardMaterial color="#2D3748" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1]} position={[0.6, -0.5, 0.6]}>
              <meshStandardMaterial color="#2D3748" />
            </Cylinder>
          </group>
        );
      case 'Fashion':
        return (
          <group ref={meshRef}>
            {/* Watch */}
            <Cylinder args={[1, 1, 0.3]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Cylinder args={[0.8, 0.8, 0.35]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#1A202C" />
            </Cylinder>
            <Box args={[0.1, 0.5, 0.05]} position={[0, 0, 0.2]}>
              <meshStandardMaterial color="#E53E3E" />
            </Box>
            <Box args={[0.3, 0.05, 0.05]} position={[0, 0, 0.2]}>
              <meshStandardMaterial color="#E53E3E" />
            </Box>
          </group>
        );
      default:
        return (
          <Box ref={meshRef} args={[2, 2, 2]}>
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
          </Box>
        );
    }
  };

  return renderProduct();
};

const Product3D = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  const { addToCart } = useCart();

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            3D Product Viewer
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 p-6 h-[600px]"
          >
            <div className="h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
              <Canvas>
                <PerspectiveCamera makeDefault position={cameraPosition} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <Suspense fallback={null}>
                  <Product3DModel productType={product.category} color={selectedColor} />
                  <Environment preset="city" />
                </Suspense>
                
                <OrbitControls 
                  enablePan={true} 
                  enableZoom={true} 
                  enableRotate={true}
                  minDistance={2}
                  maxDistance={10}
                />
              </Canvas>
            </div>

            {/* 3D Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCameraPosition([0, 0, 3])}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-200"
              >
                <ZoomIn className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCameraPosition([0, 0, 7])}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-200"
              >
                <ZoomOut className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCameraPosition([0, 0, 5])}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">{product.name}</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium text-white">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-300">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Choose Color</span>
                </div>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color.value
                          ? 'border-white shadow-lg scale-110'
                          : 'border-gray-400 hover:border-white'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-300">
                    {product.stock} units available
                  </p>
                </div>
              )}

              {/* Add to Cart Button */}
              {product.stock > 0 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl font-medium hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              ) : (
                <div className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-4 px-6 rounded-2xl text-center">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">3D Features</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>360° Interactive Rotation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Real-time Color Customization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Zoom & Pan Controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Realistic Lighting & Materials</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product3D;