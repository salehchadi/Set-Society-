import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, ArrowRight, ShoppingBag, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/InventoryContext";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";
import { trackEvent } from "../utils/pixel";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart();
  const { stock } = useInventory();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Cairo");

  const shipping = 80;
  const total = subtotal + shipping;

  const hasInventoryData = Object.keys(stock).length > 0;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    
    setIsSubmitting(true);

    let orderText = `New Order - Set Society\n\n`;
    orderText += `Customer Details:\n`;
    orderText += `Name: ${name}\n`;
    orderText += `Phone: ${phone}\n`;
    orderText += `Address: ${address}, ${city}\n\n`;
    
    orderText += `Order Items:\n`;
    items.forEach(item => {
      orderText += `- ${item.quantity}x ${item.product.name} (${item.product.color})\n  Size: ${item.selectedSize}\n  Price: ${item.product.price * item.quantity} EGP\n`;
    });
    
    orderText += `\nSummary:\n`;
    orderText += `Subtotal: ${subtotal} EGP\n`;
    orderText += `Shipping: ${shipping} EGP\n`;
    orderText += `Total: ${total} EGP\n`;
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            access_key: "2e16dc02-ae14-43eb-b4f3-37ce31a85462",
            name,
            phone,
            address: `${address}, ${city}`,
            message: orderText,
            subject: `New Order from ${name} - Set Society`,
            from_name: "Set Society Store"
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        trackEvent('Purchase', { value: total, currency: 'EGP' });
        clearCart();
        setIsCheckoutModalOpen(false);
        setName("");
        setPhone("");
        setAddress("");
        setCity("Cairo");
        alert("Order submitted successfully! We will contact you soon.");
      } else {
        alert("Failed to submit order: " + (data.message || "Please try again."));
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Failed to submit order. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-32 px-6 md:px-12 max-w-[1920px] mx-auto">
      {/* Page Header */}
      <AnimatedSection className="mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-2">
          YOUR SELECTION
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-primary">
            Shopping Cart
          </h1>
          {items.length > 0 && (
            <span className="text-sm text-on-surface-variant">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          )}
        </div>
      </AnimatedSection>

      {items.length === 0 ? (
        /* Empty State */
        <AnimatedSection className="py-24 text-center space-y-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-surface-container flex items-center justify-center">
            <ShoppingBag size={32} strokeWidth={1} className="text-primary/30" />
          </div>
          <div className="space-y-3">
            <p className="font-serif text-2xl text-primary">Your cart is empty</p>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
              Explore our curated collection and find pieces that speak to your personal style
            </p>
          </div>
          <Link to="/products">
            <Button>
              Continue Shopping <ArrowRight size={14} />
            </Button>
          </Link>
        </AnimatedSection>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Clear all */}
            <div className="flex justify-end mb-6">
              <button
                onClick={clearCart}
                className="text-[0.6rem] uppercase tracking-[0.15em] text-on-surface-variant hover:text-primary transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="divide-y divide-primary/10">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="py-8 first:pt-0"
                  >
                    <div className="flex gap-6">
                      {/* Product image */}
                      <div className="w-28 h-36 md:w-36 md:h-44 bg-surface-container-low shrink-0 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 min-w-0">
                              <h3 className="font-serif text-lg uppercase tracking-tight text-primary truncate">
                                {item.product.name}
                              </h3>
                              <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.15em]">
                                {item.product.color} / {item.product.material}
                              </p>
                              <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.15em]">
                                Size: {item.selectedSize}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.selectedSize)}
                              className="text-primary/40 hover:text-primary transition-colors shrink-0"
                              aria-label="Remove item"
                            >
                              <X size={18} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity controls */}
                          <div className="flex items-center border border-primary/15">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 h-9 flex items-center justify-center text-xs font-medium text-primary border-x border-primary/15">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <span className="font-medium text-sm text-primary">
                            {(item.product.price * item.quantity).toLocaleString()} EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[380px] shrink-0">
            <div className="bg-surface-container p-8 md:p-10 sticky top-28">
              <h3 className="font-serif text-xl uppercase tracking-tight text-primary mb-8">
                Order Summary
              </h3>

              <div className="space-y-4 pb-6 border-b border-primary/10">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-primary font-medium">{subtotal.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-primary font-medium">{shipping} EGP</span>
                </div>
                <p className="text-[0.6rem] text-on-surface-variant/70 text-right">
                  Delivery only in Cairo & Giza
                </p>
              </div>

              <div className="flex justify-between py-6 border-b border-primary/10">
                <span className="font-serif text-lg uppercase tracking-tight text-primary">Total</span>
                <span className="font-serif text-lg text-primary">{total.toLocaleString()} EGP</span>
              </div>

              <div className="pt-8 space-y-4">
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={() => {
                    trackEvent('InitiateCheckout');
                    setIsCheckoutModalOpen(true);
                  }}
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </Button>
                <Link to="/products" className="block">
                  <Button variant="ghost" className="w-full" size="sm">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Policies */}
              <div className="mt-8 pt-6 border-t border-primary/10 space-y-2">
                <p className="text-[0.55rem] uppercase tracking-[0.15em] text-on-surface-variant/60">
                  ✦ Free returns within 14 days
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.15em] text-on-surface-variant/60">
                  ✦ Secure checkout with SSL encryption
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.15em] text-on-surface-variant/60">
                  ✦ Gift wrapping available at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal Overlay */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface p-8 max-w-md w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-4 right-4 text-primary hover:opacity-70 transition-opacity"
              >
                <X size={20} />
              </button>
              
              <h2 className="font-serif text-2xl mb-2 text-primary">Delivery Details</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Please provide your details to complete your order.
              </p>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest text-primary/70 mb-2">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container border border-primary/20 p-3 text-sm focus:outline-none focus:border-primary transition-colors text-primary"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest text-primary/70 mb-2">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container border border-primary/20 p-3 text-sm focus:outline-none focus:border-primary transition-colors text-primary"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest text-primary/70 mb-2">City</label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-surface-container border border-primary/20 p-3 text-sm focus:outline-none focus:border-primary transition-colors text-primary"
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest text-primary/70 mb-2">Delivery Address</label>
                  <textarea 
                    required 
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-surface-container border border-primary/20 p-3 text-sm focus:outline-none focus:border-primary transition-colors text-primary resize-none"
                    placeholder="Area, Street, Building, Floor/Apt"
                  />
                </div>
                <Button type="submit" className="w-full mt-4 !mt-8" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Complete Order"} <ArrowRight size={14} className="ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
