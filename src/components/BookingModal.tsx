import { useEffect, useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { SERVICE_TYPES, AREA_TYPES, TIME_SLOTS } from '@/data/content';

const STEPS = ['service', 'area', 'schedule', 'details', 'success'] as const;
type Step = typeof STEPS[number];

export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const [step, setStep] = useState<number>(0);
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setStep(0);
        setService(''); setArea(''); setDate(''); setTime('');
        setName(''); setPhone(''); setEmail(''); setMessage('');
        setErrors({});
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const currentStep = STEPS[step];
  const progress = ((step) / (STEPS.length - 1)) * 100;

  const canProceed = () => {
    if (currentStep === 'service') return !!service;
    if (currentStep === 'area') return !!area;
    if (currentStep === 'schedule') return !!date && !!time;
    if (currentStep === 'details') {
      const errs: Record<string, string> = {};
      if (!name.trim()) errs.name = 'Podaj imię';
      if (!phone.trim()) errs.phone = 'Podaj numer telefonu';
      else if (phone.replace(/\s/g, '').length < 7) errs.phone = 'Nieprawidłowy numer telefonu';
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Nieprawidłowy adres e-mail';
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    return true;
  };

  const next = () => {
    if (!canProceed()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center modal-overlay"
      onClick={close}
    >
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

      <div
        className="modal-panel relative bg-ivory w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-ivory/95 backdrop-blur-sm px-6 sm:px-10 pt-6 pb-4 border-b border-charcoal/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl sm:text-2xl text-charcoal">
              {currentStep === 'success' ? 'Dziękujemy!' : 'Zamów sprzątanie'}
            </h2>
            <button onClick={close} className="text-charcoal/60 hover:text-charcoal transition-colors p-1" aria-label="Zamknij">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          {currentStep !== 'success' && (
            <div className="flex items-center gap-2">
              {STEPS.slice(0, 4).map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? 'bg-sage' : 'bg-charcoal/10'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 sm:px-10 py-8">
          {/* Step 1: Service type */}
          {currentStep === 'service' && (
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-sage-dark mb-2">Krok 1 z 4</p>
              <h3 className="font-heading text-2xl text-charcoal mb-6">Jakiego sprzątania potrzebujesz?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_TYPES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    className={`text-left px-5 py-4 border transition-all duration-300 ${
                      service === s
                        ? 'border-sage bg-sage/10 text-charcoal'
                        : 'border-charcoal/15 hover:border-charcoal/40 text-charcoal/80'
                    }`}
                  >
                    <span className="text-sm font-medium">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Area */}
          {currentStep === 'area' && (
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-sage-dark mb-2">Krok 2 z 4</p>
              <h3 className="font-heading text-2xl text-charcoal mb-6">Jaka jest powierzchnia?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AREA_TYPES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setArea(a)}
                    className={`text-left px-5 py-4 border transition-all duration-300 ${
                      area === a
                        ? 'border-sage bg-sage/10 text-charcoal'
                        : 'border-charcoal/15 hover:border-charcoal/40 text-charcoal/80'
                    }`}
                  >
                    <span className="text-sm font-medium">{a}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 'schedule' && (
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-sage-dark mb-2">Krok 3 z 4</p>
              <h3 className="font-heading text-2xl text-charcoal mb-6">Kiedy chcesz zarezerwować usługę?</h3>
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm text-charcoal/70 mb-2">
                  <Calendar size={16} strokeWidth={1.5} />
                  Data
                </label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal/15 bg-white text-charcoal focus:border-sage focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-charcoal/70 mb-3">
                  <Clock size={16} strokeWidth={1.5} />
                  Godzina
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`px-3 py-3 border text-sm transition-all duration-300 ${
                        time === t
                          ? 'border-sage bg-sage/10 text-charcoal font-medium'
                          : 'border-charcoal/15 hover:border-charcoal/40 text-charcoal/80'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Details */}
          {currentStep === 'details' && (
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-sage-dark mb-2">Krok 4 z 4</p>
              <h3 className="font-heading text-2xl text-charcoal mb-6">Twoje dane</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">Imię *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 border bg-white text-charcoal focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400' : 'border-charcoal/15 focus:border-sage'
                    }`}
                    placeholder="Twoje imię"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">Telefon *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-3 border bg-white text-charcoal focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-400' : 'border-charcoal/15 focus:border-sage'
                    }`}
                    placeholder="+48 ..."
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 border bg-white text-charcoal focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400' : 'border-charcoal/15 focus:border-sage'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">Wiadomość / dodatkowe informacje</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-charcoal/15 bg-white text-charcoal focus:border-sage focus:outline-none transition-colors resize-none"
                    placeholder="Dodatkowe informacje..."
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-beige/60 border border-charcoal/5">
                <p className="text-xs tracking-[0.12em] uppercase text-charcoal/40 mb-2">Podsumowanie</p>
                <div className="text-sm text-charcoal/80 space-y-1">
                  <p>Usługa: <span className="font-medium text-charcoal">{service}</span></p>
                  <p>Powierzchnia: <span className="font-medium text-charcoal">{area}</span></p>
                  {date && <p>Data: <span className="font-medium text-charcoal">{date}</span></p>}
                  {time && <p>Godzina: <span className="font-medium text-charcoal">{time}</span></p>}
                </div>
              </div>
            </div>
          )}

          {/* Success */}
          {currentStep === 'success' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 mb-6">
                <Check size={32} strokeWidth={2} className="text-sage-dark" />
              </div>
              <h3 className="font-heading text-3xl text-charcoal mb-3">Dziękujemy!</h3>
              <p className="text-charcoal/70 max-w-sm mx-auto leading-relaxed">
                Otrzymaliśmy Twoje zapytanie. Skontaktujemy się z Tobą w celu ustalenia szczegółów.
              </p>
              <button onClick={close} className="btn-primary mt-8">
                Zamknij
              </button>
            </div>
          )}
        </div>

        {/* Footer / Navigation */}
        {currentStep !== 'success' && (
          <div className="sticky bottom-0 bg-ivory border-t border-charcoal/5 px-6 sm:px-10 py-4 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 text-sm transition-opacity ${
                step === 0 ? 'opacity-0 pointer-events-none' : 'text-charcoal/70 hover:text-charcoal'
              }`}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Wstecz
            </button>
            <button onClick={next} className="btn-primary">
              {currentStep === 'details' ? 'Wyślij zapytanie' : 'Dalej'}
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
