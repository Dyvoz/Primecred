const WA_NUMBER = '5522988449328'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative bg-slate-950 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Crédito aprovado em até 24 horas
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Crédito rápido,{' '}
            <span className="text-amber-400">seguro</span> e{' '}
            <span className="text-amber-400">transparente</span> para você
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
            Realizamos o seu sonho com as melhores taxas do mercado. Atendimento
            personalizado, sem burocracia e com total segurança para você e sua
            família.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-amber-400/20"
            >
              Simular agora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Ol%C3%A1%21+Tenho+interesse+em+cr%C3%A9dito+e+gostaria+de+mais+informa%C3%A7%C3%B5es.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/40 text-green-400 font-bold text-base px-8 py-4 rounded-xl transition-colors"
            >
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { icon: '🔒', label: '100% Seguro' },
              { icon: '⚡', label: 'Aprovação Rápida' },
              { icon: '💰', label: 'Menores Taxas' },
              { icon: '🤝', label: 'Sem Burocracia' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-slate-400">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
