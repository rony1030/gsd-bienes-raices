const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_HZLs9dDIiQx6@ep-restless-brook-avdwgk9w-pooler.c-11.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';
const sql = neon(DATABASE_URL);

async function runMigration() {
  console.log('--- Conectando e inicializando base de datos en Neon PostgreSQL ---');

  console.log('1. Creando schema real_estate...');
  await sql.query('CREATE SCHEMA IF NOT EXISTS real_estate');

  console.log('2. Creando tabla real_estate.properties...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS real_estate.properties (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('Villa','Casa','Apartamento','Terreno','Local')),
      operation TEXT NOT NULL CHECK (operation IN ('Venta','Alquiler')),
      price NUMERIC(14,2) NOT NULL CHECK (price >= 0),
      currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD','DOP')),
      beds INTEGER NOT NULL DEFAULT 0,
      baths INTEGER NOT NULL DEFAULT 0,
      area NUMERIC(14,2) NOT NULL,
      description TEXT NOT NULL,
      images JSONB NOT NULL DEFAULT '[]',
      amenities JSONB NOT NULL DEFAULT '[]',
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
      demo BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await sql.query('CREATE INDEX IF NOT EXISTS properties_public_idx ON real_estate.properties(status, featured, created_at DESC)');

  console.log('3. Creando tabla real_estate.leads...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS real_estate.leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      property_id UUID REFERENCES real_estate.properties(id) ON DELETE SET NULL,
      source TEXT NOT NULL DEFAULT 'gsd-bienes-raices',
      status TEXT NOT NULL DEFAULT 'nuevo' CHECK(status IN ('nuevo','contactado','calificado','cerrado')),
      consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await sql.query('CREATE INDEX IF NOT EXISTS leads_created_idx ON real_estate.leads(created_at DESC)');

  console.log('4. Creando tabla real_estate.blogs...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS real_estate.blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT DEFAULT 'Inversión',
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image TEXT,
      author TEXT DEFAULT 'GSD',
      status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await sql.query('CREATE INDEX IF NOT EXISTS blogs_public_idx ON real_estate.blogs(status, created_at DESC)');

  console.log('5. Creando tabla real_estate.social_feeds...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS real_estate.social_feeds (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project TEXT UNIQUE NOT NULL,
      project_name TEXT NOT NULL,
      instagram_handle TEXT DEFAULT '@gsd',
      instagram_url TEXT DEFAULT 'https://www.instagram.com/',
      posts JSONB DEFAULT '[]',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  console.log('6. Sembrando propiedades iniciales reales...');
  await sql.query(`
    INSERT INTO real_estate.properties (slug, title, location, type, operation, price, currency, beds, baths, area, description, images, amenities, featured, status)
    VALUES 
    ('apartamento-piantini', 'Apartamento de Lujo en Piantini', 'Piantini, Santo Domingo', 'Apartamento', 'Venta', 280000.00, 'USD', 3, 3, 215.00, 'Lujoso apartamento con vista panorámica en el corazón de Piantini. Terminaciones de primera en roble, cocina modular italiana, balcón tipo terraza y seguridad 24 horas.', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Lobby climatizado","Piscina infinity","Gimnasio equipado","Planta eléctrica full","2 Parqueos techados"]'::jsonb, TRUE, 'published'),
    ('villa-casa-de-campo', 'Villa Exclusiva con Campo de Golf', 'Casa de Campo, La Romana', 'Villa', 'Venta', 750000.00, 'USD', 4, 5, 580.00, 'Impresionante villa caribeña con vista al campo de golf, piscina privada y gazebo exterior. Amplias áreas sociales integradas con jardines tropicales y máxima privacidad.', '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Piscina privada","Vista al golf","Gazebo exterior","Seguridad privada 24/7","Acceso a playa privada"]'::jsonb, TRUE, 'published'),
    ('terreno-bavaro', 'Terreno Turístico en Bávaro', 'Bávaro, Punta Cana', 'Terreno', 'Venta', 120000.00, 'USD', 0, 0, 2000.00, 'Solar listo para desarrollo residencial o villa turística a pocos minutos de las playas de Punta Cana. Título y deslinde al día con acceso a servicios.', '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Título deslindado","Acceso pavimentado","Agua y energía","Zona de alta plusvalía"]'::jsonb, FALSE, 'published')
    ON CONFLICT (slug) DO NOTHING;
  `);

  console.log('7. Sembrando artículos de blog iniciales...');
  await sql.query(`
    INSERT INTO real_estate.blogs (slug, title, category, excerpt, content, cover_image, author, status)
    VALUES
    ('guia-elegir-destino-propiedad-rd', 'Cómo elegir el destino ideal para tu próxima propiedad en RD', 'Guía', 'Punta Cana, Samaná, Las Terrenas o Santo Domingo: una guía práctica para comparar rentabilidad, estilo de vida y plusvalía.', 'Invertir en bienes raíces en República Dominicana requiere evaluar tanto el retorno por alquileres de corta estancia como la seguridad jurídica del inmueble...', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', 'GSD Real Estate', 'published'),
    ('detalles-transforman-experiencia-hogar', 'Detalles que transforman la experiencia de un hogar contemporáneo', 'Vivir mejor', 'Iluminación natural, ventilación cruzada y espacios exteriores: qué aspectos técnicos revisar antes de firmar contrato.', 'La verdadera exclusividad de un inmueble no se mide solo en metros cuadrados, sino en la distribución inteligente de sus áreas sociales...', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'GSD Real Estate', 'published'),
    ('blindaje-legal-compra-inmueble', 'El blindaje legal imprescindible antes de reservar una propiedad', 'Inversión', 'La importancia de la auditoría técnica de deslinde, depuración de gravámenes y contratos con certeza patrimonial.', 'En GSD asesoramos a compradores e inversionistas para garantizar que cada título esté saneado y libre de contingencias registrales antes de depositar reservas...', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'GSD Jurídico', 'published')
    ON CONFLICT (slug) DO NOTHING;
  `);

  console.log('8. Sembrando social feeds de Instagram...');
  await sql.query(`
    INSERT INTO real_estate.social_feeds (project, project_name, instagram_handle, instagram_url, posts)
    VALUES
    ('bienes-raices', 'GSD Bienes Raíces', '@gsd.realestate', 'https://www.instagram.com/', '[
      {"image":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Residencia contemporánea en Piantini"},
      {"image":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Diseño de interiores y calidez"},
      {"image":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Villa de lujo en Casa de Campo"},
      {"image":"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Espacios abiertos e iluminación natural"}
    ]'::jsonb),
    ('matriz', 'GSD Matriz / Ingeniería & Legal', '@gsdsource', 'https://www.instagram.com/', '[
      {"image":"https://images.unsplash.com/photo-1541888946425-d0fbb1862557?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Agrimensura y deslinde de precisión"},
      {"image":"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Asesoría y blindaje jurídico de títulos"},
      {"image":"https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Proyectos de infraestructura y topografía"},
      {"image":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80","link":"https://www.instagram.com/","caption":"Gestión patrimonial inmobiliaria"}
    ]'::jsonb)
    ON CONFLICT (project) DO NOTHING;
  `);

  console.log('✅ Migración completa y exitosa en Neon PostgreSQL.');
}

runMigration().catch(err => {
  console.error('❌ Error ejecutando migración:', err);
  process.exit(1);
});
