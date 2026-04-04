const services = [
  {
    icon: '👤',
    title: 'Empréstimo Pessoal',
    description:
      'Crédito rápido sem necessidade de garantia. Ideal para quitar dívidas, reformas, viagens ou qualquer necessidade pessoal.',
    highlights: ['Aprovação em 24h', 'Sem consulta ao SPC/Serasa', 'Parcelamento flexível'],
  },
  {
    icon: '📋',
    title: 'Crédito Consignado',
    description:
      'Desconto direto em folha de pagamento com as menores taxas do mercado. Para servidores públicos, aposentados e pensionistas.',
    highlights: ['Menor taxa do mercado', 'Sem comprovação de renda extra', 'Até 96 parcelas'],
  },
  {
    icon: '🏠',
    title: 'Refinanciamento',
    description:
      'Use o patrimônio que você já possui para conseguir crédito com taxas muito mais baixas e prazos maiores.',
    highlights: ['Taxas a partir de 0,79% a.m.', 'Imóvel ou veículo como garantia', 'Grandes valores'],
  },
  {
    icon: '💼',
    title: 'Antecipação FGTS',
    description:
      'Antecipe o saldo do seu FGTS e tenha o dinheiro na conta em poucas horas, sem afetar seu crédito.',
    highlights: ['Sem impacto no score', 'Dinheiro em poucas horas', 'Sem juros adicionais'],
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Nossos Serviços
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
            Crédito para cada necessidade
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Temos a solução financeira ideal para o seu momento. Consulte nossas modalidades e encontre a que melhor se encaixa no seu perfil.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/40 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
            >
              <div className="text-4xl">{s.icon}</div>
              <h3 className="text-lg font-bold text-white">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{s.description}</p>
              <ul className="flex flex-col gap-2 pt-2 border-t border-slate-700">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-amber-400">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
