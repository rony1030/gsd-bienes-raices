import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, Calendar, Building2, CheckCircle2, ChevronLeft } from "lucide-react";
import { getProjects } from "@/lib/db.mjs";
import { ContactForm } from "@/components/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const projects = await getProjects();
  const p = projects.find((x) => x.slug === resolvedParams.slug);
  if (!p) return { title: "Proyecto no encontrado" };
  return {
    title: `${p.nombre} — GSD Real Estate`,
    description: p.descripcion,
  };
}

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default async function ProyectoDetalle({ params }) {
  const resolvedParams = await params;
  const projects = await getProjects();
  const p = projects.find((x) => x.slug === resolvedParams.slug);
  if (!p) notFound();

  const otros = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <main id="contenido">
      {/* HERO */}
      <section className="proy-hero">
        <Image
          src={p.cover_image}
          alt={`${p.nombre} — ${p.ubicacion}`}
          fill
          unoptimized={p.cover_image.startsWith("http")}
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="proy-hero-overlay" />
        <div className="proy-hero-content container">
          <Link href="/proyectos" className="proy-back">
            <ChevronLeft size={16} /> Todos los proyectos
          </Link>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
            <MapPin size={13} /> {p.ubicacion}
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.2rem,6vw,4rem)", marginTop: "0.3rem" }}>
            {p.nombre}
          </h1>
          <div className="proy-hero-badges">
            <span
              className="proyecto-badge"
              data-estado={p.estado === "Entrega inmediata" ? "listo" : "construccion"}
            >
              {p.estado === "Entrega inmediata" ? "✓ Entrega inmediata" : "⬤ En construcción"}
            </span>
            <span className="proyecto-badge" style={{ color: "#1A3A52" }}>
              <Calendar size={11} /> Entrega {p.entrega}
            </span>
          </div>
        </div>
      </section>

      {/* CONTENIDO + SIDEBAR */}
      <div className="container proy-layout">
        {/* Contenido editorial */}
        <article className="proy-content">
          <p className="proy-intro">{p.descripcion}</p>

          {/* Galería */}
          {p.galeria?.length > 0 && (
            <section className="proy-gallery">
              <h2 className="proy-section-title">Galería</h2>
              <div className="proy-gallery-grid">
                {p.galeria.map((img, i) => (
                  <div key={i} className="proy-gallery-item">
                    <Image
                      src={img}
                      alt={`${p.nombre} — vista ${i + 1}`}
                      fill
                      unoptimized={img.startsWith("http")}
                      sizes="(max-width:700px) 100vw,50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Amenidades */}
          {p.amenidades?.length > 0 && (
            <section className="proy-amenidades">
              <h2 className="proy-section-title">Amenidades</h2>
              <ul className="proy-amenidades-list">
                {p.amenidades.map((a) => (
                  <li key={a}>
                    <CheckCircle2 size={15} style={{ color: "var(--green, #4A9B6F)", flexShrink: 0 }} />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Otros proyectos */}
          {otros.length > 0 && (
            <section className="proy-otros">
              <h2 className="proy-section-title">Otros proyectos</h2>
              <div className="proy-otros-grid">
                {otros.map((o) => (
                  <Link key={o.slug} href={`/proyectos/${o.slug}`} className="proy-otro-card">
                    <div className="proy-otro-img">
                      <Image
                        src={o.cover_image}
                        alt={o.nombre}
                        fill
                        unoptimized={o.cover_image.startsWith("http")}
                        sizes="200px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", color: "var(--gray)", display: "block" }}>
                        {o.ubicacion}
                      </span>
                      <strong style={{ color: "var(--navy)" }}>{o.nombre}</strong>
                      <span style={{ display: "block", fontSize: "12px", color: "var(--green, #4A9B6F)", marginTop: 2 }}>
                        Desde {fmt(o.precio_desde)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar sticky */}
        <aside className="proy-sidebar">
          <div className="proy-sidebar-card">
            <div className="proy-sidebar-precio">
              <span>Precio desde</span>
              <strong>{fmt(p.precio_desde)}</strong>
            </div>
            <div className="proy-sidebar-info">
              <div>
                <span className="k">Promotor</span>
                <span className="v">{p.promotor}</span>
              </div>
              <div>
                <span className="k">Estado</span>
                <span className="v">{p.estado}</span>
              </div>
              <div>
                <span className="k">Entrega</span>
                <span className="v">{p.entrega}</span>
              </div>
              <div>
                <span className="k">Tipologías</span>
                <span className="v">{p.tipologias.join(", ")}</span>
              </div>
            </div>
            <Link href="/#contacto" className="button dark" style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1rem" }}>
              Solicitar información <ArrowUpRight size={16} />
            </Link>
            <Link href="/#contacto" className="text-link" style={{ display: "flex", justifyContent: "center", marginTop: "0.8rem", fontSize: "0.85rem" }}>
              Agendar una visita <ArrowUpRight size={14} />
            </Link>
          </div>
        </aside>
      </div>

      <style>{`
        .proy-hero {
          position: relative;
          height: 70vh;
          min-height: 420px;
          display: flex;
          align-items: flex-end;
        }
        .proy-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.25) 55%, transparent 100%);
          pointer-events: none;
        }
        .proy-hero-content {
          position: relative;
          z-index: 1;
          padding-bottom: 3rem;
        }
        .proy-back {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: rgba(255,255,255,0.75);
          font-size: 0.82rem;
          text-decoration: none;
          margin-bottom: 1rem;
          letter-spacing: 0.3px;
          transition: color 0.15s;
        }
        .proy-back:hover { color: #fff; }
        .proy-hero-badges {
          display: flex;
          gap: 8px;
          margin-top: 0.8rem;
          flex-wrap: wrap;
        }
        .proy-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
          padding-top: 3rem;
          padding-bottom: 4rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .proy-layout { grid-template-columns: 1fr; }
          .proy-sidebar { order: -1; }
        }
        .proy-intro {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--gray, #6b7280);
          margin-bottom: 2.5rem;
          border-left: 3px solid var(--green, #4A9B6F);
          padding-left: 1.2rem;
        }
        .proy-section-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--navy, #1A3A52);
          margin-bottom: 1.2rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--green, #4A9B6F);
        }
        .proy-gallery { margin-bottom: 2.5rem; }
        .proy-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
        }
        .proy-gallery-item {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 10px;
          overflow: hidden;
        }
        .proy-amenidades { margin-bottom: 2.5rem; }
        .proy-amenidades-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px 20px;
        }
        .proy-amenidades-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: var(--ink, #1f2937);
        }
        .proy-otros { margin-bottom: 2rem; }
        .proy-otros-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .proy-otro-card {
          display: flex;
          gap: 14px;
          align-items: center;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid var(--line, #e5e7eb);
          text-decoration: none;
          transition: background 0.15s;
        }
        .proy-otro-card:hover { background: var(--bg, #f9fafb); }
        .proy-otro-img {
          position: relative;
          width: 70px;
          height: 55px;
          border-radius: 7px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .proy-sidebar-card {
          background: #fff;
          border: 1px solid var(--line, #e5e7eb);
          border-radius: 16px;
          padding: 1.5rem;
          position: sticky;
          top: 90px;
          box-shadow: 0 4px 20px rgba(26,58,82,0.07);
        }
        .proy-sidebar-precio {
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--line, #e5e7eb);
          margin-bottom: 1rem;
        }
        .proy-sidebar-precio span {
          font-size: 11px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
        }
        .proy-sidebar-precio strong {
          font-size: 1.6rem;
          color: var(--navy, #1A3A52);
          font-weight: 700;
        }
        .proy-sidebar-info {
          display: grid;
          gap: 0.6rem;
          font-size: 0.82rem;
        }
        .proy-sidebar-info div {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 4px;
        }
        .proy-sidebar-info .k { color: var(--gray); }
        .proy-sidebar-info .v { color: var(--ink, #1f2937); font-weight: 500; }
        .proyecto-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.95);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          letter-spacing: 0.4px;
        }
        .proyecto-badge[data-estado="listo"] { color: #2F6B4A; }
        .proyecto-badge[data-estado="construccion"] { color: #B7791F; }
      `}</style>
    </main>
  );
}
