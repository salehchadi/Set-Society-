import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleAccent?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  titleAccent,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={`space-y-2 ${align === "center" ? "text-center" : ""} ${className}`}>
      {label && (
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold">
          {label}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-primary">
        {title}
      </h2>
      {titleAccent && (
        <div className="pt-4">
          <span className="font-script text-4xl text-primary">{titleAccent}</span>
        </div>
      )}
    </AnimatedSection>
  );
}
