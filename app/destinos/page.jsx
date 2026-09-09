import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { photos } from "@/lib/demo.mjs";

export const metadata = { title: "Destinos" };
const destinations = [
  ["Punta Cana", "El Caribe, todos los días", "Playas, comunidades residenciales y una vida que se abre al mar.", photos.hero],
  ["Samaná", "Conecta con lo natural", "Un destino para bajar el ritmo, respirar verde y vivir con horizonte.", photos.villa],
  ["Puerto Plata", "Tu refugio en el norte", "Historia, costa atlántica y espacios para volver a disfrutar el tiempo.", photos.home],
  ["Santo Domingo", "El pulso de la ciudad", "Conectividad, cultura y oportunidades en el centro de todo.", photos.apartment],
];
export default function Destinations() {
  return <main id="contenido" className="content-page">
    <section className="page-hero container"><span className="eyebrow"><i /> REPÚBLICA DOMINICANA</span><h1>Cuatro destinos.<br /><em>Muchas formas de vivir.</em></h1><p>Explora las zonas donde GSD está construyendo nuevas posibilidades.</p></section>
    <section className="container destination-page-grid">
      {destinations.map(([name, label, description, image], index) => <article key={name} id={name.toLowerCase().replaceAll(" ", "-")} className="destination-page-card">
        <div className="destination-page-photo"><Image src={image} alt={`Vista de referencia de ${name}`} fill sizes="(max-width:700px) 100vw,50vw" /><span>0{index + 1}</span></div>
        <div><span className="eyebrow">{label}</span><h2>{name}</h2><p>{description}</p><Link className="text-link" href={`/propiedades?ubicacion=${encodeURIComponent(name)}`}>Ver propiedades <ArrowUpRight size={18} /></Link></div>
      </article>)}
    </section>
  </main>;
}
