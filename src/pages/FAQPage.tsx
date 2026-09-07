import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, BUSINESS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';
import { Phone } from 'lucide-react';

export default function FAQPage() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 lg:pt-40 pb-24 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-12 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">FAQ</p>
          <h1 className="font-heading text-5xl lg:text-6xl text-charcoal text-balance mb-4">
            Najczęstsze pytania
          </h1>
          <p className="text-charcoal/60 text-lg">
            Wszystko, co chcesz wiedzieć o naszych usługach sprzątania.
          </p>
        </div>

        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-charcoal/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="font-heading text-lg lg:text-xl text-charcoal">{item.question}</span>
                <span className="shrink-0 text-charcoal/40 group-hover:text-charcoal transition-colors">
                  {openIndex === i ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                </span>
              </button>
              <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                <div className="accordion-inner">
                  <p className="text-charcoal/60 text-base leading-relaxed pb-6 pr-10">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 p-12 bg-beige">
          <h2 className="font-heading text-3xl text-charcoal mb-4">Masz inne pytanie?</h2>
          <p className="text-charcoal/60 mb-8">Skontaktuj się z nami — chętnie odpowiemy.</p>
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
