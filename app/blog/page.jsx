import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/lib/demo.mjs";

export const metadata = { title: "Blog" };
const posts = [["Guía", "Cómo elegir un destino para tu próxima propiedad", "Punta Cana, Samaná, Puerto Plata o Santo Domingo: una forma práctica de comparar posibilidades.", photos.hero], ["Vivir mejor", "Detalles que transforman la experiencia de un hogar", "Luz, distribución y espacios exteriores: qué mirar antes de coordinar una visita.", photos.home], ["Inversión", "Preguntas para hacer antes de dar el siguiente paso", "Una lista breve para llegar mejor preparado a la conversación con un asesor.", photos.apartment]];
export default function Blog() {
  return <main id="contenido" className="content-page"><section className="page-hero container"><span className="eyebrow"><i /> IDEAS PARA ENCONTRAR TU LUGAR</span><h1>Historias para<br /><em>vivir mejor.</em></h1><p>Próximamente, este espacio se actualizará desde el CRM de GSD con contenido de Bienes Raíces.</p></section><section className="container blog-grid">{posts.map(([category, title, description, image]) => <article className="blog-card" key={title}><div className="blog-photo"><Image src={image} alt="Imagen de referencia para artículo" fill sizes="(max-width:700px) 100vw,33vw" /></div><span className="eyebrow">{category}</span><h2>{title}</h2><p>{description}</p><Link className="text-link" href="/#contacto">Conocer más <ArrowUpRight size={18} /></Link></article>)}</section></main>;
}
