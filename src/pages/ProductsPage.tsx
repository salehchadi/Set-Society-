import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { PRODUCTS, CATEGORIES, COLORS, SORT_OPTIONS } from "../assets/constants";
import ProductCard from "../components/ui/ProductCard";
import AnimatedSection from "../components/ui/AnimatedSection";

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }
    if (color !== "All") {
      result = result.filter((p) => p.color === color);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [category, color, sortBy]);

  const activeFilters = [
    ...(category !== "All" ? [{ label: category, clear: () => setCategory("All") }] : []),
    ...(color !== "All" ? [{ label: color, clear: () => setColor("All") }] : []),
  ];

  return (
    <div className="pt-28 pb-32">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1920px] mx-auto mb-12">
        <AnimatedSection>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-2">
            THE COLLECTION
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-primary">
              Our Products
            </h1>
            <p className="text-sm text-on-surface-variant">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Toolbar */}
      <section className="px-6 md:px-12 max-w-[1920px] mx-auto mb-8">
        <div className="flex items-center justify-between border-y border-primary/10 py-4">
          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            Filters
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 bg-primary text-white text-[0.5rem] rounded-full flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-primary hover:opacity-70 transition-opacity"
            >
              Sort by: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 bg-surface border border-primary/10 shadow-xl z-20 min-w-[200px]"
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[0.65rem] uppercase tracking-[0.15em] transition-colors ${
                        sortBy === option.value
                          ? "bg-primary text-white"
                          : "text-primary hover:bg-surface-container"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Active filter pills */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 pt-4">
            {activeFilters.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-[0.6rem] uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
              >
                {f.label}
                <X size={12} />
              </button>
            ))}
            <button
              onClick={() => {
                setCategory("All");
                setColor("All");
              }}
              className="text-[0.6rem] uppercase tracking-[0.15em] text-on-surface-variant hover:text-primary transition-colors ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      <div className="px-6 md:px-12 max-w-[1920px] mx-auto flex gap-12">
        {/* Filter Sidebar */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block shrink-0 overflow-hidden"
            >
              <div className="w-[240px] space-y-8 pr-6 border-r border-primary/10">
                {/* Category filter */}
                <div className="space-y-4">
                  <h4 className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-primary">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`block w-full text-left text-sm py-1.5 transition-colors ${
                          category === cat
                            ? "text-primary font-medium"
                            : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color filter */}
                <div className="space-y-4">
                  <h4 className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-primary">
                    Color
                  </h4>
                  <div className="space-y-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`block w-full text-left text-sm py-1.5 transition-colors ${
                          color === c
                            ? "text-primary font-medium"
                            : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
              onClick={() => setFiltersOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-2xl uppercase tracking-tight text-primary">
                    Filters
                  </h3>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <h4 className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-primary">
                      Category
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-2 text-[0.65rem] uppercase tracking-[0.15em] border transition-colors ${
                            category === cat
                              ? "bg-primary text-white border-primary"
                              : "border-primary/20 text-primary hover:border-primary"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-primary">
                      Color
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`px-4 py-2 text-[0.65rem] uppercase tracking-[0.15em] border transition-colors ${
                            color === c
                              ? "bg-primary text-white border-primary"
                              : "border-primary/20 text-primary hover:border-primary"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full mt-8 bg-primary text-white py-4 text-[0.65rem] uppercase tracking-[0.2em] font-medium"
                >
                  Show {filtered.length} Results
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-serif text-2xl text-primary/40 mb-4">No pieces found</p>
              <button
                onClick={() => {
                  setCategory("All");
                  setColor("All");
                }}
                className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-primary border-b border-primary/20 pb-1 hover:border-primary transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
