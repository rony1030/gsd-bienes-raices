import { authorized } from "@/lib/auth.mjs";
import { database } from "@/lib/db.mjs";
import { propertySchema } from "@/lib/validation.mjs";
export const dynamic = "force-dynamic";
const denied = () => Response.json({ error: "No autorizado" }, { status: 401 });
export async function GET(request) {
  if (!authorized(request)) return denied();
  try {
    const sql = database();
    const url = new URL(request.url);
    const page = Math.max(
      0,
      Math.min(100000, Number(url.searchParams.get("page")) || 0),
    );
    const resource = url.searchParams.get("resource");
    if (resource === "properties")
      return Response.json(
        await sql`SELECT * FROM real_estate.properties ORDER BY created_at DESC LIMIT 100 OFFSET ${Math.floor(page) * 100}`,
        { headers: { "Cache-Control": "no-store" } },
      );
    return Response.json(
      await sql`SELECT l.*, p.title AS property_title FROM real_estate.leads l LEFT JOIN real_estate.properties p ON p.id=l.property_id ORDER BY l.created_at DESC LIMIT 100 OFFSET ${Math.floor(page) * 100}`,
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Datos no disponibles" }, { status: 503 });
  }
}
export async function POST(request) {
  if (!authorized(request)) return denied();
  try {
    const parsed = propertySchema.safeParse(await request.json());
    if (!parsed.success)
      return Response.json(
        { error: "Propiedad inválida", details: parsed.error.flatten() },
        { status: 400 },
      );
    const p = parsed.data,
      sql = database();
    const rows =
      await sql`INSERT INTO real_estate.properties(
        slug,title,location,type,operation,price,currency,beds,baths,area,description,
        images,amenities,featured,status,
        condition_type,city,province,sector,parkinglot,terrain_area,tour_3d,short_description,featured_image,
        meta_title,meta_description,keywords,seo_score
      )
      VALUES(
        ${p.slug},${p.title},${p.location},${p.type},${p.operation},${p.price},${p.currency},${p.beds},${p.baths},${p.area},${p.description},
        ${JSON.stringify(p.images)}::jsonb,${JSON.stringify(p.amenities)}::jsonb,${p.featured},${p.status},
        ${p.condition_type || 'Listo'},${p.city || ''},${p.province || ''},${p.sector || ''},${p.parkinglot || 0},${p.terrain_area || 0},${p.tour_3d || ''},${p.short_description || ''},${p.featured_image || ''},
        ${p.meta_title || ''},${p.meta_description || ''},${p.keywords || ''},${p.seo_score || 0}
      )
      ON CONFLICT(slug) DO UPDATE SET 
        title=EXCLUDED.title,location=EXCLUDED.location,type=EXCLUDED.type,operation=EXCLUDED.operation,price=EXCLUDED.price,currency=EXCLUDED.currency,
        beds=EXCLUDED.beds,baths=EXCLUDED.baths,area=EXCLUDED.area,description=EXCLUDED.description,
        images=EXCLUDED.images,amenities=EXCLUDED.amenities,featured=EXCLUDED.featured,status=EXCLUDED.status,
        condition_type=EXCLUDED.condition_type,city=EXCLUDED.city,province=EXCLUDED.province,sector=EXCLUDED.sector,parkinglot=EXCLUDED.parkinglot,terrain_area=EXCLUDED.terrain_area,tour_3d=EXCLUDED.tour_3d,short_description=EXCLUDED.short_description,featured_image=EXCLUDED.featured_image,
        meta_title=EXCLUDED.meta_title,meta_description=EXCLUDED.meta_description,keywords=EXCLUDED.keywords,seo_score=EXCLUDED.seo_score,
        updated_at=now() RETURNING id,slug`;
    return Response.json(rows[0]);
  } catch {
    return Response.json(
      { error: "No se pudo guardar la propiedad" },
      { status: 503 },
    );
  }
}
export async function PATCH(request) {
  if (!authorized(request)) return denied();
  try {
    const { id, status } = await request.json();
    if (
      !/^[0-9a-f-]{36}$/i.test(id || "") ||
      !["nuevo", "contactado", "calificado", "cerrado"].includes(status)
    )
      return Response.json({ error: "Datos inválidos" }, { status: 400 });
    const sql = database();
    const rows =
      await sql`UPDATE real_estate.leads SET status=${status} WHERE id=${id} RETURNING id`;
    return rows.length
      ? Response.json({ ok: true })
      : Response.json({ error: "Contacto no encontrado" }, { status: 404 });
  } catch {
    return Response.json(
      { error: "No se pudo actualizar el contacto" },
      { status: 503 },
    );
  }
}
