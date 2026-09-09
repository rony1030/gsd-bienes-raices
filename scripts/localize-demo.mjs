import { database } from "../lib/db.mjs";
import { demoProperties } from "../lib/demo.mjs";
const sql = database();
await sql.transaction(
  demoProperties.map(
    (p) =>
      sql`UPDATE real_estate.properties SET images=${JSON.stringify(p.images)}::jsonb WHERE slug=${p.slug} AND demo=true`,
  ),
);
console.log("Galerías demo conectadas a las imágenes locales.");
