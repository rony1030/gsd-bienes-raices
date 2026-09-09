import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  MoveUpRight,
  Compass,
  ShieldCheck,
  KeyRound,
  Armchair,
  CalendarCheck,
} from "lucide-react";
import {
  Hero,
  SearchBar,
  PropertyCard,
  ContactForm,
  Reveal,
  CountUp,
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
      <section className="metrics container" aria-label="GSD en números">
        <CountUp
          value={4}
          label="destinos para explorar"
          detail="Del ritmo de Santo Domingo a la calma de Samaná."
        />
        <CountUp
          value={6}
          label="espacios de demostración"
          detail="Apartamentos, casas y villas para descubrir con calma."
        />
        <CountUp
          value={1}
          label="equipo a tu lado"
          detail="Una conversación para empezar a encontrar tu lugar."
        />
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
      <section className="moments section container">
        <Reveal className="section-heading moments-heading">
          <div>
            <span className="eyebrow">CADA ESPACIO CUENTA UNA HISTORIA</span>
            <h2>Descubre a tu manera.</h2>
          </div>
          <p>Primero lo ves. Después empiezas a imaginar tu vida ahí.</p>
        </Reveal>
        <div className="moment-grid">
          <Reveal className="moment-media">
            <Image
              src={photos.home}
              alt="Interior residencial luminoso, fotografía de referencia"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <span className="moment-icon"><Armchair size={30} /></span>
          </Reveal>
          <Reveal className="moment-copy">
            <span className="eyebrow">MIRA CON CALMA</span>
            <h3>Los detalles hacen que un lugar se sienta <em>tuyo.</em></h3>
            <p>Recorre la luz, los acabados y el ritmo de cada propiedad antes de coordinar una visita.</p>
            <Link href="/propiedades" className="text-link">Explorar espacios <ArrowUpRight size={19} /></Link>
          </Reveal>
          <Reveal className="moment-copy second">
            <span className="eyebrow">DA EL SIGUIENTE PASO</span>
            <h3>Cuando un espacio conecta, la visita se vuelve <em>natural.</em></h3>
            <p>Cuéntanos qué buscas y te ayudaremos a descubrir los proyectos que encajan contigo.</p>
            <Link href="/#contacto" className="text-link">Hablar con GSD <ArrowUpRight size={19} /></Link>
          </Reveal>
          <Reveal className="moment-media second">
            <Image
              src={photos.interior}
              alt="Espacio residencial de referencia para disfrutar"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <span className="moment-icon"><CalendarCheck size={30} /></span>
          </Reveal>
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
      <section className="contact-panel container" id="contacto">
        <Image src={photos.villa} alt="Villa de referencia rodeada de naturaleza" fill sizes="100vw" />
        <div className="contact-panel-shade" />
        <Reveal className="contact-panel-copy">
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
        <Reveal className="contact-panel-form">
          <ContactForm />
        </Reveal>
        <a className="contact-callout" href="tel:+18097828828">
          <span className="contact-callout-icon"><ArrowUpRight size={20} /></span>
          <span>Hablemos hoy <strong>809 782 8828</strong></span>
        </a>
      </section>
      <section className="instagram section" aria-label="Instagram">
        <div className="container">
          <Reveal className="instagram-heading">
            <div><span className="eyebrow">INSPIRACIÓN GSD</span><h2>Instagram</h2></div>
            <a className="text-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">@GSD <ArrowUpRight size={19} /></a>
          </Reveal>
          <div className="instagram-grid">
            {[photos.hero, photos.apartment, photos.villa, photos.home].map((image, index) => (
              <Reveal className="instagram-post" key={image}>
                <Image src={image} alt={`Inspiración inmobiliaria GSD ${index + 1}`} fill sizes="(max-width: 700px) 50vw, 25vw" />
              </Reveal>
            ))}
          </div>
        </div>
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
