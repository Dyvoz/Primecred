'use client'

import { useLang } from '@/contexts/LanguageContext'

export default function WhyUs() {
  const { T } = useLang()

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {T.whyUs.stats.map((s) => (
            <div
              key={s.label}
              className="bg-gradient-to-br from-amber-400/10 to-amber-500/5 border border-amber-400/20 rounded-2xl p-6 text-center"
            >
              <div className="font-heading text-4xl font-bold text-amber-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {T.whyUs.tag}
            </span>
            <h2 className="font-heading mt-3 text-3xl md:text-4xl font-bold text-white mb-4">
              {T.whyUs.title}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {T.whyUs.body}
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              {T.whyUs.cta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {T.whyUs.features.map((f) => (
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
