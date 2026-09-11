import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, KeyRound, CheckCircle2, FileSearch, Scale } from "lucide-react";
import { photos } from "@/lib/demo.mjs";

export const metadata = { title: "Nosotros · GSD Bienes Raíces" };

export default function About() {
  const pillars = [
    [ShieldCheck, "GSD Property Check", "Auditoría integral en cinco dimensiones (jurídica, registral, catastral, técnica y comercial) antes de comprometer reservas en cualquier inmueble."],
    [Scale, "Brazo Inmobiliario Integrado", "No somos una agencia que subcontrata abogados. El agrimensor, el abogado inmobiliario y el asesor comercial trabajan bajo el mismo expediente."],
    [Compass, "Venta con Expediente Limpio", "Saneamos y regularizamos cargas, deslindes o documentación antes de salir al mercado. Por eso nuestras operaciones se cierran sin contratiempos."],
    [KeyRound, "Inversión y CONFOTUR", "Evaluamos la viabilidad fiscal real de proyectos turísticos certificados para maximizar el retorno de inversionistas."],
  ];

  return (
    <main id="contenido" className="content-page">
      <section className="about-hero container">
        <div>
          <span className="eyebrow"><i /> GSD BIENES RAÍCES</span>
          <h1>Expertos en tierra, propiedad y <em>negocios.</em></h1>
          <p>
            Somos la división de bienes raíces de Geosolutions Source Dominicana. Integramos derecho inmobiliario, agrimensura y comercialización bajo una misma estructura para ofrecer inversiones seguras y verificables en República Dominicana.
          </p>
          <Link href="/#contacto" className="button dark">
            Solicitar asesoría <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="about-photo">
          <Image src={photos.interior} alt="Interior residencial de referencia GSD" fill sizes="(max-width:800px) 100vw,50vw" />
        </div>
      </section>

      <section className="values section">
        <div className="container">
          <span className="eyebrow">NUESTRA METODOLOGÍA</span>
          <div className="value-grid">
            {pillars.map(([Icon, title, text], index) => (
              <div key={title}>
                <span className="value-index">0{index + 1}<Icon size={26} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "4rem 0", borderTop: "1px solid var(--border, #eee)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <span className="eyebrow">TRANSPARENCIA TOTAL</span>
          <h2 style={{ fontSize: "2rem", margin: "0.75rem 0 1rem" }}>Gestión y Comercialización de Inmuebles</h2>
          <p style={{ color: "var(--muted, #666)", lineHeight: "1.7", marginBottom: "2rem" }}>
            Para propietarios que desean vender o administrar sus propiedades con nosotros, estructuramos planes personalizados previa auditoría documental de la propiedad. Cada acuerdo se formaliza por escrito con desglose transparente entre honorarios profesionales, trámites notariales e impuestos oficiales.
          </p>
          <Link href="/#contacto" className="button dark">
            Evaluar mi propiedad <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
