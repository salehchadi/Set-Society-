import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../assets/constants";
import { useInventory } from "./InventoryContext";

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
  const { getDynamicProduct, stock } = useInventory();

  // Synchronize cart items with dynamic database prices from Google Sheets
  useEffect(() => {
    setItems((prev) => {
      let changed = false;
      const next = prev.map((item) => {
        const dyn = getDynamicProduct(item.product);
        if (
          dyn.price !== item.product.price ||
          dyn.originalPrice !== item.product.originalPrice
        ) {
          changed = true;
          return { ...item, product: dyn };
        }
        return item;
      });
      return changed ? next : prev;
    });
  }, [getDynamicProduct]);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const getMaxStock = (productId: string, size: string): number => {
    const key = `${productId}-${size}`;
    return typeof stock[key] === "number" ? stock[key] : Infinity;
  };

  const addItem = (product: Product, size: string) => {
    const dynamicProduct = getDynamicProduct(product);
    const maxStock = getMaxStock(dynamicProduct.id, size);
    if (maxStock <= 0) return;

    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === dynamicProduct.id && item.selectedSize === size
      );
      if (existing) {
        if (existing.quantity >= maxStock) return prev;
        return prev.map((item) =>
          item.product.id === dynamicProduct.id && item.selectedSize === size
            ? {
                ...item,
                product: dynamicProduct,
                quantity: Math.min(item.quantity + 1, maxStock),
              }
            : item
        );
      }
      return [...prev, { product: dynamicProduct, quantity: 1, selectedSize: size }];
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
    const maxStock = getMaxStock(productId, size);
    const targetQty = Math.min(quantity, maxStock);
    if (targetQty <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: targetQty }
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
