import React, { createContext, useContext, useEffect, useState } from 'react';

// Replace this with your actual published CSV URL
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIbX6lpqS0JdTJe2_BCjP89vtZG-TW0kOBBlUPOniPHUp7scB99AbO0FFrrOj5iSqYiPQu7q7Vsnv-/pub?output=csv';

interface InventoryContextType {
  stock: Record<string, number>; // Key: "ProductID-Size" (e.g., "1-M"), Value: Stock count
  isLoading: boolean;
  error: string | null;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [stock, setStock] = useState<Record<string, number>>({});
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
        
        // Parse CSV manually
        const lines = csvText.split('\n');
        
        // Skip header line (assuming first line is header)
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const [productId, size, stockCountStr] = line.split(',');
          
          if (productId && size && stockCountStr) {
            const stockCount = parseInt(stockCountStr.trim(), 10);
            if (!isNaN(stockCount)) {
              newStock[`${productId.trim()}-${size.trim()}`] = stockCount;
            }
          }
        }
        
        setStock(newStock);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        // Fallback: If fetch fails, we don't block the UI, we just don't know the stock.
        // You might want to default to everything being in-stock if the DB is down.
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    // If CSV_URL is not set to a real URL, don't fetch
    if (CSV_URL.includes('YOUR_SHEET_ID')) {
      console.warn("Please replace CSV_URL in InventoryContext with your actual Google Sheets published CSV URL.");
      setIsLoading(false);
    } else {
      fetchInventory();
      // Refresh inventory every 5 minutes
      const intervalId = setInterval(fetchInventory, 5 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ stock, isLoading, error }}>
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
