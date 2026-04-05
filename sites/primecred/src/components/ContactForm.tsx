'use client'

import { useState, FormEvent } from 'react'
import { useLang } from '@/contexts/LanguageContext'

const WA_NUMBER = '5522988449328'

interface FormData {
  name: string
  phone: string
  email: string
  loanType: string
  amount: string
  message: string
}

const emptyForm: FormData = { name: '', phone: '', email: '', loanType: '', amount: '', message: '' }
type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const { T } = useLang()
  const [form, setForm] = useState<FormData>(emptyForm)
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const isValid = form.name.trim() && form.phone.trim() && form.loanType && form.amount

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(emptyForm)
    } catch {
      setStatus('error')
    }
  }

  const handleWhatsApp = () => {
    if (!isValid) return
    const f = T.contact.fields
    const lines = [
      T.contact.waMessage,
      '',
      `👤 *${f.name}:* ${form.name}`,
      `📞 *${f.phone}:* ${form.phone}`,
    ]
    if (form.email) lines.push(`📧 *${f.email}:* ${form.email}`)
    lines.push(`💳 *${f.loanType}:* ${form.loanType}`)
    lines.push(`💰 *${f.amount}:* ${form.amount}`)
    if (form.message) lines.push(`💬 *${f.message}:* ${form.message}`)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contato" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">{T.contact.tag}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white mb-4">{T.contact.title}</h2>
            <p className="text-slate-400 leading-relaxed mb-8">{T.contact.sub}</p>

            <div className="flex flex-col gap-4">
              <ContactInfo icon="📞" label="WhatsApp" value="+55 22 98844-9328" href={`https://wa.me/${WA_NUMBER}`} />
              <ContactInfo icon="📸" label="Instagram" value="@thaironyprimecred" href="https://instagram.com/thaironyprimecred" />
            </div>

            <div className="mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-amber-400 font-semibold">🔒 {T.contact.security}</span>{' '}
                {T.contact.securityBody}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">{T.contact.successTitle}</h3>
                <p className="text-slate-400 mb-6">{T.contact.successBody}</p>
                <button onClick={() => setStatus('idle')} className="text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors">
                  {T.contact.successReset}
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmail} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={T.contact.fields.name} id="name">
                    <input id="name" type="text" placeholder={T.contact.fields.namePlaceholder} value={form.name} onChange={set('name')} required className={inputClass} />
                  </Field>
                  <Field label={T.contact.fields.phone} id="phone">
                    <input id="phone" type="tel" placeholder={T.contact.fields.phonePlaceholder} value={form.phone} onChange={set('phone')} required className={inputClass} />
                  </Field>
                </div>

                <Field label={T.contact.fields.email} id="email">
                  <input id="email" type="email" placeholder={T.contact.fields.emailPlaceholder} value={form.email} onChange={set('email')} className={inputClass} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={T.contact.fields.loanType} id="loanType">
                    <select id="loanType" value={form.loanType} onChange={set('loanType')} required className={inputClass}>
                      <option value="">{T.contact.fields.loanTypePlaceholder}</option>
                      {T.contact.loanTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label={T.contact.fields.amount} id="amount">
                    <select id="amount" value={form.amount} onChange={set('amount')} required className={inputClass}>
                      <option value="">{T.contact.fields.amountPlaceholder}</option>
                      {T.contact.loanAmounts.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label={T.contact.fields.message} id="message">
                  <textarea id="message" rows={3} placeholder={T.contact.fields.messagePlaceholder} value={form.message} onChange={set('message')} className={`${inputClass} resize-none`} />
                </Field>

                {status === 'error' && (
                  <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{T.contact.error}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button type="submit" disabled={!isValid || status === 'sending'}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm px-5 py-3.5 rounded-xl transition-colors">
                    {status === 'sending' ? <><SpinnerIcon />{T.contact.sending}</> : <><EmailIcon />{T.contact.submitEmail}</>}
                  </button>
                  <button type="button" onClick={handleWhatsApp} disabled={!isValid}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors">
                    <WhatsAppIcon />{T.contact.submitWhatsApp}
                  </button>
                </div>
                <p className="text-center text-xs text-slate-500">{T.contact.fields.required}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inputClass = 'w-full bg-slate-900 border border-slate-600 hover:border-slate-500 focus:border-amber-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors'

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-slate-300 text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

function ContactInfo({ icon, label, value, href }: { icon: string; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-white font-medium group-hover:text-amber-400 transition-colors">{value}</p>
      </div>
    </a>
  )
}

function EmailIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}
function WhatsAppIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
}
function SpinnerIcon() {
  return <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
}
