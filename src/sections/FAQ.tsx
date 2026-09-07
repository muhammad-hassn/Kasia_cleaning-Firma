import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

export default function FAQ() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-12 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">FAQ</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-charcoal text-balance">
            Najczęstsze pytania
          </h2>
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

        <div className="text-center mt-12">
          <p className="text-charcoal/50 text-sm mb-4">Nie znalazłeś odpowiedzi?</p>
          <button onClick={open} className="btn-primary">
            Zapytaj o sprzątanie
          </button>
        </div>
      </div>
    </section>
  );
}
