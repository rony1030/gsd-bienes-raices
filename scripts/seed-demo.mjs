import { database } from "../lib/db.mjs";
import { demoProperties } from "../lib/demo.mjs";
const sql = database();
await sql.transaction(
  demoProperties.map(
    (
      p,
    ) => sql`INSERT INTO real_estate.properties(slug,title,location,type,operation,price,currency,beds,baths,area,description,images,amenities,featured,status,demo)
  VALUES(${p.slug},${p.title},${p.location},${p.type},${p.operation},${p.price},${p.currency},${p.beds},${p.baths},${p.area},${p.description},${JSON.stringify(p.images)}::jsonb,${JSON.stringify(p.amenities)}::jsonb,${p.featured},'published',true)
  ON CONFLICT(slug) DO NOTHING`,
  ),
);
console.log(
  "Seis proyectos demo preparados en Neon. Los registros existentes no fueron reemplazados.",
);
