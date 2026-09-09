import assert from "node:assert/strict";
import { database } from "../lib/db.mjs";
const base = process.env.TEST_URL || "http://localhost:3001";
const sql = database();
for (const path of [
  "/",
  "/propiedades",
  "/propiedades/villa-las-palmas",
  "/privacidad",
])
  assert.equal((await fetch(base + path)).status, 200, path);
assert.equal((await fetch(base + "/api/crm")).status, 401);
assert.equal(
  (
    await fetch(base + "/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })
  ).status,
  400,
);
const properties = await (
  await fetch(base + "/api/crm?resource=properties", {
    headers: { Authorization: `Bearer ${process.env.CRM_API_KEY}` },
  })
).json();
assert.equal(properties.length, 6);
const email = `gsd-test-${Date.now()}@example.com`;
try {
  const response = await fetch(base + "/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Prueba automática GSD",
      email,
      phone: "+1 809 555 0100",
      message: "Contacto de prueba técnica. No contactar.",
      propertyId: properties[0].id,
      consent: true,
      website: "",
    }),
  });
  assert.equal(response.status, 201, await response.text());
  const rows =
    await sql`SELECT id,property_id FROM real_estate.leads WHERE email=${email}`;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].property_id, properties[0].id);
  const leads = await (
    await fetch(base + "/api/crm", {
      headers: { Authorization: `Bearer ${process.env.CRM_API_KEY}` },
    })
  ).json();
  assert.ok(leads.some((l) => l.email === email));
  const result = await fetch(base + "/api/crm", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.CRM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: rows[0].id, status: "contactado" }),
  });
  assert.equal(result.status, 200);
  const [updated] =
    await sql`SELECT status FROM real_estate.leads WHERE id=${rows[0].id}`;
  assert.equal(updated.status, "contactado");
  console.log(
    "PASS: páginas, autenticación, validación, seis proyectos, contacto persistido y actualización CRM.",
  );
} finally {
  await sql`DELETE FROM real_estate.leads WHERE email=${email}`;
}
