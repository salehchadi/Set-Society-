import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { trackEvent } from "../../utils/pixel";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    trackEvent("Lead", {
      content_name: "Newsletter Subscription",
      content_category: "Journal Signup"
    });

    setSubscribed(true);
    setEmail("");
  };

  return (
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
          Be the first to access limited collections and editorial insights
        </p>
        <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto group">
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder={subscribed ? "THANK YOU FOR SUBSCRIBING!" : "EMAIL ADDRESS"}
            disabled={subscribed}
            className="w-full bg-transparent border-b border-white/20 py-4 text-[0.65rem] tracking-[0.2em] focus:outline-none focus:border-white transition-colors placeholder:text-white/30 uppercase"
            required
          />
          {!subscribed && (
            <button type="submit" className="absolute right-0 bottom-4 text-[0.65rem] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
              Subscribe <ArrowRight size={14} />
            </button>
          )}
        </form>
      </div>
      {/* Subtle background texture/gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
    </section>
  );
}
