import { Phone, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

export default function FinalCTA() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 lg:py-36 bg-charcoal-dark text-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-sage blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-sage-light blur-3xl" />
      </div>

      <div ref={ref} className={`max-w-3xl mx-auto px-6 text-center relative reveal ${visible ? 'is-visible' : ''}`}>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ivory mb-6 leading-tight text-balance">
          Masz dość sprzątania?
          <br />
          <span className="italic font-medium">Oddaj je nam.</span>
        </h2>
        <p className="text-ivory/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Skontaktuj się z nami i ustal zakres oraz dogodny termin sprzątania.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={open} className="btn-light">
            Zamów sprzątanie
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
          <a href={BUSINESS.phoneHref} className="btn-ghost-light">
            <Phone size={16} strokeWidth={1.5} />
            Zadzwoń: {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
