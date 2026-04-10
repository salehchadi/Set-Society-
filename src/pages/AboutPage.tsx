import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets/constants";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";

const VALUES = [
  {
    number: "01",
    title: "Craftsmanship",
    description:
      "Every stitch tells a story. Our garments are hand-finished in our local atelier by artisans who have dedicated their lives to the art of dressmaking. We never compromise on construction.",
  },
  {
    number: "02",
    title: "Sustainability",
    description:
      "We source our textiles from historic mills committed to ethical production. From organic cotton to responsibly-harvested silk, every material is chosen with intention and care.",
  },
  {
    number: "03",
    title: "Femininity",
    description:
      "Our designs celebrate the modern woman in all her complexity. We create pieces that empower, flatter, and move with you—from the boardroom to the weekend market.",
  },
];

const MILESTONES = [
  { year: "2019", event: "Founded in a small atelier with a vision for modern feminine luxury." },
  { year: "2020", event: "Launched our first capsule collection — The Modern Uniform." },
  { year: "2021", event: "Expanded to sustainable sourcing partnerships with Italian and Japanese mills." },
  { year: "2022", event: "Opened our flagship atelier and introduced made-to-measure services." },
  { year: "2023", event: "Featured in Vogue Arabia and expanded to international shipping." },
  { year: "2024", event: "Launched our digital atelier experience and new seasonal collections." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-surface-container-low">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={IMAGES.hero}
            alt="Our Atelier"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-4"
          >
            <span className="font-script text-4xl md:text-5xl text-white block">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tight">
              THE ATELIER
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 px-8 bg-surface-container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <AnimatedSection>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold">
              WHO WE ARE
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary">
              Where Heritage<br />Meets Modernity
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant max-w-2xl mx-auto">
              Set Society was born from a simple belief: that modern women deserve clothing crafted with the same care and precision as haute couture, but designed for real life. We bridge the gap between timeless elegance and contemporary function, creating pieces that become the foundation of a confident wardrobe.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant max-w-2xl mx-auto">
              Each garment is more than fabric and thread—it's a commitment to the woman who wears it. From the sourcing of our sustainable textiles to the final hand-stitched detail, every step reflects our devotion to quality, ethics, and beauty.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="pt-4">
              <span className="font-script text-4xl text-primary">Slow luxury, timeless style.</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
        <AnimatedSection className="text-center mb-20">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-2">
            OUR PILLARS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary">
            What We Stand For
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {VALUES.map((value, i) => (
            <AnimatedSection key={value.title} delay={i * 0.15}>
              <div className="space-y-6 text-center md:text-left">
                <span className="font-serif text-5xl text-primary/10">{value.number}</span>
                <h3 className="font-serif text-2xl uppercase tracking-tight text-primary">
                  {value.title}
                </h3>
                <p className="text-sm leading-[1.8] text-on-surface-variant">
                  {value.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Our Atelier - Image + Text */}
      <section className="bg-surface-container">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row">
          <AnimatedSection className="lg:w-1/2" direction="left">
            <div className="aspect-square lg:aspect-auto lg:h-full overflow-hidden">
              <img
                src={IMAGES.product1}
                alt="Inside our atelier"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </AnimatedSection>

          <div className="lg:w-1/2 flex items-center p-12 md:p-20 lg:p-28">
            <div className="space-y-8">
              <AnimatedSection>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold">
                  THE WORKSHOP
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary">
                  Our Atelier
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant">
                  Nestled in the heart of our creative studio, our atelier is where vision becomes tangible. Here, our team of skilled artisans work side by side with our designers, ensuring that every pattern is cut with precision and every seam is finished by hand.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant">
                  We embrace the philosophy of slow fashion — taking the time to perfect each piece rather than chasing trends. The result is a collection of timeless garments that transcend seasons and stand the test of time.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <span className="font-script text-3xl text-primary">Precision in every detail.</span>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
        <AnimatedSection className="text-center mb-20">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-2">
            OUR JOURNEY
          </p>
          <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary">
            Milestones
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {MILESTONES.map((milestone, i) => (
            <AnimatedSection key={milestone.year} delay={i * 0.08}>
              <div className="flex gap-8 py-8 border-b border-primary/10 last:border-0">
                <span className="font-serif text-2xl md:text-3xl text-primary/20 shrink-0 w-20">
                  {milestone.year}
                </span>
                <p className="text-sm md:text-base leading-[1.8] text-on-surface-variant pt-2">
                  {milestone.event}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-primary text-white overflow-hidden relative">
        <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="font-script text-4xl block">Discover the collection</span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight uppercase">
              Experience<br />Set Society
            </h3>
            <p className="text-sm opacity-70 max-w-sm mx-auto">
              Explore our curated pieces, each crafted with intention for the modern woman.
            </p>
            <Link to="/products">
              <Button className="mt-4 !bg-white !text-primary hover:!bg-white/90">
                Shop the Collection <ArrowRight size={14} />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </section>
    </div>
  );
}
