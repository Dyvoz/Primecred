import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, loanType, amount, message } = body

    if (!name || !phone || !loanType || !amount) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const toEmail = process.env.CONTACT_EMAIL
    if (!toEmail) {
      console.error('CONTACT_EMAIL env var not set')
      return NextResponse.json({ error: 'Configuração de e-mail ausente.' }, { status: 500 })
    }

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL ?? 'PrimeCred <onboarding@resend.dev>',
      to: toEmail,
      reply_to: email || undefined,
      subject: `Nova solicitação de crédito — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc;">
          <div style="background: #0f172a; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">Prime<span style="color: white;">Cred</span></h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Nova solicitação de crédito recebida</p>
          </div>
          <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px; width: 40%;">👤 Nome</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">📞 Telefone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 14px;">${phone}</td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">📧 E-mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 14px;">${email}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">💳 Tipo de crédito</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 14px;">${loanType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">💰 Valor desejado</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold; font-size: 14px;">${amount}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 14px; vertical-align: top;">💬 Mensagem</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${message}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 24px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; color: #166534; font-size: 14px; font-weight: bold;">💡 Ação recomendada</p>
              <p style="margin: 8px 0 0; color: #15803d; font-size: 14px;">
                Entre em contato com <strong>${name}</strong> pelo telefone
                <strong> ${phone}</strong> para apresentar as melhores condições disponíveis.
              </p>
            </div>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
            © ${new Date().getFullYear()} PrimeCred — Esta mensagem foi enviada automaticamente pelo formulário do site.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Falha ao enviar e-mail.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
