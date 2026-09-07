import { useState } from 'react';
import { Phone, Clock, MapPin, Check, ArrowRight } from 'lucide-react';
import { BUSINESS, SERVICE_TYPES } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function ContactSection() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Podaj imię';
    if (!form.phone.trim()) errs.phone = 'Podaj numer telefonu';
    else if (form.phone.replace(/\s/g, '').length < 7) errs.phone = 'Nieprawidłowy numer telefonu';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Nieprawidłowy adres e-mail';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    }, 4000);
  };

  const update = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-beige">
      <div ref={ref} className={`max-w-editorial mx-auto px-6 lg:px-10 reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-sage-dark mb-4">Kontakt</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal mb-6 text-balance leading-tight">
              Porozmawiajmy o czystym domu.
            </h2>
            <p className="text-charcoal/60 text-lg mb-10 leading-relaxed max-w-md">
              Skontaktuj się z nami telefonicznie lub przez formularz — pomożemy ustalić zakres i termin usługi.
            </p>

            <div className="space-y-6">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center shrink-0 group-hover:bg-sage-dark transition-colors">
                  <Phone size={18} strokeWidth={1.5} className="text-ivory" />
                </div>
                <div>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wide">Telefon</p>
                  <p className="font-heading text-xl text-charcoal group-hover:text-sage-dark transition-colors">{BUSINESS.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-beige border border-charcoal/10 flex items-center justify-center shrink-0">
                  <Clock size={18} strokeWidth={1.5} className="text-charcoal/60" />
                </div>
                <div>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wide">Godziny</p>
                  <p className="text-charcoal">{BUSINESS.hours}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-beige border border-charcoal/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} strokeWidth={1.5} className="text-charcoal/60" />
                </div>
                <div>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wide">Obszar</p>
                  <p className="text-charcoal">{BUSINESS.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-ivory p-8 lg:p-10 border border-charcoal/5 shadow-sm">
            {sent ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 mb-6">
                  <Check size={32} strokeWidth={2} className="text-sage-dark" />
                </div>
                <h3 className="font-heading text-2xl text-charcoal mb-3">Dziękujemy!</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed max-w-xs mx-auto">
                  Otrzymaliśmy Twoje zapytanie. Skontaktujemy się z Tobą w celu ustalenia szczegółów.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h3 className="font-heading text-2xl text-charcoal mb-2">Formularz kontaktowy</h3>

                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">Imię *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
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
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
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
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`w-full px-4 py-3 border bg-white text-charcoal focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400' : 'border-charcoal/15 focus:border-sage'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">Rodzaj usługi</label>
                  <select
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal/15 bg-white text-charcoal focus:border-sage focus:outline-none transition-colors"
                  >
                    <option value="">Wybierz usługę...</option>
                    {SERVICE_TYPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-charcoal/70 mb-1.5">Wiadomość</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-charcoal/15 bg-white text-charcoal focus:border-sage focus:outline-none transition-colors resize-none"
                    placeholder="Dodatkowe informacje..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Wyślij zapytanie
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
