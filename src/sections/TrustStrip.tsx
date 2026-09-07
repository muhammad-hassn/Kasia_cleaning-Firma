import { Star } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const ITEMS = [
  { value: '5.0 / 5', label: 'Google' },
  { value: '6', label: 'opinii' },
  { value: 'Profesjonalna', label: 'obsługa' },
  { value: 'Łatwy', label: 'kontakt' },
];

export default function TrustStrip() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className={`bg-charcoal py-8 reveal ${visible ? 'is-visible' : ''}`}>
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#a3b394" stroke="#a3b394" strokeWidth={0} />
            ))}
          </div>
          {ITEMS.map((item, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-heading text-xl text-ivory">{item.value}</span>
              <span className="text-ivory/50 text-sm tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
