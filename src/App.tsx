import { useEffect } from 'react';
import { BookingProvider, useBooking } from '@/context/BookingContext';
import { useRouter } from '@/hooks/useRouter';
import { usePageMeta } from '@/hooks/usePageMeta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import FloatingCall from '@/components/FloatingCall';
import BookingModal from '@/components/BookingModal';
import PageShell from '@/components/PageShell';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ReviewsPage from '@/pages/ReviewsPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';

const PAGES: Record<string, React.ComponentType> = {
  '/': HomePage,
  '/uslugi': ServicesPage,
  '/o-nas': AboutPage,
  '/opinie': ReviewsPage,
  '/kontakt': ContactPage,
  '/faq': FAQPage,
};

function AppContent() {
  const { route } = useRouter();
  const { isOpen } = useBooking();
  usePageMeta(route.path);

  const PageComponent = PAGES[route.path] || HomePage;

  // Handle hash links to sections (e.g. /#jak-to-dziala)
  useEffect(() => {
    if (route.hash) {
      setTimeout(() => {
        const el = document.getElementById(route.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [route.hash, route.path]);

  // Parallax effect for hero background
  useEffect(() => {
    if (route.path !== '/') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onScroll = () => {
      const bg = document.getElementById('hero-bg');
      if (!bg) return;
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        bg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1.06 + scrolled * 0.0002})`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [route.path]);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <PageShell route={route}>
          <PageComponent />
        </PageShell>
      </main>
      <Footer />
      <FloatingCall />
      {isOpen && <BookingModal />}
    </>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
