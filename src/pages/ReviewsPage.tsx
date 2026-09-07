import { Star, ExternalLink } from 'lucide-react';
import { REVIEWS, BUSINESS } from '@/data/content';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Kasia_cleaning+Firma+sprz%C4%85taj%C4%85ca';

export default function ReviewsPage() {
  const { open } = useBooking();
  const { ref, visible } = useReveal();

  return (
    <div className="pt-32 lg:pt-40 pb-24 bg-beige min-h-screen">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div ref={ref} className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Opinie Google</p>
          <h1 className="font-heading text-5xl lg:text-6xl text-charcoal mb-6 text-balance">
            Klienci już nam zaufali.
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="#8a9a7b" stroke="#8a9a7b" strokeWidth={0} />
              ))}
            </div>
            <span className="font-heading text-3xl text-charcoal">5.0</span>
            <span className="text-charcoal/50">6 opinii Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className={`bg-ivory border border-charcoal/5 p-8 flex flex-col reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={16} fill="#8a9a7b" stroke="#8a9a7b" strokeWidth={0} />
                ))}
              </div>
              <p className="text-charcoal/80 text-base leading-relaxed flex-1 italic mb-4">
                "{review.text}"
              </p>
              {review.note && (
                <p className="text-charcoal/30 text-xs italic mb-4">{review.note}</p>
              )}
              <div className="pt-4 border-t border-charcoal/5">
                <p className="font-heading text-lg text-charcoal">{review.author}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Zobacz opinie w Google
            <ExternalLink size={15} strokeWidth={1.5} />
          </a>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-charcoal text-ivory py-16 px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl mb-4">Dołącz do zadowolonych klientów.</h2>
          <p className="text-ivory/70 mb-8">Zamów sprzątanie i przekonaj się sam.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={open} className="btn-light">Zamów sprzątanie</button>
            <a href={BUSINESS.phoneHref} className="btn-ghost-light">Zadzwoń teraz</a>
          </div>
        </div>
      </div>
    </div>
  );
}
