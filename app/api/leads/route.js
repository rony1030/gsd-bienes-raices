import { database } from "@/lib/db.mjs";
import { leadSchema } from "@/lib/validation.mjs";
export async function POST(request) {
  const origin = request.headers.get("origin");
  const allowed = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url)
    .origin;
  if (origin && origin !== allowed)
    return Response.json({ error: "Origen no permitido." }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 12000)
    return Response.json(
      { error: "Solicitud demasiado larga." },
      { status: 413 },
    );
  let data;
  try {
    data = leadSchema.safeParse(await request.json());
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  if (!data.success)
    return Response.json(
      {
        error: "Revisa el nombre, correo, teléfono, mensaje y consentimiento.",
      },
      { status: 400 },
    );
  if (!process.env.DATABASE_URL)
    return Response.json(
      {
        error:
          "El formulario todavía no está habilitado. Tu solicitud no se ha enviado.",
      },
      { status: 503 },
    );
  try {
    const sql = database(),
      d = data.data;
    if (d.propertyId) {
      const exists =
        await sql`SELECT id FROM real_estate.properties WHERE id=${d.propertyId} AND status='published'`;
      if (!exists.length)
        return Response.json(
          { error: "Esta propiedad ya no está disponible." },
          { status: 404 },
        );
    }
    const rows =
      await sql`INSERT INTO real_estate.leads(name,email,phone,message,property_id)
      SELECT ${d.name},${d.email},${d.phone},${d.message},${d.propertyId || null}::uuid
      WHERE NOT EXISTS (SELECT 1 FROM real_estate.leads WHERE email=${d.email} AND created_at > now() - interval '1 minute') RETURNING id`;
    if (!rows.length)
      return Response.json(
        {
          error:
            "Ya recibimos una solicitud reciente. Espera un minuto antes de enviar otra.",
        },
        { status: 429 },
      );
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    console.error("Lead persistence failed");
    return Response.json(
      { error: "No pudimos guardar tu solicitud. Inténtalo nuevamente." },
      { status: 503 },
    );
  }
}
