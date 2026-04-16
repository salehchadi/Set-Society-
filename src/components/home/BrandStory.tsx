import { motion } from "motion/react";

export default function BrandStory() {
  return (
    <section className="py-32 px-8 bg-surface-container">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold">
            OUR STORY
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary">
            Local Passion,<br />Modern Style
          </h2>
          <p className="text-sm md:text-base leading-[1.8] text-on-surface-variant max-w-lg mx-auto">
            Born from a love for true quality and contemporary design, our newly established local brand is dedicated to crafting beautiful, high-quality pieces that elevate your everyday wardrobe.
          </p>
          <div className="pt-6">
            <span className="font-script text-4xl text-primary">Made with care.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
