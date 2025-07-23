export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  qrCode?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Premium wireless headphones with noise cancellation",
    category: "Electronics",
    stock: 15,
    qrCode: "WH001"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 8999,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Advanced smartwatch with health monitoring",
    category: "Electronics",
    stock: 8,
    qrCode: "SW002"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1999,
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Portable Bluetooth speaker with rich sound",
    category: "Electronics",
    stock: 22,
    qrCode: "BS003"
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 1499,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "High-precision gaming mouse with RGB lighting",
    category: "Gaming",
    stock: 12,
    qrCode: "GM004"
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 3499,
    image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Mechanical keyboard with customizable keys",
    category: "Gaming",
    stock: 7,
    qrCode: "MK005"
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 2499,
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Multi-port USB-C hub with fast charging",
    category: "Accessories",
    stock: 18,
    qrCode: "UH006"
  },
  {
    id: 7,
    name: "Wireless Charger",
    price: 1299,
    image: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Fast wireless charging pad for smartphones",
    category: "Accessories",
    stock: 25,
    qrCode: "WC007"
  },
  {
    id: 8,
    name: "Phone Case",
    price: 599,
    image: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Protective phone case with premium materials",
    category: "Accessories",
    stock: 35,
    qrCode: "PC008"
  },
  {
    id: 9,
    name: "Laptop Stand",
    price: 1899,
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Adjustable laptop stand for better ergonomics",
    category: "Accessories",
    stock: 14,
    qrCode: "LS009"
  },
  {
    id: 10,
    name: "Webcam HD",
    price: 2799,
    image: "https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "High-definition webcam for video calls",
    category: "Electronics",
    stock: 9,
    qrCode: "WH010"
  },
  {
    id: 11,
    name: "VR Headset Pro",
    price: 45999,
    image: "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Next-generation VR headset with 8K display",
    category: "Future Tech",
    stock: 3,
    qrCode: "VR011"
  },
  {
    id: 12,
    name: "Holographic Display",
    price: 89999,
    image: "https://images.pexels.com/photos/8728562/pexels-photo-8728562.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "3D holographic display for immersive experiences",
    category: "Future Tech",
    stock: 1,
    qrCode: "HD012"
  },
  {
    id: 13,
    name: "Neural Interface Headband",
    price: 125999,
    image: "https://images.pexels.com/photos/8728563/pexels-photo-8728563.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Brain-computer interface for direct neural control",
    category: "Future Tech",
    stock: 2,
    qrCode: "NI013"
  },
  {
    id: 14,
    name: "Quantum Processor",
    price: 199999,
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Quantum computing processor for advanced calculations",
    category: "Future Tech",
    stock: 1,
    qrCode: "QP014"
  },
  {
    id: 15,
    name: "Anti-Gravity Boots",
    price: 75999,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Magnetic levitation boots for zero-gravity movement",
    category: "Future Tech",
    stock: 4,
    qrCode: "AG015"
  },
  {
    id: 16,
    name: "Smart Contact Lenses",
    price: 35999,
    image: "https://images.pexels.com/photos/5752296/pexels-photo-5752296.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "AR-enabled contact lenses with HUD display",
    category: "Future Tech",
    stock: 6,
    qrCode: "SC016"
  },
  {
    id: 17,
    name: "Teleportation Pod",
    price: 999999,
    image: "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Personal teleportation device for instant travel",
    category: "Future Tech",
    stock: 0,
    qrCode: "TP017"
  },
  {
    id: 18,
    name: "Energy Shield Generator",
    price: 149999,
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Personal force field generator for protection",
    category: "Future Tech",
    stock: 2,
    qrCode: "ES018"
  },
  {
    id: 19,
    name: "Time Manipulation Watch",
    price: 299999,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Temporal manipulation device with time dilation",
    category: "Future Tech",
    stock: 1,
    qrCode: "TM019"
  },
  {
    id: 20,
    name: "Molecular Assembler",
    price: 499999,
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Nanotechnology device for matter manipulation",
    category: "Future Tech",
    stock: 1,
    qrCode: "MA020"
  }
];