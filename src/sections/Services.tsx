import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

export default function Services() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();

  return (
    <section id="uslugi" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`reveal mb-16 ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Usługi</p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal max-w-3xl text-balance mb-4">
            Sprzątanie dopasowane do Twoich potrzeb.
          </h2>
          <p className="text-charcoal/60 text-lg max-w-xl">
            Wybierz usługę, a my zadbamy o resztę.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              className={`group reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden bg-beige aspect-[4/3] mb-5 cursor-pointer" onClick={open}>
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-elegant group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-400" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-2xl text-charcoal mb-2">{service.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{service.description}</p>
                </div>
                <button
                  onClick={open}
                  className="shrink-0 mt-1 text-charcoal/40 group-hover:text-charcoal transition-all duration-300 group-hover:translate-x-1"
                  aria-label={`Zapytaj o usługę: ${service.title}`}
                >
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={open}
                className="link-underline text-sm text-sage-dark mt-4 inline-flex items-center gap-1.5"
              >
                Zapytaj o usługę
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </article>
          ))}

          {/* CTA card */}
          <article
            className={`group reveal ${visible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${SERVICES.length * 100}ms` }}
          >
            <div className="bg-charcoal aspect-[4/3] mb-5 flex items-center justify-center p-8">
              <p className="font-heading text-ivory text-2xl text-center leading-snug">
                Nie wiesz, którą usługę wybrać?
              </p>
            </div>
            <h3 className="font-heading text-2xl text-charcoal mb-2">Porozmawiaj z nami</h3>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
              Pomożemy Ci dobrać odpowiedni zakres sprzątania.
            </p>
            <button onClick={open} className="link-underline text-sm text-sage-dark inline-flex items-center gap-1.5">
              Skontaktuj się
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
