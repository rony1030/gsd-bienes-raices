import { neon } from "@neondatabase/serverless";
import { demoProperties, photos } from "./demo.mjs";

export function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_NOT_CONFIGURED");
  return neon(process.env.DATABASE_URL);
}

export async function getProperties() {
  if (!process.env.DATABASE_URL)
    return demoProperties;
  try {
    const sql = database();
    const rows =
      await sql`SELECT * FROM real_estate.properties WHERE status = 'published' ORDER BY featured DESC, created_at DESC`;
    if (!rows || rows.length === 0) return demoProperties;
    return rows.map((row) => ({
      ...row,
      price: Number(row.price),
      area: Number(row.area),
    }));
  } catch (error) {
    console.error("Database connection fallback to demo:", error);
    return demoProperties;
  }
}

export async function getInstagramFeed(project = 'bienes-raices') {
  const fallback = {
    project: 'bienes-raices',
    instagram_handle: '@gsd.realestate',
    instagram_url: 'https://www.instagram.com/',
    posts: [
      { image: photos.hero, link: 'https://www.instagram.com/', caption: 'Propiedad destacada GSD' },
      { image: photos.apartment, link: 'https://www.instagram.com/', caption: 'Diseño interior contemporáneo' },
      { image: photos.villa, link: 'https://www.instagram.com/', caption: 'Villa exclusiva' },
      { image: photos.home, link: 'https://www.instagram.com/', caption: 'Espacios residenciales' }
    ]
  };

  const crmUrl = process.env.CRM_URL || process.env.NEXT_PUBLIC_CRM_URL || 'https://gsd-nine-drab.vercel.app';
  try {
    const res = await fetch(`${crmUrl.replace(/\/$/, '')}/api/instagram/${project}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3500)
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    if (!data || !Array.isArray(data.posts) || data.posts.length === 0) return fallback;
    return {
      project: data.project || 'bienes-raices',
      instagram_handle: data.instagram_handle || '@gsd.realestate',
      instagram_url: data.instagram_url || 'https://www.instagram.com/',
      posts: data.posts
    };
  } catch {
    return fallback;
  }
}

export async function getBlogs() {
  const fallback = [
    {
      slug: 'guia-elegir-destino-propiedad-rd',
      title: 'Cómo elegir el destino ideal para tu próxima propiedad en RD',
      category: 'Guía',
      excerpt: 'Punta Cana, Samaná, Las Terrenas o Santo Domingo: una guía práctica para comparar rentabilidad, estilo de vida y plusvalía.',
      content: 'Invertir en bienes raíces en República Dominicana requiere evaluar tanto el retorno por alquileres de corta estancia como la seguridad jurídica del inmueble...',
      cover_image: photos.hero,
      author: 'GSD Real Estate',
      created_at: new Date().toISOString()
    },
    {
      slug: 'detalles-transforman-experiencia-hogar',
      title: 'Detalles que transforman la experiencia de un hogar contemporáneo',
      category: 'Vivir mejor',
      excerpt: 'Iluminación natural, ventilación cruzada y espacios exteriores: qué aspectos técnicos revisar antes de firmar contrato.',
      content: 'La verdadera exclusividad de un inmueble no se mide solo en metros cuadrados, sino en la distribución inteligente de sus áreas sociales...',
      cover_image: photos.home,
      author: 'GSD Real Estate',
      created_at: new Date().toISOString()
    },
    {
      slug: 'blindaje-legal-compra-inmueble',
      title: 'El blindaje legal imprescindible antes de reservar una propiedad',
      category: 'Inversión',
      excerpt: 'La importancia de la auditoría técnica de deslinde, depuración de gravámenes y contratos con certeza patrimonial.',
      content: 'En GSD asesoramos a compradores e inversionistas para garantizar que cada título esté saneado y libre de contingencias registrales antes de depositar reservas...',
      cover_image: photos.apartment,
      author: 'GSD Jurídico',
      created_at: new Date().toISOString()
    }
  ];

  if (!process.env.DATABASE_URL) return fallback;
  try {
    const sql = database();
    const rows = await sql`SELECT * FROM real_estate.blogs WHERE status = 'published' ORDER BY created_at DESC`;
    if (!rows || rows.length === 0) return fallback;
    return rows;
  } catch {
    return fallback;
  }
}


