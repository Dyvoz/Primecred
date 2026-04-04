const stats = [
  { value: '5+', label: 'Anos de experiência' },
  { value: '2.000+', label: 'Clientes atendidos' },
  { value: '98%', label: 'Taxa de aprovação' },
  { value: '24h', label: 'Prazo de liberação' },
]

const features = [
  {
    icon: '🔐',
    title: 'Segurança garantida',
    description: 'Seus dados são protegidos com criptografia de ponta. Privacidade total em todas as etapas.',
  },
  {
    icon: '📊',
    title: 'Melhores condições',
    description: 'Comparamos dezenas de opções para encontrar as taxas mais baixas e prazos mais adequados.',
  },
  {
    icon: '🎯',
    title: 'Atendimento personalizado',
    description: 'Um consultor dedicado acompanha todo o processo do início ao fim, sem deixar você na mão.',
  },
  {
    icon: '✅',
    title: 'Sem burocracia',
    description: 'Processo 100% digital. Assine documentos eletronicamente e acompanhe tudo pelo celular.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-gradient-to-br from-amber-400/10 to-amber-500/5 border border-amber-400/20 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl font-extrabold text-amber-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              Por que a PrimeCred?
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white mb-4">
              A sua melhor escolha em crédito
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Somos especialistas em soluções de crédito personalizadas. Nossa missão é
              simplificar o acesso ao crédito e ajudar você a realizar seus objetivos
              financeiros com responsabilidade e transparência.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Solicitar meu crédito
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
