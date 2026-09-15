import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  LandPlot,
  Scale,
  FileCheck2,
  Building2,
  Gavel,
  ShieldCheck,
  CheckCircle2,
  Target,
  Eye,
  Compass,
  Clock,
  Search,
  Handshake,
  Award,
} from "lucide-react";
import { photos } from "@/lib/demo.mjs";

export const metadata = {
  title: "Nosotros · Quiénes Somos | GSD Bienes Raíces",
  description:
    "Somos expertos en tierra. Geosolutions Source Dominicana integra el pilar técnico, legal y registral bajo una misma firma en Punta Cana y con alcance nacional.",
};

export default function About() {
  const pilares = [
    {
      num: "01",
      name: "Técnico",
      subtitle: "Dirección Nacional de Mensuras Catastrales",
      icon: LandPlot,
      desc: "Levantamientos catastrales con equipo GNSS propio de alta precisión, deslindes, subdivisiones, refundiciones, replanteos topográficos y planos certificados para régimen de condominio.",
      tag: "Precisión GNSS Propia",
    },
    {
      num: "02",
      name: "Legal",
      subtitle: "Tribunales de Tierras y Jurisdicción Inmobiliaria",
      icon: Scale,
      desc: "Protegemos el patrimonio desde el derecho: Litis sobre derechos registrados, saneamiento, regularización y controversias inmobiliarias. Asesoría preventiva en Derecho Civil, Comercial y Corporativo.",
      tag: "Estrategia Jurídica",
    },
    {
      num: "03",
      name: "Registral",
      subtitle: "Registro de Títulos",
      icon: FileCheck2,
      desc: "Depuración y transferencia de títulos, cancelación de hipotecas y gravámenes, inscripción de derechos reales y seguimiento continuo del expediente hasta la emisión definitiva del certificado.",
      tag: "Seguridad Registral",
    },
  ];

  const serviciosClave = [
    {
      icon: Building2,
      title: "Asesoría integral al desarrollador",
      desc: "Due diligence inmobiliario previo a la adquisición, estructuración jurídica del proyecto, documentación contractual de la comercialización y acompañamiento riguroso hasta la entrega de la última unidad.",
    },
    {
      icon: Gavel,
      title: "Litigios inteligentes",
      desc: "No todo conflicto se gana en estrados, y ninguno se gana por desgaste. Antes de litigar evaluamos qué se persigue, qué cuesta obtenerlo y por qué vía se consigue más rápido. Cuando hay que litigar, lo hacemos con la ventaja decisiva de que el sustento técnico del caso lo produximos nosotros mismos.",
    },
  ];

  const valores = [
    {
      icon: Award,
      title: "Pericia integral",
      desc: "Dominamos los tres pilares del inmueble. Nada de lo que define el resultado del caso sale de la firma.",
    },
    {
      icon: ShieldCheck,
      title: "Autosuficiencia",
      desc: "El cliente no coordina especialistas ni concilia versiones divergentes. Nosotros ya lo hicimos.",
    },
    {
      icon: Clock,
      title: "Celeridad",
      desc: "En desarrollo inmobiliario, el tiempo es capital inmovilizado. Fijamos plazos, los comunicamos y respondemos por ellos.",
    },
    {
      icon: Search,
      title: "Transparencia",
      desc: "El cliente sabe siempre dónde está su expediente, qué falta y qué cuesta. Cero costos imprevistos.",
    },
    {
      icon: Handshake,
      title: "Compromiso",
      desc: "Asumimos el caso como propio. La firma responde por el resultado, no por las horas invertidas.",
    },
    {
      icon: Compass,
      title: "Criterio",
      desc: "Decimos lo que el caso aconseja, no lo que el cliente quiere oír. La única asesoría que vale lo que cuesta.",
    },
  ];

  const objetivos = [
    "Autoridad reconocida en condominios, desarrollos y derecho inmobiliario, sostenida por criterio técnico verificable y no por volumen publicitario.",
    "Capacidad técnica propia, con instrumentación GNSS y metodología que permite responder con precisión y plazos que el mercado no ofrece.",
    "Dominio completo del expediente, desde la mensura en campo hasta la inscripción del derecho, ejecutado y documentado íntegramente dentro de la firma.",
    "Relaciones de largo plazo con desarrolladores, notarios e instituciones financieras, construidas sobre resultados sostenidos y no sobre transacciones aisladas.",
  ];

  return (
    <main id="contenido" className="content-page nosotros-page">
      {/* Hero Principal */}
      <section className="about-hero container">
        <div className="about-hero-copy">
          <span className="eyebrow">
            <i /> QUIÉNES SOMOS · GEOSOLUTIONS SOURCE DOMINICANA, S.R.L.
          </span>
          <h1>
            Somos expertos en <em>tierra.</em>
          </h1>
          <p className="about-lead">
            Firma dominicana especializada en la materia inmobiliaria, con
            operación en Punta Cana y alcance nacional.
          </p>
          <div className="about-callout-quote">
            <p>
              <strong>Un solo interlocutor, un solo expediente, una sola firma que responde por el resultado.</strong> Nuestro cliente no contrata un abogado cuando surge el litigio, ni busca un agrimensor cuando hace falta la mensura, ni persigue a un tercero cuando el título necesita depuración.
            </p>
          </div>
          <p className="about-audience">
            Trabajamos para desarrolladores, inversionistas y empresas que operan
            proyectos de alto valor, y para propietarios que necesitan certeza
            absoluta sobre lo que les pertenece.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/#contacto" className="button dark">
              Consultar con la firma <ArrowUpRight size={18} />
            </Link>
            <Link href="/propiedades" className="button secondary">
              Ver portafolio de propiedades
            </Link>
          </div>
        </div>
        <div className="about-photo">
          <Image
            src={photos.interior}
            alt="Sede y proyectos respaldados por GSD Dominicana"
            fill
            priority
            sizes="(max-width:800px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Los Tres Pilares */}
      <section className="about-section bg-light">
        <div className="container">
          <div className="section-heading-center">
            <span className="eyebrow">EL NÚCLEO DE NUESTRA PRÁCTICA</span>
            <h2>Los Tres Pilares de la Jurisdicción Inmobiliaria</h2>
            <p className="section-desc">
              La jurisdicción inmobiliaria dominicana descansa sobre tres
              pilares fundamentales. La mayoría de los despachos cubre solo uno.
              <strong> Nosotros ejercemos los tres.</strong>
            </p>
          </div>

          <div className="pillars-cards-grid">
            {pilares.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.num} className="pillar-card">
                  <div className="pillar-bg-icon" aria-hidden="true">
                    <Icon size={165} strokeWidth={1.2} />
                  </div>
                  <div className="pillar-header">
                    <span className="pillar-num">{p.num}</span>
                    <span className="pillar-tag">{p.tag}</span>
                  </div>
                  <h3>Pilar {p.name}</h3>
                  <h4 className="pillar-sub">{p.subtitle}</h4>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qué Hacemos: Servicios Clave */}
      <section className="about-section">
        <div className="container">
          <div className="section-heading-center">
            <span className="eyebrow">QUÉ HACEMOS</span>
            <h2>Todo lo que un inmueble exige, en un solo lugar.</h2>
            <p className="section-desc">
              Porque un inmueble seguro comienza con un derecho bien protegido
              y un sustento técnico irrefutable.
            </p>
          </div>

          <div className="about-specialties-grid">
            {serviciosClave.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="specialty-card">
                  <div className="specialty-icon-box">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objeto, Misión y Visión */}
      <section className="about-section about-mv-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card main-objeto">
              <span className="eyebrow">
                <i /> NUESTRO OBJETO
              </span>
              <h2>Que la tierra deje de ser un riesgo y vuelva a ser un activo.</h2>
              <p>
                Reunimos los tres pilares del inmueble bajo una sola firma,
                porque el problema del cliente nunca llega separado por
                especialidades, y resolverlo por partes es lo que lo vuelve caro,
                lento e incierto.
              </p>
            </div>

            <div className="mv-card">
              <div className="mv-icon-row">
                <span className="mv-icon-badge">
                  <Target size={22} />
                </span>
                <h3>Misión</h3>
              </div>
              <p>
                Proteger y potenciar el valor de la propiedad inmobiliaria de
                nuestros clientes, integrando en una sola firma la precisión
                técnica del levantamiento, la defensa jurídica del derecho y la
                depuración registral del título, de modo que adquirir,
                desarrollar o defender un inmueble deje de ser una fuente de
                incertidumbre.
              </p>
              <p style={{ marginTop: "1rem", color: "var(--muted)" }}>
                Trabajamos para que cada cliente conozca en todo momento el
                estado de su expediente, entienda lo que está en juego y pueda
                decidir sobre información cierta.
              </p>
            </div>

            <div className="mv-card">
              <div className="mv-icon-row">
                <span className="mv-icon-badge">
                  <Eye size={22} />
                </span>
                <h3>Visión</h3>
              </div>
              <p>
                Ser la firma de referencia en materia inmobiliaria de la
                República Dominicana y la primera opción de los desarrolladores
                que construyen el país.
              </p>
              <p style={{ marginTop: "1rem", color: "var(--muted)" }}>
                Aspiramos a que, cuando se hable de condominios, desarrollos,
                deslindes o conflictos sobre la tierra, el criterio de GSD sea
                el criterio que se consulta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="about-section">
        <div className="container">
          <div className="section-heading-center">
            <span className="eyebrow">NUESTROS PRINCIPIOS</span>
            <h2>Valores que definen cada intervención</h2>
            <p className="section-desc">
              Rigor técnico, ética jurídica y transparencia irrestricta en cada
              etapa del proceso inmobiliario.
            </p>
          </div>

          <div className="about-values-grid">
            {valores.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="about-value-item">
                  <div className="about-value-top">
                    <span className="about-value-icon">
                      <Icon size={22} />
                    </span>
                    <h3>{v.title}</h3>
                  </div>
                  <p>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objetivos Estratégicos */}
      <section className="about-section bg-light">
        <div className="container">
          <div className="about-objectives-layout">
            <div>
              <span className="eyebrow">PROPÓSITO ESTRATÉGICO</span>
              <h2>Consolidar a GSD como la empresa preferida de los desarrolladores inmobiliarios</h2>
              <p style={{ color: "var(--muted, #666)", lineHeight: "1.7", marginTop: "1rem" }}>
                En la República Dominicana, la seguridad jurídica de un proyecto
                se construye desde el primer punto geodésico hasta el último
                asiento registral.
              </p>
            </div>
            <div className="objectives-list">
              {objetivos.map((obj, i) => (
                <div key={i} className="objective-item">
                  <span className="obj-check">
                    <CheckCircle2 size={20} />
                  </span>
                  <p>{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asesoría y Seguridad Patrimonial - Banner de Alto Valor */}
      <section className="container" style={{ margin: "4rem auto 6rem" }}>
        <div className="promise-banner">
          <span className="eyebrow">
            <i /> ASESORÍA Y SEGURIDAD PATRIMONIAL
          </span>
          <h2>Invierta con certeza técnica, respaldo legal y rentabilidad verificada.</h2>
          <p className="promise-lead">
            En Geosolutions Source Dominicana transformamos la tierra en un activo seguro y rentable.
            Antes de comprometer su capital o firmar cualquier reserva, nuestro equipo multidisciplinario
            audita el historial del inmueble, certifica la mensura en campo y estructura contratos blindados.
          </p>

          <div className="promise-guarantees">
            <div className="guarantee-item">
              <span className="guarantee-icon">
                <FileCheck2 size={22} />
              </span>
              <div>
                <strong>Auditoría Registral Previa</strong>
                <p>Depuración exhaustiva de títulos, gravámenes, hipotecas y sucesiones ante el Registro de Títulos.</p>
              </div>
            </div>

            <div className="guarantee-item">
              <span className="guarantee-icon">
                <LandPlot size={22} />
              </span>
              <div>
                <strong>Precisión Catastral GNSS</strong>
                <p>Verificación milimétrica de linderos y superficie con instrumentación geodésica propia.</p>
              </div>
            </div>

            <div className="guarantee-item">
              <span className="guarantee-icon">
                <ShieldCheck size={22} />
              </span>
              <div>
                <strong>Blindaje Contractual Integral</strong>
                <p>Acompañamiento legal de punta a punta: desde la debida diligencia hasta el certificado definitivo.</p>
              </div>
            </div>
          </div>

          <div className="promise-actions">
            <Link href="/#contacto" className="button dark">
              Solicitar Asesoría Inmobiliaria <ArrowUpRight size={18} />
            </Link>
            <a
              href="https://wa.me/18294937254?text=Hola%2C%20quisiera%20recibir%20asesor%C3%ADa%20para%20una%20inversi%C3%B3n%20inmobiliaria%20con%20GSD."
              target="_blank"
              rel="noopener noreferrer"
              className="button secondary"
            >
              Consultar vía WhatsApp (829) 493-7254
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
