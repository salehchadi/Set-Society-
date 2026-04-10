import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";

const SECTIONS = [
  {
    title: "Return Policy",
    content: [
      "At Set Society, we want you to love every piece as much as we do. If for any reason you are not completely satisfied with your purchase, we offer a straightforward return process.",
      "Items may be returned within 14 days of delivery for a full refund to the original payment method. All items must be unworn, unwashed, and in their original packaging with all tags attached.",
    ],
  },
  {
    title: "Return Conditions",
    items: [
      "Items must be returned within 14 calendar days of the delivery date.",
      "All products must be in their original, unworn condition with tags attached.",
      "Items must be returned in their original packaging, including the Set Society garment bag.",
      "Intimates, swimwear, and personalized items are final sale and cannot be returned.",
      "Sale items marked as \"Final Sale\" are not eligible for returns or exchanges.",
      "Gift cards are non-refundable and cannot be returned for cash value.",
    ],
  },
  {
    title: "How to Return",
    steps: [
      {
        number: "01",
        title: "Initiate Your Return",
        description:
          "Contact our Atelier Care team at returns@setsociety.com with your order number and reason for return. You will receive a return authorization within 24 hours.",
      },
      {
        number: "02",
        title: "Prepare Your Package",
        description:
          "Place the item(s) in their original packaging with all tags attached. Include the return authorization slip provided by our team.",
      },
      {
        number: "03",
        title: "Ship Your Return",
        description:
          "Use the prepaid shipping label included in your return authorization email. Drop off the package at your nearest carrier location.",
      },
      {
        number: "04",
        title: "Receive Your Refund",
        description:
          "Once we receive and inspect your return, your refund will be processed within 5–7 business days to your original payment method.",
      },
    ],
  },
  {
    title: "Refund Timeline",
    content: [
      "Refunds are processed to the original payment method within 5–7 business days of receiving your return at our atelier. Please note that your financial institution may take an additional 3–5 business days to reflect the refund in your account.",
    ],
    details: [
      { label: "Credit/Debit Card", value: "5–10 business days" },
      { label: "PayPal", value: "3–5 business days" },
      { label: "Store Credit", value: "Instant upon approval" },
      { label: "Bank Transfer", value: "7–10 business days" },
    ],
  },
  {
    title: "Exchanges",
    content: [
      "We are happy to offer exchanges for different sizes or colors, subject to availability. To initiate an exchange, please contact our Atelier Care team. Exchanges follow the same 14-day window as returns.",
      "If the desired item is a different price than your original purchase, we will charge or refund the difference accordingly.",
    ],
  },
  {
    title: "Contact Our Atelier Care Team",
    content: [
      "Our dedicated team is available to assist you with any questions regarding returns, refunds, or exchanges. We are committed to making your experience seamless and pleasant.",
    ],
    contact: [
      { label: "Email", value: "care@setsociety.com" },
      { label: "WhatsApp", value: "+1 (555) SET-CARE" },
      { label: "Hours", value: "Monday – Friday, 9AM – 6PM EST" },
    ],
  },
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
