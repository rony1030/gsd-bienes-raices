import { timingSafeEqual } from "node:crypto";
export function authorized(request) {
  const expected = process.env.CRM_API_KEY;
  if (!expected || expected.length < 32) return false;
  const actual =
    request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  const a = Buffer.from(actual),
    b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
