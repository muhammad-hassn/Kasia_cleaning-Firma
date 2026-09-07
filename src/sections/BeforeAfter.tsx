import { useRef, useState, useCallback, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { BEFORE_IMAGE, AFTER_IMAGE } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const { ref, visible } = useReveal();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updateFromClientX(e.clientX); };
    const onTouch = (e: TouchEvent) => { if (dragging.current && e.touches[0]) updateFromClientX(e.touches[0].clientX); };
    const onUp = () => { dragging.current = false; };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
      if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onUp);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('keydown', onKey);
    };
  }, [updateFromClientX]);

  return (
    <section className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-12 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Przed / Po</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-charcoal text-balance">
            Zobacz różnicę na własne oczy.
          </h2>
        </div>

        <div
          ref={containerRef}
          className={`ba-slider aspect-[16/10] lg:aspect-[16/8] rounded-lg cursor-ew-resize reveal reveal-scale ${visible ? 'is-visible' : ''}`}
          onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; if (e.touches[0]) updateFromClientX(e.touches[0].clientX); }}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Przed i po sprzątaniu — przeciągnij, aby porównać"
        >
          {/* Before (full) */}
          <img src={BEFORE_IMAGE} alt="Wnętrze przed sprzątaniem" className="ba-img" loading="lazy" />
          <span className="ba-label left-4 z-10">PRZED</span>

          {/* After (clipped) */}
          <div className="ba-after-wrap" style={{ width: `${pos}%` }}>
            <img
              src={AFTER_IMAGE}
              alt="Wnętrze po sprzątaniu"
              className="ba-img"
              style={{ width: `${containerRef.current?.clientWidth || 1000}px` }}
              loading="lazy"
            />
            <span className="ba-label right-4" style={{ left: 'auto', right: '0.5rem' }}>PO</span>
          </div>

          {/* Handle */}
          <div className="ba-handle" style={{ left: `${pos}%` }}>
            <div className="ba-handle-grip">
              <MoveHorizontal size={20} strokeWidth={1.5} className="text-charcoal" />
            </div>
          </div>
        </div>

        <p className="text-center text-charcoal/40 text-sm mt-6">
          Przeciągnij suwak, aby porównać zdjęcia
        </p>
      </div>
    </section>
  );
}
