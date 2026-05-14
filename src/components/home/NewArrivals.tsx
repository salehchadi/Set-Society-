import { Link } from "react-router-dom";
import { PRODUCTS } from "../../assets/constants";
import ProductCard from "../ui/ProductCard";

export default function NewArrivals() {
  // Show all products on the home page
  const featured = PRODUCTS;

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="space-y-2">
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary">
            The Collection
          </h2>
          <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">
            2026 SERIES
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {featured.map((product, i) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
