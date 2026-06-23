import React from 'react';
import { Mail, Check, Gift } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="newsletter-section" className="py-12 sm:py-24 bg-white text-black select-none relative overflow-hidden font-sans border-b border-neutral-200">
      
      {/* Visual glowing elements representing abstract modern boutique shadows */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#FF2B85]/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-neutral-100 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Abstract logo item */}
        <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center mx-auto mb-6 bg-neutral-50">
          <Mail className="w-5 h-5 text-[#FF2B85]" />
        </div>

        <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF2B85] uppercase block mb-3 font-semibold">
          ÚNETE AL COLECTIVO / ACCESO ANTICIPADO
        </span>

        <h2 className="text-3xl sm:text-5xl font-display text-black uppercase font-black tracking-tight max-w-2xl mx-auto leading-none">
          RECIBE NOTIFICACIONES DE NUEVOS "DROPS" E INVITACIONES PRIVADAS.
        </h2>

        <p className="text-xs text-neutral-600 mt-5 max-w-md mx-auto leading-relaxed font-light">
          Nuestras sudaderas pesadas se fabrican bajo demanda regulada limitando existencias. Suscríbete para gozar de 24 horas de acceso priorizado antes de los lanzamientos oficiales en Instagram.
        </p>

        {/* Form and successes container */}
        <div className="mt-10 max-w-md mx-auto">
          {status !== 'success' ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="INTRODUCE TU CORREO ELECTRÓNICO"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                className="flex-1 bg-neutral-50 border border-neutral-200 font-mono text-center sm:text-left text-xs tracking-wider px-4 py-3.5 focus:border-[#FF2B85] focus:outline-none focus:bg-white text-black placeholder:text-neutral-400 rounded-none uppercase"
                id="newsletter-email-input"
              />
              <button
                type="submit"
                className="bg-black hover:bg-[#FF2B85] text-white hover:text-white transition-all duration-300 font-mono text-xs font-semibold tracking-widest px-8 py-3.5 uppercase active:scale-95 rounded-none cursor-pointer"
                id="newsletter-subscribe-btn"
              >
                Suscribirse
              </button>
            </form>
          ) : (
            <div className="bg-neutral-50 p-6 border-2 border-dashed border-[#FF2B85]/60 text-center space-y-4">
              <div className="w-10 h-10 bg-pink-50 text-[#FF2B85] rounded-full flex items-center justify-center mx-auto border border-[#FF2B85]/20">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-[#FF2B85] uppercase tracking-widest font-semibold">⚡ ¡Suscripción confirmada!</p>
                <p className="text-[10px] text-neutral-650 mt-1">Has activado tu acceso prioritario. Tu cupón de bienvenida exclusiva del 15% es:</p>
              </div>
              
              {/* Promo code badge copyable */}
              <div className="bg-white p-3 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-black border border-neutral-200 max-w-xs mx-auto gap-2">
                <span className="flex items-center gap-1.5 font-bold tracking-widest text-[#FF2B85]">
                  <Gift className="w-4 h-4 text-[#FF2B85]" />
                  <span>WELCOME15</span>
                </span>
                <span 
                  onClick={handleCopyCode}
                  className="text-[9px] text-neutral-500 hover:text-[#FF2B85] cursor-pointer underline hover:no-underline"
                >
                  {copied ? '¡Copiado!' : 'Copiar Código'}
                </span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <p className="text-[10px] font-mono text-[#FF2B85] mt-2">
              ⚠️ Introduce una dirección de correo válida para suscribirte.
            </p>
          )}
        </div>

        {/* Data protection warning */}
        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider mt-6">
          🔒 Conservamos tus datos de forma privada. De suscripción reversible en un click.
        </p>

      </div>

    </section>
  );
}
