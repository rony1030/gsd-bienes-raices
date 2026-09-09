import { Catalog } from "@/components/site";
import { getProperties } from "@/lib/db.mjs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Propiedades" };
export default async function Properties({ searchParams }) {
  const [properties, initial] = await Promise.all([
    getProperties(),
    searchParams,
  ]);
  return (
    <main id="contenido" className="container catalog-page">
      <span className="eyebrow">
        <i /> ENCUENTRA TU LUGAR
      </span>
      <h1>Espacios con posibilidades.</h1>
      <p className="catalog-intro">
        Apartamentos, casas y villas para tu próximo capítulo.
      </p>
      <p className="demo-note">
        Demo · Proyectos y fotografías ilustrativos, sin oferta comercial.
      </p>
      <Catalog properties={properties} initial={initial} />
    </main>
  );
}
