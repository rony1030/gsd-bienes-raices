import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[+\d\s().-]+$/),
  message: z.string().trim().min(10).max(2000),
  propertyId: z.string().uuid().nullable().optional(),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});
export const propertySchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(3).max(160),
  location: z.string().trim().min(2).max(120),
  type: z.enum(["Villa", "Casa", "Apartamento", "Terreno", "Local"]),
  operation: z.enum(["Venta", "Alquiler"]),
  price: z.number().min(0).max(1e10),
  currency: z.enum(["USD", "DOP"]),
  beds: z.number().int().min(0).max(100),
  baths: z.number().int().min(0).max(100),
  area: z.number().positive().max(1e8),
  description: z.string().min(10).max(10000),
  images: z
    .array(
      z.union([
        z.url().refine((url) => url.startsWith("https://"), "HTTPS required"),
        z.string().regex(/^\/images\/[a-zA-Z0-9_-]+\.(jpg|png|webp)$/),
      ]),
    )
    .min(1)
    .max(20),
  amenities: z.array(z.string().max(100)).max(30),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
});
