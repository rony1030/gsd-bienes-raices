import nodemailer from "nodemailer";

export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: (Number(process.env.SMTP_PORT) || 465) === 465,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
  from: process.env.SMTP_FROM || (process.env.SMTP_USER ? `GSD Dominicana <${process.env.SMTP_USER}>` : "GSD Dominicana <info@geosolutionssource.com>"),
};

/**
 * Plantilla Base Corporativa Unificada — GSD
 * Estructura idéntica para todos los correos del sistema:
 * - Logo / Isotipo central sencillo
 * - Fondo claro (#F8FAFC) y tarjeta blanca (#FFFFFF) con bordes finos
 * - Cero emojis, tipografía ejecutiva y botones corporativos claros
 * - Pie de firma institucional oficial (geosolutionssource.com)
 */
function buildUnifiedEmailTemplate({
  headerTitle,
  headerSubtitle,
  badgeText = "",
  badgeColor = "#1A3A52",
  mainContentHtml,
  primaryActionUrl = "",
  primaryActionText = "",
  secondaryActionUrl = "",
  secondaryActionText = "",
}) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 24px 12px;
        background-color: #F8FAFC;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #1E293B;
        -webkit-font-smoothing: antialiased;
      }
      .email-wrapper {
        max-width: 600px;
        margin: 0 auto;
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      }
      .brand-header {
        text-align: center;
        padding: 32px 24px 22px;
        background: #FFFFFF;
        border-bottom: 1px solid #F1F5F9;
      }
      .brand-logo-text {
        font-size: 21px;
        font-weight: 800;
        letter-spacing: 0.8px;
        color: #1A3A52;
        margin: 0;
        text-transform: uppercase;
      }
      .brand-subtext {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1.8px;
        color: #64748B;
        margin: 4px 0 0;
        text-transform: uppercase;
      }
      .header-notice {
        background: #FAFBFD;
        padding: 20px 28px;
        border-bottom: 1px solid #F1F5F9;
      }
      .notice-title {
        margin: 0;
        font-size: 17px;
        font-weight: 700;
        color: #1A3A52;
      }
      .notice-sub {
        margin: 4px 0 0;
        font-size: 13px;
        color: #64748B;
      }
      .status-badge {
        display: inline-block;
        background: ${badgeColor};
        color: #FFFFFF;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 4px;
        margin-top: 10px;
      }
      .content-body {
        padding: 28px;
        font-size: 14px;
        line-height: 1.6;
        color: #334155;
      }
      .data-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }
      .data-table td {
        padding: 10px 12px;
        font-size: 13.5px;
        border-bottom: 1px solid #F1F5F9;
      }
      .data-table td.lbl {
        font-weight: 600;
        color: #64748B;
        width: 38%;
        background: #F8FAFC;
      }
      .data-table td.val {
        font-weight: 600;
        color: #0F172A;
      }
      .info-callout {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-left: 4px solid #1A3A52;
        border-radius: 6px;
        padding: 14px 16px;
        margin: 18px 0;
      }
      .info-callout h4 {
        margin: 0 0 6px;
        font-size: 12.5px;
        font-weight: 700;
        color: #1A3A52;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .info-callout p {
        margin: 0;
        font-size: 13.5px;
        color: #475569;
        line-height: 1.5;
        white-space: pre-line;
      }
      .actions-container {
        text-align: center;
        padding-top: 22px;
        margin-top: 22px;
        border-top: 1px solid #F1F5F9;
      }
      .btn-primary {
        display: inline-block;
        background: #1A3A52;
        color: #FFFFFF !important;
        text-decoration: none;
        padding: 11px 22px;
        font-size: 13px;
        font-weight: 600;
        border-radius: 6px;
        margin: 4px 6px;
      }
      .btn-secondary {
        display: inline-block;
        background: #25D366;
        color: #FFFFFF !important;
        text-decoration: none;
        padding: 11px 22px;
        font-size: 13px;
        font-weight: 600;
        border-radius: 6px;
        margin: 4px 6px;
      }
      .email-footer {
        background: #F8FAFC;
        text-align: center;
        padding: 20px 24px;
        border-top: 1px solid #E2E8F0;
        font-size: 11.5px;
        color: #94A3B8;
        line-height: 1.5;
      }
      .email-footer a {
        color: #64748B;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="brand-header">
        <h1 class="brand-logo-text">GEOSOLUTIONS SOURCE DOMINICANA</h1>
        <p class="brand-subtext">GSD Real Estate & Legal</p>
      </div>

      <div class="header-notice">
        <h2 class="notice-title">${headerTitle}</h2>
        <p class="notice-sub">${headerSubtitle}</p>
        ${badgeText ? `<span class="status-badge">${badgeText}</span>` : ""}
      </div>

      <div class="content-body">
        ${mainContentHtml}

        ${(primaryActionUrl || secondaryActionUrl) ? `
        <div class="actions-container">
          ${secondaryActionUrl ? `<a href="${secondaryActionUrl}" class="btn-secondary">${secondaryActionText}</a>` : ""}
          ${primaryActionUrl ? `<a href="${primaryActionUrl}" class="btn-primary">${primaryActionText}</a>` : ""}
        </div>
        ` : ""}
      </div>

      <div class="email-footer">
        Geosolutions Source Dominicana, S.R.L.<br/>
        Portal Oficial: <a href="https://geosolutionssource.com">geosolutionssource.com</a><br/>
        Este mensaje fue generado automáticamente por el ecosistema digital GSD.
      </div>
    </div>
  </body>
  </html>
  `;
}

// 1. Envío al Asesor / Agente (Notificación interna)
export async function sendLeadNotificationEmail({
  agentEmail = process.env.AGENT_NOTIFICATION_EMAIL || process.env.SMTP_USER || "info@geosolutionssource.com",
  formSource = "Portal Bienes Raíces",
  clientType = "Bienes Raíces",
  clientName,
  clientPhone,
  clientEmail,
  message,
  projectOrProperty = "",
  customDetails = null
}) {
  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    console.warn("[Mailer] SMTP_USER o SMTP_PASS no configurado en .env.");
    return { ok: false, reason: "SMTP no configurado" };
  }

  const transporter = nodemailer.createTransport(SMTP_CONFIG);
  const subject = `[${clientType}] Nuevo Registro: ${clientName} — ${formSource}`;

  let extraRows = "";
  if (customDetails) {
    if (customDetails.budget) extraRows += `<tr><td class="lbl">Presupuesto Estimado:</td><td class="val">${customDetails.budget}</td></tr>`;
    if (customDetails.purpose) extraRows += `<tr><td class="lbl">Objetivo de Inversión:</td><td class="val">${customDetails.purpose}</td></tr>`;
    if (customDetails.location) extraRows += `<tr><td class="lbl">Ubicación Solicitada:</td><td class="val">${customDetails.location}</td></tr>`;
    if (customDetails.paymentVision) extraRows += `<tr><td class="lbl">Estructura Deseada:</td><td class="val">${customDetails.paymentVision}</td></tr>`;
  }

  const mainContentHtml = `
    <table class="data-table">
      <tr>
        <td class="lbl">Nombre del Cliente:</td>
        <td class="val">${clientName}</td>
      </tr>
      <tr>
        <td class="lbl">Teléfono / WhatsApp:</td>
        <td class="val"><a href="tel:${clientPhone}" style="color:#1A3A52; text-decoration:none;">${clientPhone}</a></td>
      </tr>
      <tr>
        <td class="lbl">Correo Electrónico:</td>
        <td class="val">${clientEmail ? `<a href="mailto:${clientEmail}" style="color:#1A3A52;">${clientEmail}</a>` : '<span style="color:#94A3B8;">No indicado</span>'}</td>
      </tr>
      <tr>
        <td class="lbl">Origen del Formulario:</td>
        <td class="val">${formSource}</td>
      </tr>
      ${projectOrProperty ? `
      <tr>
        <td class="lbl">Proyecto Referenciado:</td>
        <td class="val">${projectOrProperty}</td>
      </tr>` : ''}
      ${extraRows}
      <tr>
        <td class="lbl">Clasificación:</td>
        <td class="val"><strong>${clientType}</strong></td>
      </tr>
    </table>

    ${message ? `
    <div class="info-callout">
      <h4>Detalle de la Solicitud:</h4>
      <p>${message}</p>
    </div>` : ''}
  `;

  const html = buildUnifiedEmailTemplate({
    headerTitle: "Nueva Solicitud Registrada",
    headerSubtitle: `Cliente clasificado como ${clientType} proveniente de ${formSource}`,
    badgeText: clientType,
    badgeColor: clientType === "Legal" ? "#2B6CB0" : "#1A3A52",
    mainContentHtml,
    primaryActionUrl: `${process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://gsd-nine-drab.vercel.app'}/admin/leads`,
    primaryActionText: "Gestionar en CRM Matrix",
    secondaryActionUrl: `https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}`,
    secondaryActionText: "Contactar por WhatsApp"
  });

  try {
    const info = await transporter.sendMail({
      from: SMTP_CONFIG.from,
      to: agentEmail,
      subject,
      html,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Mailer] Error enviando correo al agente:", err);
    return { ok: false, error: err.message };
  }
}

// 2. Envío de Confirmación Oficial al Cliente
export async function sendClientConfirmationEmail({
  clientEmail,
  clientName,
  subjectTitle = "Confirmación de recepción de solicitud — Geosolutions Source Dominicana",
  projectName = ""
}) {
  if (!clientEmail || !SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    return { ok: false, reason: "No email o SMTP no configurado" };
  }

  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  const mainContentHtml = `
    <p style="font-size: 15px; font-weight: 600; color: #1A3A52; margin-top: 0;">
      Estimado/a ${clientName},
    </p>
    <p>
      Le confirmamos que hemos recibido formalmente su requerimiento${projectName ? ` referente a <strong>${projectName}</strong>` : ''}.
    </p>
    <p>
      Nuestro equipo directivo y asesores están analizando detalladamente su presupuesto, objetivo de inversión y capacidad de pago para estructurar una propuesta acorde a su visión.
    </p>

    <div class="info-callout">
      <h4>Próximo paso</h4>
      <p>Un asesor de nuestra firma se comunicará con usted a la mayor brevedad posible para presentarle las opciones seleccionadas y los planes de pago disponibles.</p>
    </div>

    <p>
      En caso de requerir asistencia inmediata o coordinar una conversación directa, puede contactarnos a través de nuestra línea institucional.
    </p>
  `;

  const html = buildUnifiedEmailTemplate({
    headerTitle: "Solicitud Recibida con Éxito",
    headerSubtitle: "Geosolutions Source Dominicana — Asesoría Inmobiliaria y Jurídica",
    badgeText: "En Análisis",
    badgeColor: "#1A3A52",
    mainContentHtml,
    primaryActionUrl: "https://wa.me/18294937254",
    primaryActionText: "Escribir a Asistencia Directa",
    secondaryActionUrl: "",
    secondaryActionText: ""
  });

  try {
    const info = await transporter.sendMail({
      from: SMTP_CONFIG.from,
      to: clientEmail,
      subject: subjectTitle,
      html,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error("[Mailer] Error enviando confirmación al cliente:", err);
    return { ok: false, error: err.message };
  }
}
