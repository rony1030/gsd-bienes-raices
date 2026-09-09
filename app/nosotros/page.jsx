import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, KeyRound } from "lucide-react";
import { photos } from "@/lib/demo.mjs";

export const metadata = { title: "Nosotros" };
export default function About() {
  const values = [[Compass, "Escuchamos primero", "Cada búsqueda empieza entendiendo qué quieres construir."], [ShieldCheck, "Información clara", "Te acompañamos con contexto para tomar decisiones con confianza."], [KeyRound, "Abrimos caminos", "Coordinamos los próximos pasos para acercarte a tu lugar."]];
  return <main id="contenido" className="content-page">
    <section className="about-hero container"><div><span className="eyebrow"><i /> GSD BIENES RAÍCES</span><h1>Encontrar un lugar es también <em>encontrarse.</em></h1><p>Somos la división inmobiliaria de Geosolutions Source Dominicana. Unimos mirada local, atención cercana y herramientas para avanzar con claridad.</p><Link href="/#contacto" className="button dark">Conversemos <ArrowUpRight size={18} /></Link></div><div className="about-photo"><Image src={photos.interior} alt="Interior residencial de referencia" fill sizes="(max-width:800px) 100vw,50vw" /></div></section>
    <section className="values section"><div className="container"><span className="eyebrow">CÓMO ACOMPAÑAMOS</span><div className="value-grid">{values.map(([Icon, title, text], index) => <div key={title}><span className="value-index">0{index + 1}<Icon size={26} /></span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
  </main>;
}
