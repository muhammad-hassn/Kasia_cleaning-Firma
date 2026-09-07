import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { navigate } from '@/hooks/useRouter';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/85 backdrop-blur-md shadow-[0_1px_30px_rgba(43,40,38,0.08)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-editorial mx-auto px-6 lg:px-10 flex items-center justify-between">
          <button
            onClick={() => handleNav('/')}
            className={`font-heading text-xl lg:text-2xl tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-charcoal' : 'text-ivory'
            }`}
          >
            {BUSINESS.brand}
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`link-underline text-sm tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-charcoal/80 hover:text-charcoal' : 'text-ivory/90 hover:text-ivory'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={open}
              className={`hidden sm:inline-flex btn-primary text-xs px-5 py-2.5 ${
                !scrolled && 'bg-ivory/95 text-charcoal hover:bg-ivory'
              }`}
            >
              Zamów sprzątanie
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden transition-colors ${scrolled ? 'text-charcoal' : 'text-ivory'}`}
              aria-label="Otwórz menu"
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[82%] max-w-sm bg-ivory flex flex-col transition-transform duration-400 ease-elegant ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
            <span className="font-heading text-xl text-charcoal">{BUSINESS.brand}</span>
            <button onClick={() => setMenuOpen(false)} className="text-charcoal" aria-label="Zamknij menu">
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-col px-6 py-6 gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="text-left text-lg font-heading text-charcoal py-3 border-b border-charcoal/5 hover:text-sage-dark transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-auto px-6 pb-8 flex flex-col gap-3">
            <button onClick={() => { setMenuOpen(false); open(); }} className="btn-primary w-full">
              Zamów sprzątanie
            </button>
            <a href={BUSINESS.phoneHref} className="btn-outline w-full">
              Zadzwoń teraz
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
