import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getBlogs } from "@/lib/db.mjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog" };

export default async function Blog() {
  const posts = await getBlogs();
  return (
    <main id="contenido" className="content-page">
      <section className="page-hero container">
        <span className="eyebrow"><i /> IDEAS PARA ENCONTRAR TU LUGAR</span>
        <h1>Historias para<br /><em>vivir mejor.</em></h1>
        <p>Análisis inmobiliario, recomendaciones técnicas y visión legal para tu patrimonio.</p>
      </section>
      <section className="container blog-grid">
        {posts.map((post) => (
          <article className="blog-card" key={post.slug || post.title}>
            <div className="blog-photo">
              <Image 
                src={post.cover_image || "/img/propiedades/apartment.jpg"} 
                alt={post.title} 
                fill 
                unoptimized={(post.cover_image || "").startsWith('http')}
                sizes="(max-width:700px) 100vw,33vw" 
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="eyebrow">{post.category || 'Inversión'}</span>
            <h2>{post.title}</h2>
            <Link className="text-link" href={`/blog/${post.slug || ''}`}>
              Leer artículo <ArrowUpRight size={18} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

