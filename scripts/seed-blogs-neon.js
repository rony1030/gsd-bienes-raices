const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_HZLs9dDIiQx6@ep-restless-brook-avdwgk9w-pooler.c-11.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';
const sql = neon(DATABASE_URL);

async function seed() {
  console.log('--- Sembrando 3 Artículos de Blog Completos con SEO y Categorías en Neon ---');

  await sql.query('DELETE FROM real_estate.blogs');

  await sql.query(`
    INSERT INTO real_estate.blogs (slug, title, category, tags, excerpt, content, cover_image, author, status, meta_title, meta_description, keywords, seo_score)
    VALUES 
    (
      'guia-elegir-destino-propiedad-rd',
      'Cómo elegir el destino ideal para tu próxima propiedad en RD',
      'Guía',
      'Punta Cana, Santo Domingo, Inversión, Plusvalía',
      'Punta Cana, Samaná, Las Terrenas o Santo Domingo: una guía práctica para comparar rentabilidad, estilo de vida y plusvalía en el mercado dominicano.',
      '# Inversión Inmobiliaria Inteligente en República Dominicana\n\nInvertir en bienes raíces en República Dominicana requiere evaluar detenidamente tanto el retorno de inversión por alquileres turísticos como el crecimiento de la plusvalía a mediano plazo.\n\n## Comparativa de Destinos Principales\n\n- **Punta Cana / Bávaro**: Máxima ocupación turística en rentas cortas (Airbnb) y exenciones fiscales de la Ley Confotur.\n- **Santo Domingo (Piantini / Naco)**: Demanda corporativa estable, plusvalía sostenida y rentas a largo plazo en dólares.\n- **Las Terrenas / Samaná**: Alta apreciación para villas ecológicas y turismo boutique de alto poder adquisitivo.\n\nEn GSD acompañamos a cada inversionista desde la depuración del título hasta el cierre notarial.',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'GSD Real Estate',
      'published',
      'Cómo elegir el destino ideal para invertir en RD | GSD',
      'Punta Cana, Samaná, Las Terrenas o Santo Domingo: guía completa para comparar rentabilidad y plusvalía inmobiliaria.',
      'inversion inmobiliaria rd, comprar apartamento punta cana, bienes raices republica dominicana',
      95
    ),
    (
      'detalles-transforman-experiencia-hogar',
      'Detalles arquitectónicos que transforman la experiencia de un hogar',
      'Vivir mejor',
      'Arquitectura, Interiorismo, Confort, Iluminación',
      'Iluminación natural, ventilación cruzada y distribución inteligente: qué aspectos técnicos y espaciales revisar antes de elegir tu hogar.',
      '# La Esencia del Confort Residencial\n\nLa verdadera exclusividad de un inmueble no se mide únicamente en metros cuadrados, sino en la calidad espacial y los detalles constructivos que impactan tu día a día.\n\n## Claves de un Diseño Funcional\n\n1. **Orientación solar**: Aprovechamiento de la luz matutina minimizando la radiación térmica en las tardes.\n2. **Ventilación cruzada**: Diseños que permiten brisa continua, vital para el clima tropical.\n3. **Integración interior-exterior**: Balcones terraza y ventanales de piso a techo que amplifican la amplitud visual.\n\nCada proyecto seleccionado en nuestro catálogo pasa por un riguroso estándar de calidad arquitectónica.',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'GSD Arquitectura',
      'published',
      'Detalles arquitectónicos que transforman un hogar | GSD',
      'Iluminación natural, ventilación y distribución: aspectos técnicos y espaciales clave antes de comprar tu propiedad.',
      'arquitectura residencial, diseño interior piantini, apartamentos de lujo santo domingo',
      90
    ),
    (
      'blindaje-legal-compra-inmueble-rd',
      'El blindaje legal imprescindible antes de comprar una propiedad en RD',
      'Legal & Títulos',
      'Deslinde, Títulos, Seguridad Jurídica, Contratos',
      'Auditoría técnica de deslinde, depuración de gravámenes y contratos blindados: cómo proteger tu capital antes de entregar reservas.',
      '# Certeza Jurídica en Operaciones Inmobiliarias\n\nEl mayor riesgo al adquirir un inmueble es no verificar la cadena de titularidad o encontrarse con solapamientos de linderos. En GSD combinamos la ingeniería topográfica con el derecho registral.\n\n## Pasos del Blindaje Patrimonial GSD\n\n- **Certificación de Estado Jurídico**: Verificación ante el Registro de Títulos de que el inmueble está 100% libre de hipotecas, embargos o litis sobre derechos registrados.\n- **Auditoría Técnica de Mensura**: Medición satelital GNSS para certificar que las coordenadas físicas coinciden con el plano aprobado.\n- **Contratos Notariados con Garantía**: Estructuración de promesas de venta que protegen el desembolso del comprador.',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'GSD Jurídico',
      'published',
      'Blindaje legal para comprar propiedades en RD | GSD Legal',
      'Auditoría técnica de deslinde, depuración de gravámenes y contratos con certeza patrimonial garantizada.',
      'deslinde de terrenos rd, registro de titulos, asesoria legal inmobiliaria santo domingo',
      100
    )
  `);

  console.log('✅ 3 artículos de blog de prueba sembrados exitosamente en Neon PostgreSQL.');
}

seed().catch(err => {
  console.error('❌ Error sembrando blogs:', err);
  process.exit(1);
});
