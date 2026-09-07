import { ABOUT_IMAGE, FEATURES, BUSINESS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';
import { Phone } from 'lucide-react';

export default function AboutPage() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();

  return (
    <div className="bg-ivory">
      {/* Hero */}
      <div className="pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div ref={ref} className={`max-w-3xl reveal ${visible ? 'is-visible' : ''}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">O nas</p>
            <h1 className="font-heading text-5xl lg:text-6xl text-charcoal mb-6 text-balance leading-tight">
              Więcej niż sprzątanie.
            </h1>
            <p className="text-charcoal/70 text-lg lg:text-xl leading-relaxed">
              Porządek w domu to nie tylko czyste powierzchnie. To więcej czasu, komfort i spokój na co dzień.
            </p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="max-w-editorial mx-auto px-6 lg:px-10 mb-24">
        <div className={`reveal reveal-scale ${visible ? 'is-visible' : ''}`}>
          <img
            src={ABOUT_IMAGE}
            alt="Jasny, nowoczesny salon z czystą estetyką"
            loading="lazy"
            className="w-full h-[400px] lg:h-[520px] object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="bg-beige py-24 lg:py-32">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-heading text-4xl lg:text-5xl text-charcoal mb-6 text-balance leading-tight">
                Czystość, którą widać. Obsługa, której można zaufać.
              </h2>
              <p className="text-charcoal/60 text-base leading-relaxed mb-8">
                {BUSINESS.fullName} to lokalna firma sprzątająca, dla której najważniejszy jest zadowolony klient.
                Każde zlecenie traktujemy indywidualnie — dopasowując zakres i termin do Twoich potrzeb.
              </p>
              <button onClick={open} className="btn-primary">
                Zamów sprzątanie
              </button>
            </div>

            <div className="space-y-8">
              {FEATURES.map((feature) => (
                <div key={feature.num} className="flex gap-6">
                  <span className="font-heading text-3xl text-sage/60 shrink-0 w-12">{feature.num}</span>
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

      {/* CTA */}
      <div className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl lg:text-4xl text-charcoal mb-4 text-balance">
            Gotowy na czysty dom?
          </h2>
          <p className="text-charcoal/60 mb-8">Zadzwoń lub zarezerwuj sprzątanie online.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={open} className="btn-primary">Zamów sprzątanie</button>
            <a href={BUSINESS.phoneHref} className="btn-outline">
              <Phone size={16} strokeWidth={1.5} />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
