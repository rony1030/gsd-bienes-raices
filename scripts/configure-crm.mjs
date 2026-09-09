import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
const envPath = new URL("../.env.local", import.meta.url);
const current = await readFile(envPath, "utf8");
const existing = current.match(/^CRM_API_KEY=(.+)$/m)?.[1];
const key = existing || randomBytes(32).toString("hex");
if (!existing)
  await writeFile(
    envPath,
    current.replace(/^CRM_API_KEY=$/m, `CRM_API_KEY=${key}`),
  );
const target = new URL("../../gsd-matrix/.env.real-estate", import.meta.url);
try {
  await readFile(target);
  console.log("Configuración existente del CRM conservada.");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  await writeFile(
    target,
    `REAL_ESTATE_URL=http://localhost:3001\nREAL_ESTATE_API_KEY=${key}\n`,
  );
  console.log("Conexión privada del CRM preparada.");
}
