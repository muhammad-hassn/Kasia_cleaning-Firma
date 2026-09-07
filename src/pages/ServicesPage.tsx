import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

export default function ServicesPage() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();

  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-ivory">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Usługi</p>
          <h1 className="font-heading text-5xl lg:text-6xl text-charcoal mb-6 text-balance leading-tight">
            Sprzątanie dopasowane do Twoich potrzeb.
          </h1>
          <p className="text-charcoal/60 text-lg max-w-xl">
            Wybierz usługę, a my zadbamy o resztę. Zapytaj o dostępność wybranej usługi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              className={`group reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden bg-beige aspect-[4/3] mb-6 cursor-pointer" onClick={open}>
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-elegant group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-3xl text-charcoal mb-3">{service.title}</h2>
                  <p className="text-charcoal/60 text-base leading-relaxed">{service.description}</p>
                  <p className="text-charcoal/40 text-sm mt-3 italic">Zapytaj o dostępność usługi.</p>
                </div>
                <button
                  onClick={open}
                  className="shrink-0 mt-1 text-charcoal/40 group-hover:text-charcoal transition-all duration-300 group-hover:translate-x-1"
                  aria-label={`Zapytaj o usługę: ${service.title}`}
                >
                  <ArrowUpRight size={24} strokeWidth={1.5} />
                </button>
              </div>
              <button onClick={open} className="link-underline text-sm text-sage-dark mt-5 inline-flex items-center gap-1.5">
                Zapytaj o usługę
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
