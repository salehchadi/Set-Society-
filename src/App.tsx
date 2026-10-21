/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ReturnRefundPage from "./pages/ReturnRefundPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminPage from "./pages/AdminPage";
import { trackPageView } from "./utils/pixel";

/**
 * RouteTracker monitors route transitions and triggers PageView tracking events
 * for each unique URL path in the single-page application.
 */
function RouteTracker() {
  const location = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // index.html already fires the initial PageView on page load.
    // We only fire PageView on subsequent client-side navigation to avoid duplicates.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    trackPageView(location.pathname);
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        {/* Public routes with shared layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/returns" element={<ReturnRefundPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        {/* Admin route — no shared layout (has its own full-page design) */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
