import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../assets/constants";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "set-society-cart";

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
  };

  const removeItem = (productId: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
