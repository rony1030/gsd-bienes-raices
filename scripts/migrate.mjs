import { readFile } from "node:fs/promises";
import { database } from "../lib/db.mjs";
const sql = database();
const schema = await readFile(
  new URL("../db/schema.sql", import.meta.url),
  "utf8",
);
// This checked-in migration contains no procedural SQL or user-provided values.
await sql.transaction(
  schema
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => sql.query(s)),
);
console.log(
  "Esquema real_estate preparado. No se insertaron propiedades de ejemplo.",
);
