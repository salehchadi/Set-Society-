import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../assets/constants";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [showSizes, setShowSizes] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSizeChartModal, setShowSizeChartModal] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group cursor-pointer"
      onMouseEnter={() => setShowSizes(true)}
      onMouseLeave={() => setShowSizes(false)}
    >
      <div
        className="aspect-[4/5] bg-surface-container-low overflow-hidden relative"
        onClick={() => navigate("/products")}
      >
        <img
          src={product.image}
          alt={`${product.name} - ${product.color}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-[0.55rem] uppercase tracking-[0.2em] px-3 py-1.5 font-semibold">
              New
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showSizes ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-sm p-4 space-y-3"
        >
          {/* Size selector */}
          <div className="flex items-center gap-2 justify-center">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`w-8 h-8 text-[0.6rem] uppercase tracking-wider border transition-colors ${
                  selectedSize === size
                    ? "bg-primary text-white border-primary"
                    : "border-primary/20 text-primary hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to cart button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-[0.6rem] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors ${
              added
                ? "bg-[#4A7C59] text-white"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            <ShoppingBag size={13} />
            {added ? "Added ✓" : "Add to Cart"}
          </motion.button>
          
          {product.sizeChart && (
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSizeChartModal(true);
                }}
                className="w-full text-center text-[0.6rem] uppercase tracking-[0.1em] text-primary underline hover:opacity-75 pt-1"
             >
                View Size Chart
             </button>
          )}

        </motion.div>
      </div>

      <div className="mt-6 flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-serif text-xl uppercase tracking-tight text-primary">
            {product.name} — {product.color}
          </h3>
          <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.15em]">
            {product.color} / {product.material}
          </p>
        </div>
        <span className="font-medium text-sm text-primary">{product.price} EGP</span>
      </div>

      {showSizeChartModal && product.sizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={(e) => { e.stopPropagation(); setShowSizeChartModal(false); }}>
           <div className="bg-surface p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-auto relative rounded-sm" onClick={e => e.stopPropagation()}>
              <button 
                 className="absolute top-4 right-4 text-primary font-bold hover:opacity-70"
                 onClick={() => setShowSizeChartModal(false)}
              >
                 ✕
              </button>
              <h2 className="font-serif text-2xl mb-6 text-primary">{product.name} Size Chart</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm border-collapse">
                    <thead>
                       <tr className="border-b border-primary/20">
                          <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">Feature</th>
                          <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">XS</th>
                          <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">S</th>
                          <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">M</th>
                          <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">L</th>
                          <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">XL</th>
                          {product.sizeChart.some(r => r.notes) && (
                             <th className="py-2 px-3 font-semibold uppercase tracking-wider text-[0.65rem]">Notes</th>
                          )}
                       </tr>
                    </thead>
                    <tbody>
                       {product.sizeChart.map((row, idx) => (
                          <tr key={idx} className="border-b border-primary/10 hover:bg-surface-container/50">
                             <td className="py-2 px-3">{row.feature}</td>
                             <td className="py-2 px-3">{row.xs}</td>
                             <td className="py-2 px-3">{row.s}</td>
                             <td className="py-2 px-3">{row.m}</td>
                             <td className="py-2 px-3">{row.l}</td>
                             <td className="py-2 px-3">{row.xl}</td>
                             {product.sizeChart!.some(r => r.notes) && (
                                <td className="py-2 px-3 text-[0.65rem] text-on-surface-variant">{row.notes || ""}</td>
                             )}
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}
    </motion.div>
  );
}
