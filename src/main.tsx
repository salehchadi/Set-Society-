import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { InventoryProvider } from './context/InventoryContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InventoryProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </InventoryProvider>
  </StrictMode>,
);
