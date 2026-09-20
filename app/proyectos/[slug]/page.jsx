import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowUpRight, MapPin, Calendar, Building2, CheckCircle2, ChevronLeft, 
  ShieldCheck, Percent, Layers, Home, Phone, Download, Compass, Clock, Check,
  Waves, Dumbbell, Sparkles, BellRing, Palmtree, Sun, Laptop, UtensilsCrossed,
  Car, Wine, Coffee, Wifi, Trees, Flame, Tv, Lock, HeartHandshake, Anchor, Plane, Footprints, Droplets,
  Briefcase, Users, Flower2
} from "lucide-react";
import { getProjects } from "@/lib/db.mjs";
import { ProjectLeadCard } from "@/components/site.jsx";

export const dynamic = "force-dynamic";

function getAmenityIcon(item) {
  const text = (typeof item === "string" ? item : item?.name || "").toLowerCase();
  const iconProps = { size: 18, strokeWidth: 1.8, style: { color: "var(--navy, #1A3A52)" } };
  
  if (text.includes("piscina") || text.includes("pool") || text.includes("jacuzzi") || text.includes("agua")) {
    return <Waves {...iconProps} />;
  }
  if (text.includes("gym") || text.includes("fitness") || text.includes("ejercicio") || text.includes("wellness")) {
    return <Dumbbell {...iconProps} />;
  }
  if (text.includes("spa") || text.includes("sauna") || text.includes("masaje") || text.includes("relax")) {
    return <Flower2 {...iconProps} />;
  }
  if (text.includes("concierge") || text.includes("recepci") || text.includes("lobby") || text.includes("asistencia")) {
    return <BellRing {...iconProps} />;
  }
  if (text.includes("playa") || text.includes("beach") || text.includes("mar") || text.includes("costa")) {
    return <Sun {...iconProps} />;
  }
  if (text.includes("coworking") || text.includes("business") || text.includes("oficina") || text.includes("lounge")) {
    return <Briefcase {...iconProps} />;
  }
  if (text.includes("seguridad") || text.includes("camara") || text.includes("vigilancia") || text.includes("acceso")) {
    return <ShieldCheck {...iconProps} />;
  }
  if (text.includes("restaurante") || text.includes("bar") || text.includes("gourmet") || text.includes("comida")) {
    return <UtensilsCrossed {...iconProps} />;
  }
  if (text.includes("parqueo") || text.includes("estacionamiento") || text.includes("garaje") || text.includes("valet") || text.includes("vehiculo")) {
    return <Car {...iconProps} />;
  }
  if (text.includes("jardin") || text.includes("sender") || text.includes("parque") || text.includes("verde") || text.includes("naturaleza")) {
    return <Trees {...iconProps} />;
  }
  if (text.includes("marina") || text.includes("muelle") || text.includes("bote") || text.includes("yate")) {
    return <Anchor {...iconProps} />;
  }
  if (text.includes("helipuerto") || text.includes("helipad") || text.includes("aeropuerto")) {
    return <Plane {...iconProps} />;
  }
  if (text.includes("bbq") || text.includes("parrilla") || text.includes("rooftop") || text.includes("terraza")) {
    return <Flame {...iconProps} />;
  }
  if (text.includes("wifi") || text.includes("internet") || text.includes("domotica") || text.includes("smart")) {
    return <Wifi {...iconProps} />;
  }
  return <Building2 {...iconProps} />;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const projects = await getProjects();
  const p = projects.find((x) => x.slug === resolvedParams.slug);
  if (!p) return { title: "Proyecto no encontrado" };
  return {
    title: `${p.nombre} — Desarrollos Exclusivos | GSD Real Estate`,
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

  // Extract blocks or construct default luxury blocks
  const bloques = Array.isArray(p.bloques) && p.bloques.length > 0 ? p.bloques : [
    {
      id: "blk_met",
      type: "metricas",
      title: "Métricas Clave & Beneficios de Inversión",
      items: [
        { label: "Superficie desde", value: "72 m²", sub: "Apartamentos & Penthouses" },
        { label: "Retorno Estimado", value: "11.5% Anual", sub: "Rentabilidad vacacional" },
        { label: "Ley Confotur", value: "15 Años Exento", sub: "0% IPI y 0% Transferencia" },
        { label: "Distancia Playa", value: "3 Minutos", sub: "Acceso directo a Bávaro" }
      ]
    },
    {
      id: "blk_tip",
      type: "tipologias",
      title: "Tipologías de Unidades & Planos Arquitectónicos",
      units: [
        {
          name: "Suite 1 Habitación",
          area: "72 m²",
          habs: "1 Hab · 1.5 Baños",
          precio: `Desde ${fmt(p.precio_desde || 180000)}`,
          plano_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
          desc: "Balcón panorámico, sala-comedor integrada, cocina modular importada y acabados de lujo."
        },
        {
          name: "Apartamento 2 Habitaciones",
          area: "115 m²",
          habs: "2 Habs · 2.5 Baños · 1 Pq",
          precio: `Desde ${fmt((p.precio_desde || 180000) * 1.35)}`,
          plano_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
          desc: "Habitación principal con walk-in closet, terraza amplia con vista a la piscina y family room."
        },
        {
          name: "Penthouse Exclusivo con Rooftop",
          area: "190 m²",
          habs: "3 Habs · 3.5 Baños · Jacuzzi",
          precio: `Desde ${fmt((p.precio_desde || 180000) * 1.95)}`,
          plano_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
          desc: "Doble altura, terraza privada con picuzzi y zona BBQ con vista 360° al mar Caribe."
        }
      ]
    },
    {
      id: "blk_amen",
      type: "amenidades",
      title: "Amenidades de Estilo Resort & Bienestar",
      items: p.amenidades?.length > 0 ? p.amenidades : [
        "Piscina infinita central", "Gym & Fitness Center", "Spa & Zona Wellness",
        "Club de Playa privado", "Concierge 24/7", "Coworking & Lounge",
        "Seguridad perimetral con cámaras", "Restaurante gourmet"
      ]
    },
    {
      id: "blk_pago",
      type: "plan_pago",
      title: "Estructura del Plan de Pago",
      steps: [
        { pct: "US$3,000", title: "Reserva", desc: "Bloqueo de unidad en inventario" },
        { pct: "20%", title: "Firma de Contrato", desc: "Completado a los 30 días" },
        { pct: "40%", title: "Durante Construcción", desc: "En cómodas cuotas mensuales" },
        { pct: "40%", title: "Contra Entrega", desc: "Financiamiento bancario disponible" }
      ]
    },
    {
      id: "blk_dist",
      type: "distancias",
      title: "Ubicación Estratégica & Puntos de Interés",
      points: [
        { place: "Playa Bávaro / Los Corales", time: "3 min" },
        { place: "Aeropuerto Internacional PUJ", time: "15 min" },
        { place: "Downtown Punta Cana / Coco Bongo", time: "8 min" },
        { place: "BlueMall Punta Cana", time: "14 min" },
        { place: "Centro Médico Internacional", time: "6 min" }
      ]
    }
  ];

  const wpMessage = encodeURIComponent(
    `Hola Esteban / GSD Real Estate, me interesa recibir más información y disponibilidad del proyecto ${p.nombre} en ${p.ubicacion} (Ref: ${p.slug}).`
  );

  return (
    <main id="contenido">
      {/* HERO SECTION */}
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
            <ChevronLeft size={16} /> Catálogo de Proyectos
          </Link>
          <div className="proy-hero-eyebrow">
            <MapPin size={13} /> {p.ubicacion} · {p.promotor}
          </div>
          <h1 className="proy-hero-title">
            {p.nombre}
          </h1>
          <div className="proy-hero-badges">
            <span className="proy-tag-pill">
              {p.estado}
            </span>
            <span className="proy-tag-pill">
              Entrega {p.entrega}
            </span>
            <span className="proy-tag-pill">
              Soporte Legal GSD
            </span>
          </div>
        </div>
      </section>

      {/* SUB-NAV ANCHOR BAR */}
      <nav className="proy-subnav-bar">
        <div className="container proy-subnav-inner">
          <a href="#vision" className="proy-nav-link">Visión General</a>
          <a href="#metricas" className="proy-nav-link">Métricas</a>
          <a href="#tipologias" className="proy-nav-link">Tipologías & Planos</a>
          <a href="#amenidades" className="proy-nav-link">Amenidades</a>
          <a href="#plan-pago" className="proy-nav-link">Plan de Pago</a>
          <a href="#ubicacion" className="proy-nav-link">Ubicación</a>
          {p.galeria?.length > 0 && <a href="#galeria" className="proy-nav-link">Galería</a>}
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="container proy-layout">
        
        {/* EDITORIAL CONTENT & DYNAMIC FLEXBOX BLOCKS */}
        <article className="proy-content">
          
          {/* VISIÓN GENERAL */}
          <section id="vision" className="proy-section">
            <span className="eyebrow" style={{ color: "var(--green, #4A9B6F)" }}>Concepto & Arquitectura</span>
            <h2 className="proy-main-heading">Una experiencia residencial diseñada para trascender</h2>
            <p className="proy-intro">{p.descripcion}</p>
          </section>

          {/* DYNAMIC FLEXBOX BLOCKS RENDERER */}
          {bloques.map((b, bIdx) => {
            
            // 1. MÉTRICAS CLAVE
            if (b.type === "metricas") {
              return (
                <section key={b.id || bIdx} id="metricas" className="proy-section proy-metrics-container">
                  <h3 className="proy-section-title">{b.title}</h3>
                  <div className="proy-metrics-grid">
                    {(b.items || []).map((it, i) => (
                      <div key={i} className="proy-metric-card">
                        <span className="metric-label">{it.label}</span>
                        <strong className="metric-value">{it.value}</strong>
                        <span className="metric-sub">{it.sub}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // 2. TIPOLOGÍAS & PLANOS
            if (b.type === "tipologias") {
              return (
                <section key={b.id || bIdx} id="tipologias" className="proy-section">
                  <h3 className="proy-section-title">{b.title}</h3>
                  <div className="proy-units-grid">
                    {(b.units || []).map((u, i) => (
                      <div key={i} className="proy-unit-card">
                        {u.plano_url && (
                          <div className="proy-unit-image-wrap">
                            <Image
                              src={u.plano_url}
                              alt={u.name}
                              fill
                              unoptimized={u.plano_url.startsWith("http")}
                              sizes="(max-width:768px) 100vw, 400px"
                              style={{ objectFit: "cover" }}
                            />
                            <span className="unit-badge-area">{u.area}</span>
                          </div>
                        )}
                        <div className="proy-unit-body">
                          <h4 className="unit-name">{u.name}</h4>
                          <span className="unit-habs">{u.habs}</span>
                          <p className="unit-desc">{u.desc}</p>
                          <div className="unit-footer">
                            <span className="unit-price">{u.precio}</span>
                            <a 
                              href={`https://wa.me/18294937254?text=${encodeURIComponent(`Hola, solicito información del modelo ${u.name} en ${p.nombre}.`)}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="unit-cta"
                            >
                              Cotizar unidad <ArrowUpRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // 3. AMENIDADES RESORT
            if (b.type === "amenidades") {
              return (
                <section key={b.id || bIdx} id="amenidades" className="proy-section">
                  <h3 className="proy-section-title">{b.title}</h3>
                  <div className="proy-amenities-grid">
                    {(b.items || []).map((amenity, i) => (
                      <div key={i} className="proy-amenity-card">
                        <div className="amenity-icon-wrap">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="amenity-text">{typeof amenity === "string" ? amenity : amenity?.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // 4. PLAN DE PAGO
            if (b.type === "plan_pago") {
              return (
                <section key={b.id || bIdx} id="plan-pago" className="proy-section proy-payment-section-white">
                  <h3 className="proy-section-title">
                    {b.title}
                  </h3>
                  <div style={{ margin: "0.4rem 0 1.5rem" }}>
                    <strong style={{ display: "block", color: "var(--navy, #1A3A52)", fontSize: "1.05rem", fontWeight: "700", marginBottom: "4px" }}>
                      Solicita el plan de pago acorde a tu capacidad de pago
                    </strong>
                    <span style={{ color: "#64748B", fontSize: "0.9rem" }}>
                      Estructura de pagos escalonada adaptada a inversionistas locales e internacionales.
                    </span>
                  </div>
                  <div className="proy-payment-grid-white">
                    {(b.steps || []).map((step, i) => (
                      <div key={i} className="payment-step-card-white">
                        <span className="step-num-white">Hito 0{i + 1}</span>
                        <strong className="step-pct-white">{step.pct}</strong>
                        <span className="step-title-white">{step.title}</span>
                        <small className="step-desc-white">{step.desc}</small>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // 5. DISTANCIAS & ENTORNO
            if (b.type === "distancias") {
              return (
                <section key={b.id || bIdx} id="ubicacion" className="proy-section">
                  <h3 className="proy-section-title">{b.title}</h3>
                  <div className="proy-distances-grid">
                    {(b.points || []).map((pt, i) => (
                      <div key={i} className="distance-card">
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="dist-place">
                          <Compass size={16} style={{ color: "var(--green, #4A9B6F)", flexShrink: 0 }} />
                          <span>{pt.place}</span>
                        </div>
                        <strong className="dist-time">{pt.time}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // 6. TEXTO EDITORIAL
            if (b.type === "editorial") {
              return (
                <section key={b.id || bIdx} className="proy-section proy-editorial-block">
                  {b.heading && <h3 className="proy-section-title">{b.heading}</h3>}
                  <div className="editorial-text">{b.content}</div>
                </section>
              );
            }

            return null;
          })}

          {/* GALERÍA DE FOTOS */}
          {p.galeria?.length > 0 && (
            <section id="galeria" className="proy-section proy-gallery">
              <h3 className="proy-section-title">Galería de Imágenes & Entorno</h3>
              <div className="proy-gallery-grid">
                {p.galeria.map((img, i) => (
                  <div key={i} className={`proy-gallery-item ${i === 0 ? "featured" : ""}`}>
                    <Image
                      src={img}
                      alt={`${p.nombre} — fotografía ${i + 1}`}
                      fill
                      unoptimized={img.startsWith("http")}
                      sizes="(max-width:700px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* OTROS PROYECTOS RECOMENDADOS */}
          {otros.length > 0 && (
            <section className="proy-section proy-otros">
              <h3 className="proy-section-title">Otros Desarrollos en Catálogo</h3>
              <div className="proy-otros-grid">
                {otros.map((o) => (
                  <Link key={o.slug} href={`/proyectos/${o.slug}`} className="proy-otro-card">
                    <div className="proy-otro-img">
                      <Image
                        src={o.cover_image}
                        alt={o.nombre}
                        fill
                        unoptimized={o.cover_image.startsWith("http")}
                        sizes="100px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "11px", color: "var(--gray, #6b7280)", display: "block" }}>
                        {o.ubicacion}
                      </span>
                      <strong style={{ color: "var(--navy, #1A3A52)", fontSize: "14px" }}>{o.nombre}</strong>
                      <span style={{ display: "block", fontSize: "12.5px", color: "var(--green, #4A9B6F)", fontWeight: "600", marginTop: 2 }}>
                        Desde {fmt(o.precio_desde)}
                      </span>
                    </div>
                    <ArrowUpRight size={16} style={{ color: "var(--gray)" }} />
                  </Link>
                ))}
              </div>
            </section>
          )}

        </article>

        {/* STICKY INVESTMENT SIDEBAR CON FORMULARIO & FOTO AGENTE */}
        <aside className="proy-sidebar">
          <ProjectLeadCard project={p} formattedPrice={fmt(p.precio_desde)} />
        </aside>

      </div>

      <style>{`
        .proy-hero {
          position: relative;
          height: 68vh;
          min-height: 440px;
          display: flex;
          align-items: flex-end;
        }
        .proy-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.4) 60%, rgba(10,22,40,0.15) 100%);
          pointer-events: none;
        }
        .proy-hero-content {
          position: relative;
          z-index: 2;
          padding-bottom: 2.8rem;
        }
        .proy-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.8);
          font-size: 0.85rem;
          text-decoration: none;
          margin-bottom: 1rem;
          transition: color 0.15s;
        }
        .proy-back:hover { color: #fff; }
        .proy-hero-eyebrow {
          font-size: 0.85rem;
          color: #A7F3D0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .proy-hero-title {
          color: #fff;
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0.4rem 0 1rem;
        }
        .proy-hero-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .proy-tag-pill {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFFFFF;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 5px 12px;
        }

        /* SUB-NAV - LUXURY PILLS / TABS */
        .proy-subnav-bar {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.04);
        }
        .proy-subnav-inner {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          white-space: nowrap;
          padding: 10px 0;
          scrollbar-width: none;
        }
        .proy-subnav-inner::-webkit-scrollbar { display: none; }
        .proy-nav-link {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.2px;
          color: #475569;
          text-decoration: none;
          padding: 7px 15px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .proy-nav-link:hover {
          color: var(--navy, #1A3A52);
          background: #F1F5F9;
          border-color: #E2E8F0;
        }
        .proy-nav-link:active {
          background: #E2E8F0;
        }

        /* LAYOUT */
        .proy-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 3.5rem;
          padding-top: 3rem;
          padding-bottom: 5rem;
          align-items: start;
        }
        @media (max-width: 960px) {
          .proy-layout { grid-template-columns: 1fr; }
          .proy-sidebar { order: -1; margin-bottom: 2rem; }
        }

        /* SECTIONS */
        .proy-section {
          margin-bottom: 3.5rem;
          scroll-margin-top: 60px;
        }
        .proy-main-heading {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: var(--navy, #1A3A52);
          font-weight: 700;
          margin: 0.5rem 0 1.2rem;
          line-height: 1.25;
        }
        .proy-intro {
          font-size: 1.12rem;
          line-height: 1.85;
          color: var(--ink, #1F2937);
          border-left: 3px solid var(--green, #4A9B6F);
          padding-left: 1.4rem;
        }
        .proy-section-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--navy, #1A3A52);
          margin-bottom: 1.5rem;
          padding-bottom: 0.6rem;
          border-bottom: 2px solid var(--green, #4A9B6F);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* METRICS */
        .proy-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }
        .proy-metric-card {
          background: #F8FAFC;
          border: 1px solid var(--line, #E2E8F0);
          border-radius: 12px;
          padding: 1.2rem;
          transition: transform 0.15s, border-color 0.15s;
        }
        .proy-metric-card:hover {
          transform: translateY(-2px);
          border-color: var(--green, #4A9B6F);
        }
        .metric-label {
          font-size: 0.75rem;
          color: var(--gray, #64748B);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
        }
        .metric-value {
          font-size: 1.4rem;
          color: var(--navy, #1A3A52);
          display: block;
          margin: 4px 0;
          font-weight: 700;
        }
        .metric-sub {
          font-size: 0.8rem;
          color: var(--green, #4A9B6F);
          font-weight: 500;
        }

        /* TIPOLOGÍAS / UNITS */
        .proy-units-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .proy-unit-card {
          background: #fff;
          border: 1px solid var(--line, #E5E7EB);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .proy-unit-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(26,58,82,0.08);
        }
        .proy-unit-image-wrap {
          position: relative;
          height: 180px;
          background: #F1F5F9;
        }
        .unit-badge-area {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(26,58,82,0.85);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .proy-unit-body {
          padding: 1.2rem;
        }
        .unit-name {
          font-size: 1.05rem;
          color: var(--navy, #1A3A52);
          font-weight: 700;
          margin-bottom: 2px;
        }
        .unit-habs {
          font-size: 0.8rem;
          color: var(--gray, #6B7280);
          display: block;
          margin-bottom: 8px;
        }
        .unit-desc {
          font-size: 0.85rem;
          color: var(--ink, #1F2937);
          line-height: 1.5;
          margin-bottom: 14px;
        }
        .unit-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid var(--line, #E5E7EB);
        }
        .unit-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--green, #4A9B6F);
        }
        .unit-cta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--navy, #1A3A52);
          text-decoration: none;
        }
        .unit-cta:hover { color: var(--green, #4A9B6F); }

        /* AMENIDADES LUXURY */
        .proy-amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .proy-amenity-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border: 1px solid var(--line, #E5E7EB);
          border-radius: 10px;
          padding: 12px 14px;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .proy-amenity-card:hover {
          transform: translateY(-2px);
          border-color: #CBD5E1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .amenity-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .proy-amenity-card:hover .amenity-icon-wrap {
          background: #F1F5F9;
          border-color: #CBD5E1;
        }
        .amenity-text {
          font-size: 0.88rem;
          color: var(--navy, #1A3A52);
          font-weight: 500;
          letter-spacing: -0.1px;
        }

        /* PAYMENT PLAN - CLEAN WHITE CORPORATE */
        .proy-payment-section-white {
          background: #FFFFFF;
          border: 1px solid var(--line, #E5E7EB);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .proy-payment-grid-white {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
        }
        .payment-step-card-white {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 1.2rem;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .payment-step-card-white:hover {
          transform: translateY(-2px);
          border-color: #CBD5E1;
          background: #FFFFFF;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .step-num-white {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #94A3B8;
          font-weight: 600;
          display: block;
        }
        .step-pct-white {
          font-size: 1.55rem;
          font-weight: 700;
          color: var(--navy, #1A3A52);
          display: block;
          margin: 6px 0 2px;
        }
        .step-title-white {
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          display: block;
        }
        .step-desc-white {
          font-size: 0.78rem;
          color: #64748B;
          display: block;
          margin-top: 4px;
          line-height: 1.4;
        }

        /* DISTANCES */
        .proy-distances-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }
        .distance-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border: 1px solid var(--line, #E5E7EB);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.88rem;
        }
        .dist-place {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--navy, #1A3A52);
          font-weight: 500;
        }
        .dist-time {
          color: var(--green, #4A9B6F);
          font-weight: 700;
        }

        /* GALLERY */
        .proy-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .proy-gallery-item {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 10px;
          overflow: hidden;
        }
        .proy-gallery-item.featured {
          grid-column: span 2;
          aspect-ratio: 16/9;
        }
        @media (max-width: 700px) {
          .proy-gallery-grid { grid-template-columns: 1fr; }
          .proy-gallery-item.featured { grid-column: span 1; }
        }

        /* OTROS */
        .proy-otros-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .proy-otro-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--line, #E5E7EB);
          text-decoration: none;
          background: #fff;
          transition: background 0.15s, border-color 0.15s;
        }
        .proy-otro-card:hover {
          background: #F8FAFC;
          border-color: var(--navy, #1A3A52);
        }
        .proy-otro-img {
          position: relative;
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* STICKY SIDEBAR CARD */
        .proy-sidebar-card {
          background: #fff;
          border: 1px solid var(--line, #E5E7EB);
          border-radius: 18px;
          padding: 1.8rem;
          position: sticky;
          top: 80px;
          box-shadow: 0 10px 30px rgba(26,58,82,0.08);
        }
        .sidebar-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--gray, #6B7280);
          display: block;
          font-weight: 600;
        }
        .proy-sidebar-price {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: 4px;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--line, #E5E7EB);
        }
        .proy-sidebar-price small {
          font-size: 0.85rem;
          color: var(--gray, #6B7280);
        }
        .proy-sidebar-price strong {
          font-size: 1.8rem;
          color: var(--navy, #1A3A52);
          font-weight: 700;
        }
        .price-currency {
          font-size: 0.9rem;
          color: var(--green, #4A9B6F);
          font-weight: 600;
        }
        .proy-sidebar-specs {
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .spec-row .k { color: var(--gray, #6B7280); }
        .spec-row .v { color: var(--ink, #1F2937); font-weight: 600; text-align: right; }
        
        .proy-sidebar-guarantee {
          display: flex;
          gap: 10px;
          background: #E8F4EF;
          border: 1px solid #CFE3D8;
          padding: 12px;
          border-radius: 10px;
          margin: 0.5rem 0 1.2rem;
          font-size: 0.8rem;
        }
        .proy-sidebar-guarantee b {
          display: block;
          color: #2F6B4A;
          margin-bottom: 2px;
        }
        .proy-sidebar-guarantee p {
          color: #2F6B4A;
          margin: 0;
          line-height: 1.35;
        }

        .full-width {
          width: 100%;
          text-align: center;
        }

        .proy-advisor-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 1.2rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--line, #E5E7EB);
        }
        .advisor-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--navy, #1A3A52);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
        }
      `}</style>
    </main>
  );
}
