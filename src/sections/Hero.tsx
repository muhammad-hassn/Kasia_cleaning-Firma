import { Phone, Star, MapPin, ArrowRight } from 'lucide-react';
import { BUSINESS, HERO_IMAGE } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { navigate } from '@/hooks/useRouter';

export default function Hero() {
  const { open } = useBooking();

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background with parallax */}
      <div
        id="hero-bg"
        className="absolute inset-0 hero-bg-anim"
        style={{ willChange: 'transform' }}
      >
        <img
          src={HERO_IMAGE}
          alt="Jasne, czyste wnętrze mieszkania z naturalnym światłem"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center max-w-editorial mx-auto px-6 lg:px-10 pt-20">
        <div className="max-w-3xl">
          <p className="hero-eyebrow text-ivory/80 text-xs sm:text-sm tracking-[0.25em] uppercase mb-5">
            Profesjonalne sprzątanie
          </p>

          <h1 className="font-heading text-ivory text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] mb-6">
            <span className="hero-line block">Czysty dom.</span>
            <span className="hero-line hero-line-2 block italic font-medium">Spokojniejszy dzień.</span>
          </h1>

          <p className="hero-text text-ivory/85 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            Profesjonalne sprzątanie mieszkań i domów. Ty odpoczywasz — my zajmujemy się resztą.
          </p>

          <div className="hero-text flex items-center gap-2 text-ivory/70 text-sm mb-8">
            <MapPin size={16} strokeWidth={1.5} />
            Obsługujemy klientów w Polsce
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button onClick={open} className="hero-btn hero-btn-1 btn-light">
              Zamów sprzątanie
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate('/uslugi')} className="hero-btn hero-btn-2 btn-ghost-light">
              Zobacz usługi
            </button>
          </div>

          {/* Trust badge */}
          <div className="hero-rating flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#faf8f4" stroke="#faf8f4" strokeWidth={0} />
              ))}
            </div>
            <span className="text-ivory text-sm font-medium">5.0 Google</span>
            <span className="text-ivory/60 text-sm">6 opinii klientów</span>
          </div>

          {/* Phone CTA */}
          <div className="hero-phone flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 text-ivory hover:text-white transition-colors group"
            >
              <Phone size={18} strokeWidth={1.5} className="text-sage-light group-hover:scale-110 transition-transform" />
              <span className="font-heading text-xl sm:text-2xl">{BUSINESS.phone}</span>
            </a>
            <span className="text-ivory/30">|</span>
            <a
              href={BUSINESS.phoneHref}
              className="text-ivory/80 hover:text-ivory text-sm link-underline transition-colors"
            >
              Zadzwoń teraz
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hero-phone">
        <div className="w-px h-12 bg-ivory/40 mx-auto relative overflow-hidden">
          <div className="absolute top-0 w-full h-4 bg-ivory animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
