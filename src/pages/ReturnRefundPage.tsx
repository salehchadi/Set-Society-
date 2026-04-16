import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";

const SECTIONS = [
  {
    title: "Return & Exchange Policy",
    content: [
      "At our brand, your experience means everything to us. We always strive to deliver the best quality and make sure you’re completely satisfied with your purchase 🤍"
    ],
    items: [
      "You can request a return or exchange within 14 days of receiving your order.",
      "Returns and exchanges are accepted with only the delivery fees covered by the customer.",
      "For your convenience and peace of mind, you’re allowed to open and check your package while the courier is waiting before confirming your order."
    ]
  },
  {
    title: "Conditions",
    content: [
      "Please make sure items are returned in their original condition, unused, with all tags attached, and in the same condition they were delivered.",
      "Kindly note: Returns or exchanges will not be accepted if the product or receipt (ticket) is missing, damaged, or not in its original delivery condition."
    ]
  },
  {
    title: "Need Help?",
    content: [
      "If you need any help, our team is always here for you!"
    ],
    contact: [
      { label: "Email", value: "care@setsociety.com" }
    ]
  }
];

export default function ReturnRefundPage() {
  return (
    <div className="pt-28 pb-32">
      {/* Hero */}
      <section className="px-6 md:px-12 max-w-[1920px] mx-auto mb-20">
        <AnimatedSection>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold mb-2">
            CUSTOMER CARE
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-primary mb-4">
            Returns & Refunds
          </h1>
          <p className="text-sm md:text-base leading-[1.8] text-on-surface-variant max-w-2xl">
            We believe in the quality of every garment that leaves our atelier. Your satisfaction is our highest commitment.
          </p>
          <div className="pt-6">
            <span className="font-script text-3xl text-primary">Your satisfaction, guaranteed.</span>
          </div>
        </AnimatedSection>
      </section>

      {/* Policy Sections */}
      <div className="space-y-0">
        {SECTIONS.map((section, sectionIndex) => (
          <section
            key={section.title}
            className={`py-20 px-6 md:px-12 ${
              sectionIndex % 2 === 0 ? "bg-surface" : "bg-surface-container"
            }`}
          >
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="font-serif text-6xl text-primary/10">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-primary">
                    {section.title}
                  </h2>
                </div>
              </AnimatedSection>

              {/* Paragraphs */}
              {section.content?.map((paragraph, i) => (
                <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                  <p className="text-sm md:text-base leading-[1.9] text-on-surface-variant mb-6">
                    {paragraph}
                  </p>
                </AnimatedSection>
              ))}

              {/* Bullet list */}
              {section.items && (
                <div className="space-y-3 mt-4">
                  {section.items.map((item, i) => (
                    <AnimatedSection key={i} delay={0.05 * (i + 1)}>
                      <div className="flex items-start gap-3">
                        <span className="text-primary/30 mt-0.5">✦</span>
                        <p className="text-sm leading-[1.8] text-on-surface-variant">{item}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}

              {/* Steps */}
              {section.steps && (
                <div className="space-y-10 mt-8">
                  {section.steps.map((step, i) => (
                    <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                      <div className="flex gap-6">
                        <span className="font-serif text-3xl text-primary/20 shrink-0 leading-none pt-1">
                          {step.number}
                        </span>
                        <div className="space-y-2">
                          <h4 className="font-serif text-lg uppercase tracking-tight text-primary">
                            {step.title}
                          </h4>
                          <p className="text-sm leading-[1.8] text-on-surface-variant">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}

              {/* Details table */}
              {section.details && (
                <div className="mt-8 border border-primary/10">
                  {section.details.map((detail, i) => (
                    <AnimatedSection key={i} delay={0.05 * (i + 1)}>
                      <div
                        className={`flex justify-between items-center px-6 py-4 ${
                          i !== section.details!.length - 1 ? "border-b border-primary/10" : ""
                        }`}
                      >
                        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-on-surface-variant font-medium">
                          {detail.label}
                        </span>
                        <span className="text-sm text-primary font-medium">{detail.value}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}

              {/* Contact info */}
              {section.contact && (
                <div className="mt-8 bg-primary/5 p-8 space-y-4">
                  {section.contact.map((info, i) => (
                    <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                      <div className="flex items-center gap-4">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-on-surface-variant font-semibold w-20">
                          {info.label}
                        </span>
                        <span className="text-sm text-primary">{info.value}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl leading-tight"
          >
            Still Have Questions?
          </motion.h3>
          <p className="text-sm opacity-70">
            Our Atelier Care team is here to help with any concerns.
          </p>
          <motion.a
            href="mailto:care@setsociety.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 border border-white/20 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-colors"
          >
            Contact Us <ArrowRight size={14} />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
