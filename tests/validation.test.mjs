import test from "node:test";
import assert from "node:assert/strict";
import { leadSchema, propertySchema } from "../lib/validation.mjs";
import { authorized } from "../lib/auth.mjs";
const valid = {
  name: "Prueba GSD",
  email: "prueba@example.com",
  phone: "+1 809 555 0100",
  message: "Quisiera coordinar una visita.",
  consent: true,
  website: "",
};
test("lead requires explicit consent and rejects honeypot submissions", () => {
  assert.equal(leadSchema.safeParse(valid).success, true);
  assert.equal(
    leadSchema.safeParse({ ...valid, consent: false }).success,
    false,
  );
  assert.equal(
    leadSchema.safeParse({ ...valid, website: "spam" }).success,
    false,
  );
});
test("lead rejects invalid contact data and excessive messages", () => {
  for (const overrides of [
    { email: "invalid" },
    { phone: "abc12345" },
    { message: "x".repeat(2001) },
    { propertyId: "injection" },
  ])
    assert.equal(
      leadSchema.safeParse({ ...valid, ...overrides }).success,
      false,
    );
});
test("CRM denies requests with missing, weak or incorrect credentials", () => {
  const previous = process.env.CRM_API_KEY;
  try {
    delete process.env.CRM_API_KEY;
    assert.equal(authorized(new Request("http://localhost")), false);
    process.env.CRM_API_KEY = "a".repeat(40);
    assert.equal(
      authorized(
        new Request("http://localhost", {
          headers: { authorization: "Bearer wrong" },
        }),
      ),
      false,
    );
    assert.equal(
      authorized(
        new Request("http://localhost", {
          headers: { authorization: "Bearer " + "a".repeat(40) },
        }),
      ),
      true,
    );
  } finally {
    if (previous === undefined) delete process.env.CRM_API_KEY;
    else process.env.CRM_API_KEY = previous;
  }
});
