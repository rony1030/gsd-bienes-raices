import nodemailer from "nodemailer";

export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: (Number(process.env.SMTP_PORT) || 465) === 465,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
  from: process.env.SMTP_FROM || (process.env.SMTP_USER ? `GSD Real Estate <${process.env.SMTP_USER}>` : "GSD Real Estate <no-reply@gsd.com.do>"),
};

export async function sendLeadNotificationEmail({
  agentEmail = process.env.AGENT_NOTIFICATION_EMAIL || process.env.SMTP_USER || "info@gsd.com.do",
  formSource = "Portal Bienes Raíces",
  clientType = "Bienes Raíces",
  clientName,
  clientPhone,
  clientEmail,
  message,
  projectOrProperty = "",
}) {
  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    console.warn("[Mailer] SMTP_USER o SMTP_PASS no configurado en .env. Saltando envío de correo.");
    return { ok: false, reason: "SMTP no configurado" };
  }

  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  const subject = `🔔 Nuevo Prospecto [${clientType}]: ${clientName} — ${formSource}`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F8FAFC; margin: 0; padding: 20px; color: #1E293B; }
      .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
      .header { background: #1A3A52; padding: 24px 28px; color: #FFFFFF; }
      .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
      .header p { margin: 6px 0 0; font-size: 13px; color: #94A3B8; }
      .badge { display: inline-block; background: #0D9488; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 4px; text-transform: uppercase; margin-top: 8px; }
      .body { padding: 26px 28px; }
      .info-table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .info-table td { padding: 10px 12px; font-size: 13.5px; border-bottom: 1px solid #F1F5F9; }
      .info-table td.label { font-weight: 600; color: #64748B; width: 35%; background: #F8FAFC; }
      .info-table td.value { font-weight: 600; color: #0F172A; }
      .message-box { background: #F1F5F9; border-left: 4px solid #0D9488; padding: 14px 16px; margin-top: 20px; border-radius: 0 8px 8px 0; }
      .message-box h4 { margin: 0 0 6px; font-size: 12.5px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; }
      .message-box p { margin: 0; font-size: 13.5px; color: #1E293B; line-height: 1.5; white-space: pre-line; }
      .footer { background: #F8FAFC; padding: 18px 28px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 12px; color: #94A3B8; }
      .cta-btn { display: inline-block; background: #1A3A52; color: #FFFFFF; text-decoration: none; padding: 10px 20px; font-size: 13px; font-weight: 600; border-radius: 6px; margin-top: 16px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Nuevo Cliente Potencial Registrado</h2>
        <p>Has recibido una nueva solicitud a través de la plataforma web de GSD</p>
        <span class="badge">${clientType}</span>
      </div>
      <div class="body">
        <table class="info-table">
          <tr>
            <td class="label">Nombre del Cliente:</td>
            <td class="value">${clientName}</td>
          </tr>
          <tr>
            <td class="label">Teléfono / WhatsApp:</td>
            <td class="value"><a href="tel:${clientPhone}" style="color:#0D9488; text-decoration:none;">${clientPhone}</a></td>
          </tr>
          <tr>
            <td class="label">Correo Electrónico:</td>
            <td class="value">${clientEmail ? `<a href="mailto:${clientEmail}" style="color:#1A3A52;">${clientEmail}</a>` : '<span style="color:#94A3B8;">No especificado</span>'}</td>
          </tr>
          <tr>
            <td class="label">Formulario de Origen:</td>
            <td class="value">${formSource}</td>
          </tr>
          ${projectOrProperty ? `
          <tr>
            <td class="label">Propiedad / Proyecto:</td>
            <td class="value" style="color:#0D9488;">${projectOrProperty}</td>
          </tr>` : ''}
          <tr>
            <td class="label">Clasificación Inicial:</td>
            <td class="value"><strong>${clientType}</strong></td>
          </tr>
        </table>

        ${message ? `
        <div class="message-box">
          <h4>Mensaje o Solicitud del Cliente:</h4>
          <p>${message}</p>
        </div>` : ''}

        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}" class="cta-btn" style="background:#25D366; color:#FFFFFF; margin-right: 8px;">
            💬 Responder por WhatsApp
          </a>
          <a href="${process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://gsd-nine-drab.vercel.app'}/admin/leads" class="cta-btn">
            📂 Ver en GSD Matrix CRM
          </a>
        </div>
      </div>
      <div class="footer">
        Este correo fue enviado automáticamente por el sistema integrado de Geosolutions Source Dominicana (GSD).
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: SMTP_CONFIG.from,
      to: agentEmail,
      subject,
      html,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Mailer] Error enviando correo:", err);
    return { ok: false, error: err.message };
  }
}
