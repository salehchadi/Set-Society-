import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { PRODUCTS } from "../assets/constants";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/InventoryContext";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";

import { trackEvent } from "../utils/pixel";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);

  const { addItem } = useCart();
  const { stock } = useInventory();

  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [showSizeChartModal, setShowSizeChartModal] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[1] || product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-32 px-6 text-center">
        <h1 className="font-serif text-3xl text-primary mb-4">Product Not Found</h1>
        <Button onClick={() => navigate("/products")}>Back to Shop</Button>
      </div>
    );
  }

  const hasInventoryData = Object.keys(stock).length > 0;

  const getStockForSize = (size: string) => {
    if (!hasInventoryData) return null;
    return stock[`${product.id}-${size}`];
  };

  const isSelectedSizeOutOfStock = hasInventoryData && getStockForSize(selectedSize) === 0;
  const isProductSoldOut = hasInventoryData && product.sizes.every((size) => getStockForSize(size) === 0);

  const handleAddToCart = () => {
    if (isSelectedSizeOutOfStock) return;
    trackEvent('AddToCart', {
      content_name: product.name,
      content_category: product.category,
      value: product.price,
      currency: 'EGP'
    });
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pt-28 pb-32 px-6 md:px-12 max-w-[1920px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Images */}
        <AnimatedSection className="space-y-4">
          <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative">
            <img
              src={product.image}
              alt={`${product.name} - ${product.color}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isProductSoldOut && (
              <div className="absolute inset-0 bg-surface/40 z-10 flex items-center justify-center backdrop-blur-[1px]">
                <span className="bg-surface text-primary px-4 py-2 tracking-[0.3em] uppercase font-semibold text-[0.65rem] shadow-xl">
                  Out of Stock
                </span>
              </div>
            )}
            {!isProductSoldOut && product.isNew && (
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-primary text-white px-4 py-2 tracking-[0.2em] uppercase font-semibold text-xs shadow-xl">
                  New
                </span>
              </div>
            )}
            {!isProductSoldOut && product.originalPrice && (
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-red-700 text-white px-4 py-2 tracking-[0.2em] uppercase font-semibold text-xs shadow-xl">
                  Sale
                </span>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <AnimatedSection delay={0.1}>
            <div className="mb-8">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-3">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary mb-4">
                {product.name}
              </h1>
              {product.originalPrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-xl text-red-700 font-semibold">{product.price} EGP</span>
                  <span className="text-base line-through text-on-surface-variant font-light">{product.originalPrice} EGP</span>
                  <span className="text-[0.65rem] uppercase tracking-wider bg-red-50 text-red-700 font-bold px-2 py-0.5 border border-red-200">
                    Save {product.originalPrice - product.price} EGP
                  </span>
                </div>
              ) : (
                <p className="text-xl text-primary font-medium">{product.price} EGP</p>
              )}
            </div>

            <div className="prose prose-sm md:prose-base prose-stone mb-10 text-on-surface-variant leading-relaxed">
              {product.description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="space-y-8 mb-10 border-y border-primary/10 py-8">
              {/* Color */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-semibold text-primary mb-3">
                  Color
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                    <div 
                      className={`w-6 h-6 rounded-full border border-black/10 shadow-sm ${product.color.toLowerCase() === 'black' ? 'bg-black' : product.color.toLowerCase() === 'white' ? 'bg-white' : 'bg-gray-500'}`} 
                    />
                  </div>
                  <span className="text-sm text-primary">{product.color}</span>
                </div>
              </div>

              {/* Material */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-semibold text-primary mb-3">
                  Material
                </p>
                <p className="text-sm text-primary">{product.material}</p>
              </div>

              {/* Size */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <p className="text-xs uppercase tracking-[0.15em] font-semibold text-primary">
                    Select Size
                  </p>
                  {product.sizeChart && (
                    <button
                      onClick={() => setShowSizeChartModal(true)}
                      className="text-[0.65rem] uppercase tracking-[0.1em] text-on-surface-variant underline hover:text-primary transition-colors"
                    >
                      Size Guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => {
                    const isOutOfStock = getStockForSize(size) === 0;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 text-xs uppercase tracking-wider border transition-colors ${
                          selectedSize === size
                            ? "bg-primary text-white border-primary"
                            : "border-primary/20 text-primary hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {isSelectedSizeOutOfStock && hasInventoryData && (
                 <div className="p-3 bg-surface-container text-on-surface-variant text-xs border border-primary/10 flex items-start gap-2">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>This size is currently out of stock.</span>
                 </div>
              )}
              <Button
                onClick={handleAddToCart}
                size="lg"
                disabled={isSelectedSizeOutOfStock}
                className={`w-full ${
                  isSelectedSizeOutOfStock
                    ? "!bg-surface-dim !text-on-surface-variant !border-surface-dim cursor-not-allowed"
                    : added
                    ? "!bg-[#4A7C59] !border-[#4A7C59]"
                    : ""
                }`}
              >
                {added ? (
                  "Added to Cart ✓"
                ) : (
                  <>
                    <ShoppingBag size={18} className="mr-2" />
                    {isSelectedSizeOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </>
                )}
              </Button>
            </div>

            {/* Accordion / Details */}
            <div className="mt-12 space-y-4 text-sm text-on-surface-variant">
               <div className="border-t border-primary/10 pt-4">
                  <p className="uppercase tracking-widest text-xs font-semibold text-primary mb-2">Delivery</p>
                  <p>Standard delivery within 3-5 business days.</p>
               </div>
               <div className="border-t border-primary/10 pt-4">
                  <p className="uppercase tracking-widest text-xs font-semibold text-primary mb-2">Returns</p>
                  <p>Free returns within 14 days of receiving your order.</p>
               </div>
            </div>

          </AnimatedSection>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChartModal && product.sizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowSizeChartModal(false)}>
          <div className="bg-surface p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-auto relative rounded-sm" onClick={e => e.stopPropagation()}>
            <button 
               className="absolute top-4 right-4 text-primary font-bold hover:opacity-70"
               onClick={() => setShowSizeChartModal(false)}
            >
               ✕
            </button>
            <h3 className="font-serif text-2xl text-primary mb-6">Size Guide</h3>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm border-collapse">
                  <thead>
                     <tr className="border-b border-primary/20">
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">Feature</th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">XS</th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">S</th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">M</th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">L</th>
                        <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">XL</th>
                        {product.sizeChart.some(r => r.notes) && (
                           <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[0.7rem]">Notes</th>
                        )}
                     </tr>
                  </thead>
                  <tbody>
                     {product.sizeChart.map((row, idx) => (
                        <tr key={idx} className="border-b border-primary/10 hover:bg-surface-container/50">
                           <td className="py-3 px-4 font-medium">{row.feature}</td>
                           <td className="py-3 px-4">{row.xs}</td>
                           <td className="py-3 px-4">{row.s}</td>
                           <td className="py-3 px-4">{row.m}</td>
                           <td className="py-3 px-4">{row.l}</td>
                           <td className="py-3 px-4">{row.xl}</td>
                           {product.sizeChart!.some(r => r.notes) && (
                              <td className="py-3 px-4 text-[0.7rem] text-on-surface-variant">{row.notes || ""}</td>
                           )}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
