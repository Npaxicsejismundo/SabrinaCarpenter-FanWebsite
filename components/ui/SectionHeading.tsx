import type { ReactNode } from "react";
import { SplitReveal } from "./SplitReveal";

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className = "",
  titleClassName = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <p className="eyebrow text-muted">{eyebrow}</p>
      <SplitReveal
        as="h2"
        id={id}
        className={`font-display soft mt-3 text-display font-black ${titleClassName}`}
      >
        {title}
      </SplitReveal>
      {intro && <p className="mt-5 max-w-xl text-lede text-muted">{intro}</p>}
    </header>
  );
}
