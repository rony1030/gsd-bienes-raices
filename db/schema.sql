CREATE SCHEMA IF NOT EXISTS real_estate;
CREATE TABLE IF NOT EXISTS real_estate.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL, location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Villa','Casa','Apartamento','Terreno','Local')),
  operation TEXT NOT NULL CHECK (operation IN ('Venta','Alquiler')),
  price NUMERIC(14,2) NOT NULL CHECK (price >= 0),
  currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD','DOP')),
  beds INTEGER NOT NULL DEFAULT 0, baths INTEGER NOT NULL DEFAULT 0,
  area NUMERIC(14,2) NOT NULL, description TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]', amenities JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS properties_public_idx ON real_estate.properties(status, featured, created_at DESC);
CREATE TABLE IF NOT EXISTS real_estate.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, message TEXT NOT NULL,
  property_id UUID REFERENCES real_estate.properties(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'gsd-bienes-raices',
  status TEXT NOT NULL DEFAULT 'nuevo' CHECK(status IN ('nuevo','contactado','calificado','cerrado')),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT now(), created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_created_idx ON real_estate.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON real_estate.leads(email, created_at DESC);
ALTER TABLE real_estate.properties ADD COLUMN IF NOT EXISTS demo BOOLEAN NOT NULL DEFAULT FALSE;
