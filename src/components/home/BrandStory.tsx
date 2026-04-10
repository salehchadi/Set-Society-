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
  );
}
