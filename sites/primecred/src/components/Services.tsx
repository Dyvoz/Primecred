'use client'

import { useLang } from '@/contexts/LanguageContext'

export default function Services() {
  const { T } = useLang()

  return (
    <section id="servicos" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            {T.services.tag}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
            {T.services.title}
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">{T.services.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {T.services.items.map((s) => (
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
