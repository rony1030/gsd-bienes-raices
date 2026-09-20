import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getProjects } from "@/lib/db.mjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Proyectos" };

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default async function Proyectos() {
  const projects = await getProjects();

  return (
    <main id="contenido" className="content-page">
      <section className="page-hero container proy-catalog-hero">
        <div className="proy-catalog-intro">
          <span className="eyebrow">
            <i /> DESARROLLOS EXCLUSIVOS
          </span>
          <h1>
            Proyectos que definen
            <br />
            <em>el nuevo Caribe.</em>
          </h1>
          <p>
            Más de 100 desarrollos inmobiliarios en República Dominicana.
            <br />
            GSD te conecta con el que encaja con tu inversión y estilo de vida.
          </p>
        </div>

        {/* CUADRO DESTACADO NAVY: BLINDAJE JURÍDICO & BENEFICIOS EXCLUSIVOS */}
        <aside className="proy-hero-benefit-card">
          <div className="benefit-card-tag">
            <ShieldCheck size={14} />
            <span>RESPALDO CORPORATIVO GSD</span>
          </div>

          <h3 className="benefit-card-title">
            Inversión con Blindaje Legal y Técnico Incluido
          </h3>

          <p className="benefit-card-desc">
            Cada cliente que adquiere su propiedad a través de GSD goza de acompañamiento jurídico integral y condiciones exclusivas para su patrimonio:
          </p>

          <ul className="benefit-card-list">
            <li>
              <CheckCircle2 size={16} className="benefit-icon" />
              <div>
                <strong>Due Diligence Inmobiliario Incluido</strong>
                <span>Auditoría registral completa de títulos, deslindes y licencias de construcción.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 size={16} className="benefit-icon" />
              <div>
                <strong>Revisión Notarial de Promesa y Contratos</strong>
                <span>Supervisión legal minuciosa de cláusulas de pago, penalidades y plazos de entrega.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 size={16} className="benefit-icon" />
              <div>
                <strong>Tarifas Especiales en Trámites Catastrales</strong>
                <span>Honorarios preferenciales en transferencias de títulos, deslindes y estructuración fiscal.</span>
              </div>
            </li>
          </ul>

          <div className="benefit-card-footer">
            <span className="benefit-footer-badge">100% Cero Sorpresas</span>
            <Link href="/nosotros" className="benefit-footer-link">
              Conoce nuestro equipo legal <ArrowUpRight size={14} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="container">
        <div className="proyectos-grid">
          {projects.map((p) => (
            <article key={p.slug} className={`proyecto-card${p.featured ? " featured" : ""}`}>
              <Link href={`/proyectos/${p.slug}`} className="proyecto-photo">
                <Image
                  src={p.cover_image}
                  alt={`${p.nombre} — ${p.ubicacion}`}
                  fill
                  unoptimized={p.cover_image.startsWith("http")}
                  sizes="(max-width:700px) 100vw,(max-width:1100px) 50vw,600px"
                  style={{ objectFit: "cover" }}
                />
                <span
                  className="proyecto-badge"
                  data-estado={p.estado === "Entrega inmediata" ? "listo" : "construccion"}
                >
                  {p.estado}
                </span>
              </Link>
              <div className="proyecto-body">
                <span className="eyebrow">
                  <MapPin size={12} /> {p.ubicacion}
                </span>
                <h2 className="proyecto-nombre">
                  <Link href={`/proyectos/${p.slug}`}>{p.nombre}</Link>
                </h2>
                <p className="proyecto-desc">{p.descripcion.slice(0, 130)}…</p>
                <div className="proyecto-tipologias">
                  {p.tipologias.map((t) => (
                    <span key={t} className="proyecto-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="proyecto-footer">
                  <div>
                    <span className="proyecto-precio-label">Desde</span>
                    <span className="proyecto-precio">{fmt(p.precio_desde)}</span>
                  </div>
                  <Link href={`/proyectos/${p.slug}`} className="text-link">
                    Ver proyecto <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="proyectos-cta">
          <p>¿No encuentras lo que buscas? Tenemos acceso a más de 100 proyectos.</p>
          <Link href="/#contacto" className="button dark">
            Habla con un asesor <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <style>{`
        .proy-catalog-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
          padding-top: 4rem;
          padding-bottom: 2.5rem;
        }
        .proy-catalog-intro h1 {
          font-size: clamp(38px, 4.5vw, 64px);
          line-height: 1.12;
          margin-bottom: 20px;
          color: var(--navy, #1A3A52);
        }
        .proy-catalog-intro h1 em {
          color: var(--green, #4A9B6F);
          font-style: normal;
        }
        .proy-catalog-intro p {
          color: #64748B;
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 520px;
        }

        /* CUADRO NAVY DE BENEFICIOS LEGALES */
        .proy-hero-benefit-card {
          background: linear-gradient(145deg, #102436 0%, #1A3A52 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 2rem 2.2rem;
          color: #FFFFFF;
          box-shadow: 0 16px 36px rgba(16, 36, 54, 0.22);
          position: relative;
          overflow: hidden;
        }
        .proy-hero-benefit-card::before {
          content: "";
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(13, 148, 136, 0.25) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .benefit-card-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(13, 148, 136, 0.18);
          border: 1px solid rgba(13, 148, 136, 0.4);
          color: #2DD4BF;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 0.85rem;
        }
        .benefit-card-title {
          font-size: 1.28rem;
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 0.6rem 0;
          color: #FFFFFF;
          letter-spacing: -0.2px;
        }
        .benefit-card-desc {
          font-size: 0.86rem;
          color: #CBD5E1;
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }
        .benefit-card-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.4rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .benefit-card-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .benefit-card-list .benefit-icon {
          color: #2DD4BF;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .benefit-card-list strong {
          display: block;
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 1px;
        }
        .benefit-card-list span {
          display: block;
          font-size: 0.78rem;
          color: #94A3B8;
          line-height: 1.4;
        }
        .benefit-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 10px;
        }
        .benefit-footer-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #5EEAD4;
          background: rgba(255, 255, 255, 0.06);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .benefit-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #FFFFFF;
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .benefit-footer-link:hover {
          color: #2DD4BF;
          transform: translateX(2px);
        }

        @media (max-width: 960px) {
          .proy-catalog-hero {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-top: 2.5rem;
          }
          .proy-hero-benefit-card {
            padding: 1.6rem;
          }
        }

        .proyectos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        .proyecto-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--line, #e5e7eb);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .proyecto-card:hover {
          box-shadow: 0 12px 40px rgba(26,58,82,0.12);
          transform: translateY(-3px);
        }
        .proyecto-card.featured {
          grid-column: span 2;
        }
        @media (max-width: 860px) {
          .proyecto-card.featured { grid-column: span 1; }
          .proyectos-grid { grid-template-columns: 1fr; }
        }
        .proyecto-photo {
          display: block;
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .proyecto-card.featured .proyecto-photo {
          aspect-ratio: 21/9;
        }
        .proyecto-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(255,255,255,0.95);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          letter-spacing: 0.4px;
          z-index: 1;
        }
        .proyecto-badge[data-estado="listo"] { color: #2F6B4A; }
        .proyecto-badge[data-estado="construccion"] { color: #B7791F; }
        .proyecto-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }
        .proyecto-nombre {
          font-size: 1.4rem;
          margin: 0.4rem 0 0.6rem;
          color: var(--navy, #1A3A52);
        }
        .proyecto-nombre a { color: inherit; text-decoration: none; }
        .proyecto-nombre a:hover { color: var(--green, #4A9B6F); }
        .proyecto-desc {
          color: var(--gray, #6b7280);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 0.9rem;
        }
        .proyecto-tipologias {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 1rem;
        }
        .proyecto-tag {
          font-size: 11px;
          background: var(--green-l, #E8F4EF);
          color: #2F6B4A;
          border-radius: 10px;
          padding: 2px 10px;
          font-weight: 500;
        }
        .proyecto-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid var(--line, #e5e7eb);
        }
        .proyecto-precio-label {
          font-size: 11px;
          color: var(--gray, #6b7280);
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .proyecto-precio {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--navy, #1A3A52);
        }
        .proyectos-cta {
          text-align: center;
          padding: 3rem 0 4rem;
          border-top: 1px solid var(--line, #e5e7eb);
        }
        .proyectos-cta p {
          color: var(--gray, #6b7280);
          margin-bottom: 1.2rem;
          font-size: 1rem;
        }
      `}</style>
    </main>
  );
}
