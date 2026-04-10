import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../assets/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-surface z-[70] flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="text-primary hover:opacity-60 transition-opacity"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Brand */}
            <div className="px-8 pb-12">
              <span className="font-script text-4xl text-primary">Set Society</span>
            </div>

            {/* Links */}
            <div className="flex flex-col px-8 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`block py-4 font-serif text-2xl uppercase tracking-tight transition-colors border-b border-primary/5 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-primary/50 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-8 space-y-4">
              <div className="flex gap-6">
                {["Instagram", "Pinterest"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[0.65rem] uppercase tracking-[0.2em] text-primary/50 hover:text-primary transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
              <p className="text-[0.55rem] uppercase tracking-[0.25em] text-primary/30">
                © 2024 SET SOCIETY
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
