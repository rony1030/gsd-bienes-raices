import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogs } from "@/lib/db.mjs";
import { ContactForm } from "@/components/site";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const posts = await getBlogs();
  const p = posts.find((x) => x.slug === resolvedParams.slug);
  if (!p) return { title: "Artículo no encontrado" };
  return {
    title: `${p.title} — Blog GSD`,
    description: p.excerpt || p.content?.substring(0, 150),
  };
}

export default async function BlogDetalle({ params }) {
  const resolvedParams = await params;
  const posts = await getBlogs();
  const p = posts.find((x) => x.slug === resolvedParams.slug);
  if (!p) notFound();

  const otros = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <main id="contenido" className="content-page" style={{ paddingTop: '100px', background: '#fafbfc' }}>
      <article className="container" style={{ maxWidth: '840px', margin: '0 auto', paddingBottom: '80px' }}>
        
        {/* Volver */}
        <div style={{ marginBottom: '24px' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Volver a artículos
          </Link>
        </div>

        {/* Categoría & Título */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', background: '#E8F4EF', color: '#2F6B4A', padding: '4px 12px', borderRadius: '14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {p.category || 'Inversión'}
          </span>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: '#1A3A52', lineHeight: 1.25, margin: '14px 0' }}>
            {p.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '13px', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} /> {p.author || 'GSD Real Estate'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} /> {new Date(p.created_at || Date.now()).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Portada */}
        {p.cover_image && (
          <div style={{ position: 'relative', width: '100%', height: 'clamp(280px, 45vw, 440px)', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <Image
              src={p.cover_image}
              alt={p.title}
              fill
              unoptimized={p.cover_image.startsWith('http')}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {/* Extracto destacado */}
        {p.excerpt && (
          <div style={{ background: '#F8FAFC', borderLeft: '4px solid #4A9B6F', padding: '18px 24px', borderRadius: '0 12px 12px 0', fontSize: '17px', lineHeight: 1.65, color: '#334155', fontStyle: 'italic', marginBottom: '32px' }}>
            {p.excerpt}
          </div>
        )}

        {/* Contenido */}
        <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#1f2937', marginBottom: '48px', whiteSpace: 'pre-line' }}>
          {p.content}
        </div>

        {/* CTA Contacto */}
        <div style={{ background: '#1A3A52', color: '#ffffff', padding: '36px', borderRadius: '16px', marginTop: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: '#ffffff' }}>¿Interesado en asesoría patrimonial o legal?</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '540px', margin: '0 auto 20px' }}>
            En GSD combinamos ingeniería catastral, asesoría legal y corretaje inmobiliario para proteger tu inversión en República Dominicana.
          </p>
          <a href="/#contacto" style={{ display: 'inline-block', background: '#4A9B6F', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
            Hablar con un asesor
          </a>
        </div>

        {/* Otros artículos */}
        {otros.length > 0 && (
          <div style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h3 style={{ fontSize: '20px', color: '#1A3A52', marginBottom: '20px' }}>Otras lecturas recomendadas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {otros.map((o) => (
                <Link key={o.slug} href={`/blog/${o.slug}`} style={{ textDecoration: 'none', color: 'inherit', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                    <Image src={o.cover_image || "/img/propiedades/apartment.jpg"} alt={o.title} fill unoptimized={(o.cover_image||'').startsWith('http')} style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '14px' }}>
                    <span style={{ fontSize: '11px', color: '#4A9B6F', fontWeight: 600, textTransform: 'uppercase' }}>{o.category}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1A3A52', margin: '6px 0 0', lineHeight: 1.4 }}>{o.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </main>
  );
}
