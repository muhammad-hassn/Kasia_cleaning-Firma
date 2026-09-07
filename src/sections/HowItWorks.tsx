import { STEPS } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function HowItWorks() {
  const { ref, visible } = useReveal();

  return (
    <section id="jak-to-dziala" className="py-24 lg:py-32 bg-charcoal text-ivory">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-light mb-4">Proces</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-ivory">Jak to działa?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative">
          {/* Horizontal line on desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-ivory/15" />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`relative reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative mb-6">
                <span className="font-heading text-5xl text-ivory/90 step-number relative z-10 bg-charcoal pr-4">
                  {step.num}
                </span>
              </div>
              <h3 className="font-heading text-xl text-ivory leading-snug max-w-[200px]">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
