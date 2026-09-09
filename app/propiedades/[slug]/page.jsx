import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Check,
  ArrowLeft,
} from "lucide-react";
import { getProperties } from "@/lib/db.mjs";
import { Gallery, ContactForm, Favorite, money } from "@/components/site";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = (await getProperties()).find((p) => p.slug === slug);
  return { title: property?.title || "Propiedad no encontrada" };
}
export default async function Property({ params }) {
  const { slug } = await params;
  const p = (await getProperties()).find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="contenido" className="container detail-page">
      <Link className="back-link" href="/propiedades">
        <ArrowLeft size={16} /> Volver a propiedades
      </Link>
      <div className="detail-title">
        <div>
          <span className="eyebrow">
            {p.type} / {p.operation}
          </span>
          <h1>{p.title}</h1>
          <p>
            <MapPin size={16} />
            {p.location}, República Dominicana
          </p>
        </div>
        <Favorite id={p.id} />
      </div>
      <div className="detail-layout">
        <div>
          <Gallery property={p} />
          <div className="detail-specs">
            <span>
              <BedDouble /> {p.beds} habitaciones
            </span>
            <span>
              <Bath /> {p.baths} baños
            </span>
            <span>
              <Maximize /> {p.area} m²
            </span>
          </div>
          <h2>Un espacio para hacerlo tuyo.</h2>
          <p className="description">{p.description}</p>
          <h3>Lo que hace especial este lugar</h3>
          <div className="amenities">
            {p.amenities.map((x) => (
              <span key={x}>
                <Check size={17} />
                {x}
              </span>
            ))}
          </div>
          <p className="demo-note">
            Proyecto de demostración. Precio, ubicación y galería de referencia;
            no es una oferta de venta o alquiler.
          </p>
        </div>
        <aside className="inquiry">
          <span className="eyebrow">
            {p.operation === "Venta"
              ? "PRECIO DE REFERENCIA"
              : "ALQUILER MENSUAL DE REFERENCIA"}
          </span>
          <div className="detail-price">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: p.currency,
              maximumFractionDigits: 0,
            }).format(p.price)}
          </div>
          <h2>¿Te imaginas aquí?</h2>
          <p>Solicita más información o una visita.</p>
          <ContactForm property={p} />
        </aside>
      </div>
    </main>
  );
}
