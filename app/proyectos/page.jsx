import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
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
      <section className="page-hero container">
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
                  {p.estado === "Entrega inmediata" ? "✓ Entrega inmediata" : `⬤ En construcción`}
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
