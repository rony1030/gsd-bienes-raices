import { database } from "@/lib/db.mjs";
import { leadSchema } from "@/lib/validation.mjs";
import { sendLeadNotificationEmail } from "@/lib/mailer.mjs";

export async function POST(request) {
  const origin = request.headers.get("origin");
  const allowed = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url).origin;
  if (origin && origin !== allowed && !origin.includes("localhost") && !origin.includes("vercel.app")) {
    // Permitir orígenes del mismo ecosistema
  }
  if (Number(request.headers.get("content-length")) > 15000) {
    return Response.json({ error: "Solicitud demasiado larga." }, { status: 413 });
  }

  let data;
  try {
    data = leadSchema.safeParse(await request.json());
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!data.success) {
    return Response.json(
      { error: "Por favor revisa que el nombre y teléfono sean correctos." },
      { status: 400 }
    );
  }

  const d = data.data;

  // Determinar clasificación: Legal vs Bienes Raíces
  const clientType = d.clientType || (
    (d.service && d.service.toLowerCase().includes("legal")) ? "Legal" : "Bienes Raíces"
  );
  const formSource = d.formSource || (d.service ? `Formulario: ${d.service}` : "Portal Inmobiliario");

  // 1. Guardar en Base de Datos PostgreSQL si está configurada
  if (process.env.DATABASE_URL) {
    try {
      const sql = database();
      await sql`INSERT INTO real_estate.leads(name, email, phone, message, property_id)
        VALUES (${d.name}, ${d.email || null}, ${d.phone}, ${d.message || ''}, ${d.propertyId || null}::uuid)`;
    } catch (dbErr) {
      console.warn("[Leads API] Error guardando en BD principal:", dbErr.message);
    }
  }

  // 2. Sincronizar directamente con el CRM Matrix
  const crmUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://gsd-nine-drab.vercel.app";
  try {
    fetch(`${crmUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: d.name,
        telefono: d.phone,
        email: d.email || "",
        servicio: d.service || "Bienes Raíces",
        mensaje: d.message || "",
        tipo_cliente: clientType,
        origen: formSource,
      }),
    }).catch(err => console.error("[Leads Sync CRM] Error asíncrono:", err.message));
  } catch(e) {}

  // 3. Enviar correo inmediato al agente con Hostinger SMTP
  try {
    await sendLeadNotificationEmail({
      clientName: d.name,
      clientPhone: d.phone,
      clientEmail: d.email,
      clientType: clientType,
      formSource: formSource,
      message: d.message,
      projectOrProperty: d.service || "",
    });
  } catch (mailErr) {
    console.warn("[Leads API] Error enviando correo al agente:", mailErr.message);
  }

  return Response.json({ ok: true, tipo_cliente: clientType }, { status: 201 });
}
