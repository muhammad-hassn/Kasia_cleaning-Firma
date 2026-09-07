import { FEATURES, WHY_IMAGE } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function WhyChooseUs() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 lg:py-32 bg-beige">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className={`reveal reveal-left ${visible ? 'is-visible' : ''}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={WHY_IMAGE}
                alt="Czyste, minimalistyczne wnętrze w stylu skandynawskim"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features */}
          <div className={`reveal reveal-right ${visible ? 'is-visible' : ''}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Dlaczego Kasia_cleaning?</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal mb-10 text-balance leading-tight">
              Czystość, którą widać. Obsługa, której można zaufać.
            </h2>

            <div className="space-y-8">
              {FEATURES.map((feature) => (
                <div key={feature.num} className="flex gap-6 group">
                  <span className="font-heading text-3xl text-sage/60 shrink-0 w-12 step-number">
                    {feature.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-charcoal mb-1">{feature.title}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
