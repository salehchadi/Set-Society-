import { Link } from "react-router-dom";
import { PRODUCTS } from "../../assets/constants";
import ProductCard from "../ui/ProductCard";

export default function NewArrivals() {
  // Show only the first 2 products on the home page
  const featured = PRODUCTS.slice(0, 2);

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-2">
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary">
            New Arrivals
          </h2>
          <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">
            COLLECTION 2026
          </p>
        </div>
        <Link
          to="/products"
          className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold border-b border-primary/20 pb-1 hover:border-primary transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {featured.map((product, i) => (
          <div key={product.id} className={i === 1 ? "md:mt-24" : ""}>
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
