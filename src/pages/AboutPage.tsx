import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets/constants";
import AnimatedSection from "../components/ui/AnimatedSection";
import Button from "../components/ui/Button";

const VALUES = [
  {
    number: "01",
    title: "Quality First",
    description:
      "Every piece is made with care and attention to detail. We focus on thoughtful construction and fabric choices that feel good and last.",
  },
  {
    number: "02",
    title: "Thoughtful Design",
    description:
      "From first sketch to final piece, everything is considered with intention. We create versatile sets that are easy to wear and made to move with your everyday life.",
  },
  {
    number: "03",
    title: "Modern Femininity",
    description:
      "A balance of modesty and ease. Soft, considered pieces designed to feel natural, effortless, and quietly confident.",
  },
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
              OUR JOURNEY
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
              Where Quality<br />Meets Everyday Life
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant max-w-2xl mx-auto">
              Set Society was created with everyday simplicity in mind. Our founder, a new mother and former athlete, experienced firsthand how challenging it can be to get dressed while balancing the demands of daily life—especially when time and energy are limited.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant max-w-2xl mx-auto">
              This inspired a thoughtful approach to dressing: creating basic, elevated sets designed to make getting ready feel easier, without compromising on comfort or style. Each piece is made to feel effortless, versatile, and quietly put together—supporting you through your day, wherever it may take you.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="pt-4">
              <span className="font-script text-4xl text-primary">A new beginning.</span>
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
                  BEHIND THE SCENES
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary">
                  Our Space
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant">
                  We are thrilled to open our doors and share our vision with the local community. Every piece in our collection is curated and prepared with the utmost attention to detail, right here in our workspace.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant">
                  As an emerging local brand, your support means everything to us. We look forward to growing alongside you and continuing to bring thoughtfully designed fashion to your everyday life.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <span className="font-script text-3xl text-primary">Thank you for being here.</span>
              </AnimatedSection>
            </div>
          </div>
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
