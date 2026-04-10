/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Menu, ShoppingBag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWdpKQK-FY4AGoqcKLMfQHvhVcB-wifp_pznznSaQCQw2-ZaTFxmcWqMi8Zjvp4PPtffx0yrfKzSxBXDaScJhUQIO_IZnzgWW92ygBQFhgjwWpuoTBFwbeQyCsKPdP_IC6wZXqLo806EsCifLN11Csk0Wao5vUzGjCk29RlJK0krkQrvi0MS5zhrnY6g9QPkqMZK6twfQBVcN902-XRUec-1bSOnv5PvCiiVpti9cobmIkAOAfbjqWbIYcMcEQxjyq_wMWsTAHEx3G",
  hero: "https://lh3.googleusercontent.com/aida/ADBb0uiox1NxEzufZOuZflFKJACZYgniIBdb6r17WKHXWO3UiwMiFb2ypO8wS2DcRadfSxaS7oi74rV4IBO9vROFMvZwGPtikGa_rGiBhMngp_IBopYAFi4fV-jd9X4cIzwdP_EU-94zM7tZu7rlmkuGFRRgbwtVFe8hH4Jm1xHpmq0zuWSbSORnL-CVIAuPDjfqztpUdSHCaluwiYQhnfxf2OCsuz4Pb8sHECxExReZY8YM5BVMx5sfLfXEbgNRlH4FwhxWOEdB2MIaIv8",
  product1: "https://lh3.googleusercontent.com/aida/ADBb0uiu669mLZhfEVlmOqzpF0y6-uwhvkuwmF09RCzoMIm5JrJWZvhuRCnS5y7LgJL_FaC3HSNd0tudk0g_Ue8NrE2gaJEoM33b8pPCsCkB2aAMSbMf__uGC-gnMbS13NcExx63c6bWcWp2opx5aFmSB_LcULHsYbXv7t_QG5xyCTLoAyZGRtqaSnGVX4z8Yo3RJmkl95VbJREC1yrV5p-bco8yiC5Gzwx9zHK6XydcgCBhys0KaRO9qTxzCMhJ4JGVJchYtq5N22TG1oo",
  product2: "https://lh3.googleusercontent.com/aida/ADBb0uhW8148dKV5XaqNRcm2Gw8V5S9MWLPGQKtOQuuDUsyrzENMXDV3hBuxW82eQKiUl6D1q6aHN_hD5H4oCJK5g-i3nrUz9M7xALgWFDPW9UV4-62qKqjLz-JKYs52W8MgmxpNQTlKvopcX7ME3iX4ePOysdPlt57KGsRAyDy3vOwJhJnUCF8GinXA430go4YXQ_BNk-PFIcO3M8GJLWJyAvDVLzozlD7P2qA7zX4AnhtSRK3Sdi4pnqrAbt1W1-1UAGcMzTYcM-cL4SU"
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 ${
          scrolled ? "bg-surface/80 backdrop-blur-xl py-4" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          <button className="text-primary hover:opacity-60 transition-opacity">
            <Menu size={24} strokeWidth={1.5} />
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <img 
              src={IMAGES.logo} 
              alt="SET SOCIETY" 
              className="h-6 w-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <button className="text-primary hover:opacity-60 transition-opacity">
            <ShoppingBag size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[700px] overflow-hidden bg-surface-container-low">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={IMAGES.hero} 
              alt="The Modern Uniform" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-[1920px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-4"
            >
              <span className="font-script text-4xl md:text-5xl text-white block">
                New Season
              </span>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tight max-w-2xl">
                THE MODERN UNIFORM
              </h1>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 bg-primary text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:bg-primary/90"
              >
                SHOP THE SET
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-32 px-8 bg-surface-container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold">
                OUR HERITAGE
              </p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary">
                Local Artistry,<br />Global Vision
              </h2>
              <p className="text-sm md:text-base leading-[1.8] text-on-surface-variant max-w-lg mx-auto">
                Each garment is a testament to the precision of our local atelier. We believe in the slow luxury of hand-stitched details and the integrity of sustainable, high-quality textiles sourced from historic mills.
              </p>
              <div className="pt-6">
                <span className="font-script text-4xl text-primary">Made by hand.</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary">
                New Arrivals
              </h2>
              <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">
                COLLECTION 2024
              </p>
            </div>
            <button className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold border-b border-primary/20 pb-1 hover:border-primary transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {/* Product Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative">
                <img 
                  src={IMAGES.product1} 
                  alt="Running Errands Set - Ivory" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl uppercase tracking-tight text-primary">
                    Running Errands Set - Ivory
                  </h3>
                  <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.15em]">
                    Ivory / Premium Technical Knit
                  </p>
                </div>
                <span className="font-medium text-sm text-primary">$420</span>
              </div>
            </motion.div>

            {/* Product Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group cursor-pointer md:mt-24"
            >
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative">
                <img 
                  src={IMAGES.product2} 
                  alt="Running Errands Set - Black" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl uppercase tracking-tight text-primary">
                    Running Errands Set - Black
                  </h3>
                  <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-[0.15em]">
                    Black / Premium Technical Knit
                  </p>
                </div>
                <span className="font-medium text-sm text-primary">$580</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-40 px-8 bg-primary text-white overflow-hidden relative">
          <div className="max-w-xl mx-auto text-center space-y-12 relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl leading-tight"
            >
              Join the Atelier<br />Journal
            </motion.h3>
            <p className="text-sm opacity-70 tracking-wide max-w-sm mx-auto">
              Be the first to access limited collections and editorial insights.
            </p>
            <div className="relative max-w-md mx-auto group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-white/20 py-4 text-[0.65rem] tracking-[0.2em] focus:outline-none focus:border-white transition-colors placeholder:text-white/30 uppercase"
              />
              <button className="absolute right-0 bottom-4 text-[0.65rem] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all">
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>
          {/* Subtle background texture/gradient */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dim py-24 px-8 md:px-16">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-12">
            <h2 className="font-script text-5xl text-primary">Set Society</h2>
            <nav className="flex flex-col space-y-4">
              {["Privacy Policy", "Terms of Service", "Shipping & Returns"].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors hover:underline underline-offset-8"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-12 md:text-right w-full md:w-auto">
            <div className="flex gap-8 md:justify-end">
              {["Instagram", "Pinterest"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="text-[0.6rem] uppercase tracking-[0.25em] text-primary/40">
              © 2024 DIGITAL ATELIER. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
