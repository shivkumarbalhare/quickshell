import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  discount: {
    code: string;
    percentage: number;
    amount: number;
  } | null;
  discountedTotal: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  discount: {
    code: string;
    percentage: number;
    amount: number;
  } | null;
  discountedTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; percentage: number; amount: number } }
  | { type: 'REMOVE_DISCOUNT' };

const discountCodes = {
  'SAVE10': { percentage: 10, amount: 0 },
  'SAVE20': { percentage: 20, amount: 0 },
  'FLAT500': { percentage: 0, amount: 500 },
  'WELCOME15': { percentage: 15, amount: 0 },
  'NEWUSER': { percentage: 25, amount: 0 }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  const calculateDiscountedTotal = (total: number, discount: CartState['discount']) => {
    if (!discount) return total;
    if (discount.percentage > 0) {
      return total - (total * discount.percentage / 100);
    }
    return Math.max(0, total - discount.amount);
  };

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
        const updatedItems = state.items.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          discountedTotal: calculateDiscountedTotal(newTotal, state.discount)
        };
      } else {
        const newItems = [...state.items, { ...product, quantity: Math.min(quantity, product.stock) }];
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return {
          ...state,
          items: newItems,
          total: newTotal,
          discountedTotal: calculateDiscountedTotal(newTotal, state.discount)
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        discountedTotal: calculateDiscountedTotal(newTotal, state.discount)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity === 0) {
        const updatedItems = state.items.filter(item => item.id !== productId);
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          discountedTotal: calculateDiscountedTotal(newTotal, state.discount)
        };
      }

      const updatedItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      );
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        discountedTotal: calculateDiscountedTotal(newTotal, state.discount)
      };
    }

    case 'APPLY_DISCOUNT': {
      const discount = action.payload;
      return {
        ...state,
        discount,
        discountedTotal: calculateDiscountedTotal(state.total, discount)
      };
    }

    case 'REMOVE_DISCOUNT': {
      return {
        ...state,
        discount: null,
        discountedTotal: state.total
      };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, discount: null, discountedTotal: 0 };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0, 
    discount: null, 
    discountedTotal: 0 
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast.success('Added to cart!');
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const applyDiscount = (code: string): boolean => {
    const discountInfo = discountCodes[code as keyof typeof discountCodes];
    if (discountInfo) {
      dispatch({ 
        type: 'APPLY_DISCOUNT', 
        payload: { 
          code, 
          percentage: discountInfo.percentage, 
          amount: discountInfo.amount 
        } 
      });
      toast.success(`Discount code "${code}" applied!`);
      return true;
    } else {
      toast.error('Invalid discount code');
      return false;
    }
  };

  const removeDiscount = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' });
    toast.success('Discount removed');
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyDiscount,
      removeDiscount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};