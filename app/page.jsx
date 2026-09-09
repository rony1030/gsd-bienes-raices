import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  MoveUpRight,
  Compass,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import {
  Hero,
  SearchBar,
  PropertyCard,
  ContactForm,
  Reveal,
} from "@/components/site";
import { getProperties } from "@/lib/db.mjs";
import { photos } from "@/lib/demo.mjs";
export const dynamic = "force-dynamic";
export default async function Home() {
  const properties = await getProperties();
  return (
    <main id="contenido">
      <Hero />
      <div className="container">
        <SearchBar />
      </div>
      <section className="intro section container" id="seleccion">
        <Reveal>
          <span className="eyebrow">
            <i /> TU VIDA. TU ESPACIO.
          </span>
          <h2>
            Hay lugares que visitas.
            <br />Y otros a los que <em>perteneces.</em>
          </h2>
        </Reveal>
        <Reveal className="intro-copy">
          <p>
            Un nuevo comienzo, una inversión con propósito o ese hogar que
            siempre imaginaste. Te acompañamos a encontrarlo en República
            Dominicana.
          </p>
          <Link href="/propiedades" className="text-link">
            Encuentra el tuyo <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </section>
      <section className="container selection">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">ESPACIOS SELECCIONADOS</span>
            <h2>Tu próximo capítulo.</h2>
          </div>
          <Link className="text-link" href="/propiedades">
            Ver todas las propiedades <ArrowUpRight size={19} />
          </Link>
        </Reveal>
        <div className="property-grid">
          {properties.slice(0, 3).map((p) => (
            <Reveal key={p.id}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
        <p className="demo-note">
          Colección de demostración · Proyectos, precios y fotografías
          ilustrativos.
        </p>
      </section>
      <section className="experience" id="nosotros">
        <Image
          src={photos.interior}
          alt="Sala abierta y luminosa, fotografía de referencia"
          fill
          sizes="100vw"
        />
        <div className="experience-shade" />
        <Reveal className="experience-copy">
          <span className="eyebrow light">MÁS QUE UNA DIRECCIÓN</span>
          <h2>
            Una forma
            <br />
            de <em>vivir.</em>
          </h2>
          <p>
            El café en tu terraza. La luz que entra por la ventana. El espacio
            para lo que viene.
          </p>
          <Link href="/#contacto" className="button white">
            Hagámoslo realidad <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <span className="experience-caption">
          GSD BIENES RAÍCES / REPÚBLICA DOMINICANA
        </span>
      </section>
      <section className="section container destinations" id="destinos">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">UNA ISLA. MUCHAS POSIBILIDADES.</span>
            <h2>¿Dónde empieza tu historia?</h2>
          </div>
          <p>
            De la energía de la ciudad
            <br />a la calma junto al mar.
          </p>
        </Reveal>
        <div className="destination-grid">
          {[
            {
              name: "Punta Cana",
              image: photos.hero,
              label: "El Caribe, todos los días",
            },
            {
              name: "Samaná",
              image: photos.villa,
              label: "Conecta con lo natural",
            },
            {
              name: "Puerto Plata",
              image: photos.home,
              label: "Tu refugio en el norte",
            },
            {
              name: "Santo Domingo",
              image: photos.apartment,
              label: "Vive el pulso de la ciudad",
            },
          ].map((d, i) => (
            <Link
              key={d.name}
              href={`/propiedades?ubicacion=${encodeURIComponent(d.name)}`}
              className="destination"
            >
              <Image
                src={d.image}
                alt={`Residencia ilustrativa para ${d.name}`}
                fill
                sizes="(max-width:700px) 50vw,25vw"
              />
              <span className="destination-number">0{i + 1}</span>
              <div>
                <span>{d.label}</span>
                <h3>
                  {d.name}
                  <ArrowUpRight size={22} />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="values section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">CONTIGO, EN CADA PASO</span>
              <h2>Encontrar es solo el comienzo.</h2>
            </div>
            <p>
              El respaldo de Geosolutions Source Dominicana,
              <br />
              ahora en tu próxima decisión inmobiliaria.
            </p>
          </Reveal>
          <div className="value-grid">
            {[
              {
                icon: Compass,
                title: "Entendemos tu búsqueda",
                text: "Empezamos escuchándote. Tu estilo de vida, tus planes y lo que de verdad importa para ti.",
              },
              {
                icon: ShieldCheck,
                title: "Te acompañamos a decidir",
                text: "Información clara sobre cada espacio y acompañamiento durante el proceso de selección.",
              },
              {
                icon: KeyRound,
                title: "Abrimos nuevas puertas",
                text: "Coordinamos las visitas y los siguientes pasos para acercarte a tu próxima propiedad.",
              },
            ].map((v, i) => (
              <Reveal key={v.title}>
                <span className="value-index">
                  0{i + 1}
                  <v.icon size={26} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container contact" id="contacto">
        <Reveal>
          <span className="eyebrow">
            <i /> CONVERSEMOS
          </span>
          <h2>
            Tu próximo lugar
            <br />
            empieza con
            <br />
            <em>un hola.</em>
          </h2>
          <p>
            Cuéntanos qué buscas.
            <br />
            Nosotros te ayudamos a dar el siguiente paso.
          </p>
          <MoveUpRight size={62} strokeWidth={1} />
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
      <section className="container faq">
        <span className="eyebrow">ANTES DE DAR EL PASO</span>
        {[
          {
            q: "¿Puedo coordinar una visita a una propiedad?",
            a: "Sí. Entra a la ficha de la propiedad y envíanos tu solicitud. Un asesor te contactará para confirmar disponibilidad y coordinar los detalles.",
          },
          {
            q: "¿Tienen propiedades para comprar y alquilar?",
            a: "Puedes explorar ambas opciones en el catálogo y filtrar por destino y tipo de propiedad.",
          },
          {
            q: "¿Son proyectos disponibles para comprar ahora?",
            a: "Esta es una demostración. Los seis proyectos, precios y fotografías son ilustrativos y no constituyen ofertas comerciales. Los contactos enviados sí se reciben para probar el servicio.",
          },
        ].map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <ArrowRight size={18} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
