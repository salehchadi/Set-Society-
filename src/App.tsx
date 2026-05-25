/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ReturnRefundPage from "./pages/ReturnRefundPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { trackEvent } from "./utils/pixel";

/**
 * RouteTracker monitors route transitions and triggers PageView tracking events
 * for each unique URL path in the single-page application.
 */
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track PageView on every route change
    trackEvent("PageView", {
      path: location.pathname,
      search: location.search,
    });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/returns" element={<ReturnRefundPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
