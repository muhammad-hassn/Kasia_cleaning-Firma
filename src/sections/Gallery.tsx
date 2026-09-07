import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GALLERY } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

const ASYMMETRIC = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  'lg:col-span-2',
  '',
  '',
];

export default function Gallery() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const showNext = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % GALLERY.length)), []);
  const showPrev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLightbox, showNext, showPrev]);

  return (
    <section className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Galeria</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-charcoal mb-4 text-balance">
            Zobacz efekt naszej pracy.
          </h2>
          <p className="text-charcoal/60 text-lg">
            Porządek, świeżość i dbałość o szczegóły.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-3 lg:gap-4 lg:h-[700px]">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`gallery-img relative overflow-hidden cursor-pointer reveal ${visible ? 'is-visible' : ''} ${ASYMMETRIC[i] || ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover min-h-[180px] lg:min-h-0"
              />
              <div className="absolute inset-0 bg-charcoal/0 hover:bg-charcoal/30 transition-colors duration-400 flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-ivory text-sm tracking-wide flex items-center gap-2">
                  <ZoomIn size={18} strokeWidth={1.5} />
                  Zobacz
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={open} className="btn-primary">
            Zapytaj o sprzątanie
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] bg-charcoal/90 backdrop-blur-sm flex items-center justify-center modal-overlay"
          onClick={closeLightbox}
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart === null) return;
            const diff = touchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { if (diff > 0) showNext(); else showPrev(); }
            setTouchStart(null);
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-ivory/80 hover:text-ivory transition-colors z-10"
            aria-label="Zamknij"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-3 sm:left-6 text-ivory/80 hover:text-ivory transition-colors"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-w-[90%] max-h-[85vh] object-contain modal-panel"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-3 sm:right-6 text-ivory/80 hover:text-ivory transition-colors"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ivory/50 text-sm">
            {lightbox + 1} / {GALLERY.length}
          </p>
        </div>
      )}
    </section>
  );
}
