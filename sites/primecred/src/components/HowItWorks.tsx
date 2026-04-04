const steps = [
  {
    number: '01',
    title: 'Preencha o formulário',
    description:
      'Informe seus dados e o valor que precisa. Todo o processo é 100% online e seguro.',
  },
  {
    number: '02',
    title: 'Análise gratuita',
    description:
      'Nossa equipe analisa seu perfil e encontra as melhores condições disponíveis para você.',
  },
  {
    number: '03',
    title: 'Dinheiro na conta',
    description:
      'Após a aprovação, o valor é liberado diretamente na sua conta bancária em até 24 horas.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Como Funciona
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
            Simples e sem complicação
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Em apenas 3 passos você conquista o crédito que precisa, sem sair de casa.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-amber-400/20 via-amber-400/60 to-amber-400/20" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center gap-4">
              {/* Number bubble */}
              <div className="relative z-10 w-20 h-20 rounded-full border-2 border-amber-400 bg-slate-950 flex items-center justify-center">
                <span className="text-2xl font-extrabold text-amber-400">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-amber-400/20"
          >
            Começar agora
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
