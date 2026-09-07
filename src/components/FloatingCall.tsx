import { Phone } from 'lucide-react';
import { BUSINESS } from '@/data/content';

export default function FloatingCall() {
  return (
    <>
      {/* Mobile: full floating call button */}
      <a
        href={BUSINESS.phoneHref}
        className="sm:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-charcoal text-ivory px-5 py-3.5 rounded-full shadow-lg call-pulse"
        aria-label="Zadzwoń teraz"
      >
        <Phone size={18} strokeWidth={2} />
        <span className="text-sm font-medium">Zadzwoń</span>
      </a>

      {/* Desktop: small floating widget */}
      <a
        href={BUSINESS.phoneHref}
        className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 bg-ivory/90 backdrop-blur-md border border-charcoal/10 text-charcoal px-4 py-3 rounded-full shadow-[0_4px_24px_rgba(43,40,38,0.12)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(43,40,38,0.18)] transition-all duration-300"
        aria-label="Zadzwoń teraz"
      >
        <Phone size={16} strokeWidth={1.8} className="text-sage-dark" />
        <span className="text-sm font-medium">{BUSINESS.phone}</span>
      </a>
    </>
  );
}
