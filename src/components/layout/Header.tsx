import { motion } from "motion/react";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGES, NAV_LINKS } from "../../assets/constants";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useCart } from "../../context/CartContext";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollPosition(50);
  const { itemCount } = useCart();
  const location = useLocation();

  // On non-home pages, always show the solid header
  const isHome = location.pathname === "/";
  const showSolid = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 ${
          showSolid ? "bg-surface/80 backdrop-blur-xl py-4" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-primary hover:opacity-60 transition-opacity md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.65rem] uppercase tracking-[0.2em] font-semibold transition-colors ${
                  location.pathname === link.path
                    ? "text-primary border-b border-primary pb-0.5"
                    : "text-primary/50 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center absolute left-1/2 -translate-x-1/2"
          >
            <Link to="/">
              <img
                src={IMAGES.logo}
                alt="SET SOCIETY"
                className="h-6 w-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
          </motion.div>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-primary hover:opacity-60 transition-opacity relative"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={24} strokeWidth={1.5} />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[0.5rem] rounded-full flex items-center justify-center font-semibold"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
