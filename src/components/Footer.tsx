import { Phone, Clock, MapPin } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { navigate } from '@/hooks/useRouter';

export default function Footer() {
  const { open } = useBooking();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-editorial mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-heading text-2xl mb-1">{BUSINESS.brand}</h3>
            <p className="text-ivory/50 text-sm tracking-wide mb-4">Firma sprzątająca</p>
            <p className="text-ivory/70 text-sm leading-relaxed max-w-xs">
              Profesjonalne sprzątanie i więcej czasu dla Ciebie.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-ivory/40 mb-5">Nawigacja</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="link-underline text-ivory/80 hover:text-ivory text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-ivory/40 mb-5">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={BUSINESS.phoneHref} className="flex items-center gap-3 text-ivory/80 hover:text-ivory transition-colors">
                  <Phone size={16} strokeWidth={1.5} />
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ivory/80">
                <Clock size={16} strokeWidth={1.5} />
                {BUSINESS.hours}
              </li>
              <li className="flex items-center gap-3 text-ivory/80">
                <MapPin size={16} strokeWidth={1.5} />
                {BUSINESS.location}
              </li>
            </ul>
            <button onClick={open} className="btn-light mt-6 text-xs px-5 py-2.5">
              Zamów sprzątanie
            </button>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs">© 2026 {BUSINESS.brand}</p>
          <p className="text-ivory/40 text-xs">{BUSINESS.fullName}</p>
        </div>
      </div>
    </footer>
  );
}
