import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart();

  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="pt-28 pb-32 px-6 md:px-12 max-w-[1920px] mx-auto">
      {/* Page Header */}
      <AnimatedSection className="mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-2">
          YOUR SELECTION
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-primary">
            Shopping Bag
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
            <p className="font-serif text-2xl text-primary">Your bag is empty</p>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
              Explore our curated collection and find pieces that speak to your personal style.
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
                            ${(item.product.price * item.quantity).toLocaleString()}
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
                  <span className="text-primary font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-primary font-medium">
                    {shipping === 0 ? (
                      <span className="text-[#4A7C59]">Complimentary</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[0.6rem] text-on-surface-variant/70">
                    Free shipping on orders over $500
                  </p>
                )}
              </div>

              <div className="flex justify-between py-6 border-b border-primary/10">
                <span className="font-serif text-lg uppercase tracking-tight text-primary">Total</span>
                <span className="font-serif text-lg text-primary">${total.toLocaleString()}</span>
              </div>

              <div className="pt-8 space-y-4">
                <Button className="w-full" size="lg">
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
    </div>
  );
}
