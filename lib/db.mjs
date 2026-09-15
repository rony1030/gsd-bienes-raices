import { neon } from "@neondatabase/serverless";
import { demoProperties } from "./demo.mjs";

export function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_NOT_CONFIGURED");
  return neon(process.env.DATABASE_URL);
}

export async function getProperties() {
  if (!process.env.DATABASE_URL)
    return process.env.DEMO_MODE === "true" ? demoProperties : [];
  const sql = database();
  const rows =
    await sql`SELECT * FROM real_estate.properties WHERE status = 'published' ORDER BY featured DESC, created_at DESC`;
  return rows.map((row) => ({
    ...row,
    price: Number(row.price),
    area: Number(row.area),
  }));
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

