import { useEffect, useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';
import { REVIEWS, BUSINESS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Kasia_cleaning+Firma+sprz%C4%85taj%C4%85ca';

export default function Reviews() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      setPerView(window.innerWidth < 768 ? 1 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - perView);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
    setTouchStart(null);
  };

  return (
    <section id="opinie" className="py-24 lg:py-32 bg-beige">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-12 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Opinie Google</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-charcoal mb-6 text-balance">
            Klienci już nam zaufali.
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#8a9a7b" stroke="#8a9a7b" strokeWidth={0} />
              ))}
            </div>
            <span className="font-heading text-2xl text-charcoal">5.0</span>
            <span className="text-charcoal/50 text-sm">6 opinii Google</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className="carousel-track flex"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="shrink-0 px-3"
                style={{ width: `${100 / perView}%` }}
              >
                <div className="bg-ivory border border-charcoal/5 p-8 lg:p-10 h-full flex flex-col">
                  <Quote size={28} strokeWidth={1} className="text-sage/40 mb-4" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={14} fill="#8a9a7b" stroke="#8a9a7b" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-charcoal/80 text-base leading-relaxed flex-1 italic">
                    "{review.text}"
                  </p>
                  {review.note && (
                    <p className="text-charcoal/30 text-xs mt-4 italic">{review.note}</p>
                  )}
                  <div className="mt-6 pt-6 border-t border-charcoal/5">
                    <p className="font-heading text-lg text-charcoal">{review.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 border border-charcoal/20 flex items-center justify-center text-charcoal/70 hover:border-charcoal hover:text-charcoal transition-all"
            aria-label="Poprzednia opinia"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setPaused(true); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-charcoal' : 'w-1.5 bg-charcoal/25'
                }`}
                aria-label={`Przejdź do opinii ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-charcoal/20 flex items-center justify-center text-charcoal/70 hover:border-charcoal hover:text-charcoal transition-all"
            aria-label="Następna opinia"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Zobacz opinie w Google
            <ExternalLink size={15} strokeWidth={1.5} />
          </a>
          <button onClick={open} className="btn-primary">
            Zamów sprzątanie
          </button>
        </div>
      </div>
    </section>
  );
}
