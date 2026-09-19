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

export async function getProjects() {
  const fallback = [
    {
      slug: 'stellar-punta-cana',
      nombre: 'Stellar',
      promotor: 'Blue Coast Realty',
      ubicacion: 'Bávaro, Punta Cana',
      tipologias: ['Apartamentos', 'Penthouses'],
      precio_desde: 180000,
      moneda: 'USD',
      estado: 'En construcción',
      entrega: '2027',
      descripcion: 'Un desarrollo residencial de nueva generación frente al mar. Stellar combina arquitectura contemporánea con amenidades de resort para una vida sin compromisos en el corazón de Bávaro.',
      cover_image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      galeria: [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
      ],
      amenidades: ['Piscina infinita', 'Gym', 'Spa', 'Concierge 24/7', 'Playa privada', 'Business center'],
      featured: true,
    },
    {
      slug: 'cosmo-bavaro',
      nombre: 'Cosmo',
      promotor: 'GSD Real Estate',
      ubicacion: 'Bávaro, La Altagracia',
      tipologias: ['Estudios', 'Apartamentos 1-2 hab'],
      precio_desde: 95000,
      moneda: 'USD',
      estado: 'En construcción',
      entrega: '2026',
      descripcion: 'Diseñado para el inversionista inteligente. Cosmo ofrece unidades compactas de alto rendimiento en una ubicación estratégica a minutos de las playas de Bávaro.',
      cover_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      galeria: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
      ],
      amenidades: ['Piscina', 'Rooftop bar', 'Coworking', 'Seguridad 24/7'],
      featured: true,
    },
    {
      slug: 'galaxy-cap-cana',
      nombre: 'Galaxy',
      promotor: 'Cap Cana Developers',
      ubicacion: 'Cap Cana, La Altagracia',
      tipologias: ['Villas', 'Townhouses'],
      precio_desde: 420000,
      moneda: 'USD',
      estado: 'Entrega inmediata',
      entrega: '2025',
      descripcion: 'Galaxy redefine el lujo en Cap Cana. Villas y townhouses en el corazón de la marina, con acceso a golf, marina privada y servicios hoteleros de primer nivel.',
      cover_image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      galeria: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
      ],
      amenidades: ['Marina privada', 'Golf cart', 'Club de playa', 'Helipad', 'Seguridad perimetral'],
      featured: false,
    },
    {
      slug: 'canar-rock-bavaro',
      nombre: 'Canar Rock',
      promotor: 'Canar Developers',
      ubicacion: 'Bávaro, Punta Cana',
      tipologias: ['Apartamentos 2-3 hab', 'Penthouses'],
      precio_desde: 145000,
      moneda: 'USD',
      estado: 'En construcción',
      entrega: '2028',
      descripcion: 'Canar Rock es una propuesta arquitectónica audaz que fusiona naturaleza y modernidad. Fachadas con elementos pétreos contrastan con interiores minimalistas y amplias terrazas.',
      cover_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      galeria: [
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
      ],
      amenidades: ['Piscina olímpica', 'Jardines botánicos', 'Children club', 'Restaurante', 'Spa', 'Yoga deck'],
      featured: true,
    },
    {
      slug: 'far-view-samana',
      nombre: 'Far View',
      promotor: 'Samaná Invest',
      ubicacion: 'Las Galeras, Samaná',
      tipologias: ['Villas ecoturísticas', 'Bungalows'],
      precio_desde: 220000,
      moneda: 'USD',
      estado: 'Entrega inmediata',
      entrega: '2025',
      descripcion: 'Desde las alturas de Las Galeras, Far View te conecta con una naturaleza sin igual. Villas diseñadas con materiales locales y energía renovable para vivir en armonía con el entorno.',
      cover_image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      galeria: [
        'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=900&q=80',
      ],
      amenidades: ['Piscina privada por villa', 'Huerto orgánico', 'Vista al mar 360°', 'Senderos ecológicos'],
      featured: false,
    },
  ];

  try {
    const crmUrl = process.env.CRM_URL || 'http://localhost:3000';
    const res = await fetch(`${crmUrl.replace(/\/$/, '')}/api/proyectos`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch(e) {}

  if (!process.env.DATABASE_URL) return fallback;
  try {
    const sql = database();
    return fallback;
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
