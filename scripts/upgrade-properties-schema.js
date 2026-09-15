const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_HZLs9dDIiQx6@ep-restless-brook-avdwgk9w-pooler.c-11.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';
const sql = neon(DATABASE_URL);

async function upgrade() {
  console.log('--- Ampliando schema de real_estate.properties en Neon ---');
  await sql.query(`
    ALTER TABLE real_estate.properties 
    ADD COLUMN IF NOT EXISTS condition_type TEXT DEFAULT 'Listo',
    ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS province TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS sector TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS parkinglot INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS terrain_area NUMERIC(14,2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS tour_3d TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS short_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS featured_image TEXT DEFAULT '';
  `);
  console.log('--- Columnas añadidas exitosamente en Neon ---');
}

upgrade().catch(err => {
  console.error('Error migrando Neon:', err);
  process.exit(1);
});
