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
