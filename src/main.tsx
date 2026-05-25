import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { InventoryProvider } from './context/InventoryContext.tsx';
import './index.css';
import { initPixel } from './utils/pixel';

// Initialize Meta Pixel tracking on startup
initPixel(import.meta.env.VITE_META_PIXEL_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InventoryProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </InventoryProvider>
  </StrictMode>,
);
