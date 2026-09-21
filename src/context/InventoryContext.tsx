import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Product } from '../assets/constants';

// Replace this with your actual published CSV URL
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIbX6lpqS0JdTJe2_BCjP89vtZG-TW0kOBBlUPOniPHUp7scB99AbO0FFrrOj5iSqYiPQu7q7Vsnv-/pub?output=csv';

interface InventoryContextType {
  stock: Record<string, number>; // Key: "ProductID-Size" (e.g., "1-M"), Value: Stock count
  prices: Record<string, number>; // Key: "ProductID", Value: Dynamic Price
  realPrices: Record<string, number>; // Key: "ProductID", Value: Dynamic Real Price
  isLoading: boolean;
  error: string | null;
  getDynamicProduct: (product: Product) => Product;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [stock, setStock] = useState<Record<string, number>>({});
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [realPrices, setRealPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch inventory data');
        }
        
        const csvText = await response.text();
        const newStock: Record<string, number> = {};
        const newPrices: Record<string, number> = {};
        const newRealPrices: Record<string, number> = {};
        
        // Parse CSV manually
        const lines = csvText.split('\n');
        if (lines.length > 0) {
          const headerCols = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[\r\n"']/g, ''));
          
          const productIdIdx = headerCols.findIndex(h => h.includes('product') || h === 'id');
          const sizeIdx = headerCols.findIndex(h => h === 'size');
          const stockIdx = headerCols.findIndex(h => h.includes('stock'));
          const priceIdx = headerCols.findIndex(h => h === 'price');
          const realPriceIdx = headerCols.findIndex(h => h.includes('real') || h.includes('original') || h.includes('old'));

          const pIdx = productIdIdx >= 0 ? productIdIdx : 0;
          const sIdx = sizeIdx >= 0 ? sizeIdx : 1;
          const stIdx = stockIdx >= 0 ? stockIdx : 2;
          const prIdx = priceIdx >= 0 ? priceIdx : 3;
          const rPrIdx = realPriceIdx >= 0 ? realPriceIdx : 4;

          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const cols = line.split(',').map(c => c.trim().replace(/[\r\n"']/g, ''));
            const productId = cols[pIdx];
            const size = cols[sIdx];
            const stockCountStr = cols[stIdx];
            const priceStr = cols[prIdx];
            const realPriceStr = cols[rPrIdx];
            
            if (productId && size && stockCountStr !== undefined) {
              const stockCount = parseInt(stockCountStr, 10);
              if (!isNaN(stockCount)) {
                newStock[`${productId}-${size}`] = stockCount;
              }
            }

            if (productId && priceStr) {
              const priceVal = parseFloat(priceStr);
              if (!isNaN(priceVal) && priceVal > 0) {
                newPrices[productId] = priceVal;
              }
            }

            if (productId && realPriceStr) {
              const realPriceVal = parseFloat(realPriceStr);
              if (!isNaN(realPriceVal) && realPriceVal > 0) {
                newRealPrices[productId] = realPriceVal;
              }
            }
          }
        }
        
        setStock(newStock);
        setPrices(newPrices);
        setRealPrices(newRealPrices);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    if (CSV_URL.includes('YOUR_SHEET_ID')) {
      console.warn("Please replace CSV_URL in InventoryContext with your actual Google Sheets published CSV URL.");
      setIsLoading(false);
    } else {
      fetchInventory();
      const intervalId = setInterval(fetchInventory, 5 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const getDynamicProduct = useCallback((product: Product): Product => {
    const dynamicPrice = prices[product.id];
    const dynamicRealPrice = realPrices[product.id];
    
    const price = (dynamicPrice !== undefined && dynamicPrice > 0) ? dynamicPrice : product.price;
    const originalPrice = (dynamicRealPrice !== undefined && dynamicRealPrice > 0) 
      ? dynamicRealPrice 
      : product.originalPrice;

    return {
      ...product,
      price,
      originalPrice,
    };
  }, [prices, realPrices]);

  return (
    <InventoryContext.Provider value={{ stock, prices, realPrices, isLoading, error, getDynamicProduct }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}

