import { z } from "zod";
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(254).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[+\d\s().-]+$/),
  message: z.string().trim().max(2000).optional().default(""),
  propertyId: z.string().uuid().nullable().optional(),
  consent: z.boolean().optional().default(true),
  website: z.string().max(0).optional(),
  service: z.string().max(200).optional(),
  clientType: z.string().max(100).optional(),
  formSource: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  purpose: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  paymentVision: z.string().max(2000).optional(),
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
  condition_type: z.string().max(100).optional().default("Listo"),
  city: z.string().max(100).optional().default(""),
  province: z.string().max(100).optional().default(""),
  sector: z.string().max(100).optional().default(""),
  parkinglot: z.number().int().min(0).max(100).optional().default(0),
  terrain_area: z.number().min(0).max(1e8).optional().default(0),
  tour_3d: z.string().max(500).optional().default(""),
  short_description: z.string().max(500).optional().default(""),
  featured_image: z.string().max(500).optional().default(""),
  meta_title: z.string().max(120).optional().default(""),
  meta_description: z.string().max(300).optional().default(""),
  keywords: z.string().max(300).optional().default(""),
  seo_score: z.number().int().min(0).max(100).optional().default(0),
});

