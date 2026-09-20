"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Menu,
  X,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Send,
  SlidersHorizontal,
  PhoneCall,
} from "lucide-react";
import { photos } from "@/lib/demo.mjs";

export function Brand() {
  return (
    <span className="brand brand-realestate">
      <Image
        src="/logo-realestate.png"
        alt="GSD Real Estate"
        width={1200}
        height={316}
        priority
      />
    </span>
  );
}
export function GroupNavigation() {
  return null;
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={open ? "header menu-open" : "header"}>
      <Link href="/" aria-label="GSD Bienes Raíces, inicio">
        <Brand />
      </Link>
      <nav
        aria-label="Navegación principal"
        className={open ? "nav open" : "nav"}
      >
        <span className="nav-mobile-title">Explora GSD</span>
        <Link onClick={() => setOpen(false)} href="/propiedades">
          Propiedades
        </Link>
        <Link onClick={() => setOpen(false)} href="/proyectos">
          Proyectos
        </Link>
        <Link onClick={() => setOpen(false)} href="/nosotros">
          Nosotros
        </Link>
        <Link onClick={() => setOpen(false)} href="/blog">Blog</Link>
        <Link
          onClick={() => setOpen(false)}
          href="/#contacto"
          className="button dark"
        >
          Conversemos <ArrowUpRight size={17} />
        </Link>
      </nav>
      <button
        className="icon menu"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
export function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      // Show only when the footer enters the viewport (when user is at or near the bottom)
      setShowScroll(rect.top <= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef}>
      <div className="footer-main">
        <div>
          <Link href="/">
            <Brand />
          </Link>
          <p>
            Espacios para vivir.
            <br />
            Decisiones para el futuro.
          </p>
        </div>
        <div>
          <span className="eyebrow">EXPLORA</span>
          <Link href="/propiedades">Propiedades</Link>
          <Link href="/proyectos">Nuestros proyectos</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <span className="eyebrow">SOMOS GSD</span>
          <a
            href={
              process.env.NEXT_PUBLIC_MAIN_SITE_URL ||
              "https://gsd-nine-drab.vercel.app/"
            }
          >
            Conoce el grupo <ArrowUpRight size={14} />
          </a>
          <Link href="/privacidad">Privacidad</Link>
          <p>República Dominicana</p>
        </div>
        <div>
          <span className="eyebrow">CONTACTO Y ATENCIÓN</span>
          <a href="tel:+18294937254" style={{ fontWeight: "600", color: "#fff" }}>
            (829) 493-7254
          </a>
          <p style={{ margin: "2px 0 0", color: "#b5db85", fontSize: "11px", fontWeight: "600" }}>
            Lun - Vie: 9:00 - 18:00
          </p>
          <p style={{ margin: "0", color: "#a9bbbc", fontSize: "11px" }}>
            Sáb: 9:00 - 12:00
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GSD Real Estate · No surprises</span>
        <button
          className="footer-scroll-link"
          onClick={scrollToTop}
          type="button"
          aria-label="Volver al inicio"
        >
          <span>Volver arriba</span>
          <ArrowUp size={14} strokeWidth={2.4} />
        </button>
      </div>
    </footer>
  );
}
export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/18294937254?text=Hola%20GSD%20Bienes%20Ra%C3%ADces%2C%20quisiera%20recibir%20asesor%C3%ADa%20sobre%20sus%20propiedades."
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp a (829) 493-7254"
      title="Escribir por WhatsApp (829) 493-7254 · Lun-Vie 9:00-18:00, Sáb 9:00-12:00"
    >
      <PhoneCall size={22} strokeWidth={2.25} />
      <span>WhatsApp</span>
    </a>
  );
}
export function CountUp({ value, suffix = "", label, detail }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const element = ref.current;
    let frame;
    let started = false;
    const showValue = () => {
      if (started) return;
      started = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }
      const startedAt = performance.now();
      const duration = 1200;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        showValue();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <article className="metric" ref={ref}>
      <strong>{display}<small>{suffix}</small></strong>
      <h3>{label}</h3>
      <p>{detail}</p>
    </article>
  );
}
export function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("in-view");
          observer.unobserve(element);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export function Hero() {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      image: photos.hero,
      label: "Punta Cana",
      text: "Un lugar para vivirlo todo.",
    },
    {
      image: photos.villa,
      label: "Samaná",
      text: "Más cerca de lo que importa.",
    },
    {
      image: photos.apartment,
      label: "Santo Domingo",
      text: "Tu siguiente capítulo empieza aquí.",
    },
  ];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      7500,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="hero" aria-label="GSD Bienes Raíces">
      <div className="hero-visual">
        {slides.map((s, i) => (
          <Image
            key={s.image}
            src={s.image}
            alt={`${s.label}: arquitectura residencial de referencia`}
            fill
            sizes="100vw"
            priority={i === 0}
            className={i === slide ? "hero-image active" : "hero-image"}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="eyebrow light">
          <i /> REPÚBLICA DOMINICANA
        </span>
        <h1>
          GSD
          <br />
          <span>Bienes Raíces</span>
        </h1>
        <div className="hero-bottom">
          <p key={slide}>
            {slides[slide].text}
            <br />
            <span>Encuentra el espacio que se siente como tú.</span>
          </p>
          <Link className="button white" href="/propiedades">
            Explorar propiedades <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
      <div className="hero-controls">
        <span>
          0{slide + 1} <span className="muted">/ 03</span>
        </span>
        <div>
          {slides.map((s, i) => (
            <button
              key={s.label}
              aria-label={`Ver ${s.label}`}
              aria-pressed={slide === i}
              onClick={() => setSlide(i)}
              className={slide === i ? "slide-dot active" : "slide-dot"}
            />
          ))}
        </div>
        <span>
          {slides[slide].label} <MapPin size={13} />
        </span>
      </div>
      <a
        className="scroll-cue"
        href="#seleccion"
        aria-label="Descubrir selección"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
function SearchMenu({ name, label, options, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const menuId = useId();
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="search-menu" ref={menuRef}>
      <input type="hidden" name={name} value={value} />
      <span className="search-label">{label}</span>
      <button
        type="button"
        className="search-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected.label}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && (
        <div className="search-options" id={menuId} role="listbox" aria-label={label}>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value || "all"}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={isSelected ? "selected" : ""}
                onClick={() => {
                  setValue(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SearchBar() {
  return (
    <form action="/propiedades" className="search-bar">
      <SearchMenu
        name="operacion"
        label="QUIERO"
        defaultValue="Venta"
        options={[
          { value: "Venta", label: "Venta" },
          { value: "Alquiler", label: "Alquiler" },
        ]}
      />
      <SearchMenu
        name="ubicacion"
        label="DESTINO"
        options={[
          { value: "", label: "Todos los destinos" },
          ...["Punta Cana", "Samaná", "Puerto Plata", "Santo Domingo"].map(
            (value) => ({ value, label: value }),
          ),
        ]}
      />
      <SearchMenu
        name="tipo"
        label="TIPO DE PROPIEDAD"
        options={[
          { value: "", label: "Todos los espacios" },
          ...["Apartamento", "Casa", "Villa"].map((value) => ({ value, label: value })),
        ]}
      />
      <button className="button dark" type="submit">
        <Search size={18} /> Encontrar mi lugar
      </button>
    </form>
  );
}
export const money = (p) =>
  `${p.currency === "DOP" ? "RD$" : "US$"}${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(p.price)}`;
export function PropertyCard({ property: p }) {
  const imageSrc = (Array.isArray(p.images) && p.images[0]) || (typeof p.images === 'string' && p.images) || photos.apartment;
  return (
    <article className="property-card">
      <div className="property-image">
        <Link href={`/propiedades/${p.slug}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={imageSrc}
            alt={p.title}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
            unoptimized={typeof imageSrc === 'string' && (imageSrc.startsWith('http') || imageSrc.startsWith('/uploads'))}
            style={{ objectFit: 'cover' }}
          />
        </Link>
        <span className="tag">{p.operation}</span>
        {p.amenities?.includes("Ley CONFOTUR") && <span className="tag confotur-tag" style={{ background: "#1B3A6B", color: "#fff", marginLeft: "6px" }}>CONFOTUR</span>}
        {p.amenities?.includes("Expediente Auditado GSD") && <span className="tag verified-tag" style={{ background: "#5B9E3F", color: "#fff", marginLeft: "6px" }}>Expediente Auditado</span>}
        {p.demo && <span className="demo-tag">Proyecto de muestra</span>}
      </div>
      <div className="property-heading">
        <span className="property-location">
          <MapPin size={13} />
          {p.location} · {p.type}
        </span>
        <h3>
          <Link href={`/propiedades/${p.slug}`}>
            {p.title}
            <ArrowUpRight size={22} />
          </Link>
        </h3>
        <div className="property-specs">
          <span>
            <BedDouble size={16} />
            {p.beds} hab.
          </span>
          <span>
            <Bath size={16} />
            {p.baths} baños
          </span>
          <span>
            <Maximize size={15} />
            {p.area} m²
          </span>
        </div>
        <div className="property-price">
          <strong>{money(p)}</strong>
          <span>
            {p.operation === "Alquiler" ? " / mes" : "Precio de referencia"}
          </span>
        </div>
      </div>
    </article>
  );
}
export function Catalog({ properties, initial = {} }) {
  const [query, setQuery] = useState(""),
    [location, setLocation] = useState(initial.ubicacion || ""),
    [type, setType] = useState(initial.tipo || ""),
    [operation, setOperation] = useState(initial.operacion || ""),
    [sort, setSort] = useState("featured");
  const filtered = properties
    .filter(
      (p) =>
        (!location || p.location === location) &&
        (!type || p.type === type) &&
        (!operation || p.operation === operation) &&
        `${p.title} ${p.location}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : Number(b.featured) - Number(a.featured),
    );
  const reset = () => {
    setQuery("");
    setLocation("");
    setType("");
    setOperation("");
  };
  return (
    <>
      <div className="catalog-filters">
        <label className="search-input">
          <Search size={18} />
          <input
            aria-label="Buscar por nombre o destino"
            placeholder="Nombre o destino"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Destino"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Todos los destinos</option>
          {[...new Set(properties.map((p) => p.location))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          aria-label="Tipo de propiedad"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          {[...new Set(properties.map((p) => p.type))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          aria-label="Operación"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="">Venta y alquiler</option>
          <option>Venta</option>
          <option>Alquiler</option>
        </select>
      </div>
      <div className="result-toolbar">
        <span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'propiedad' : 'propiedades'}</span>
        <label>
          <SlidersHorizontal size={15} />
          <select
            aria-label="Ordenar propiedades"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Destacadas primero</option>
            <option value="low">Precio: menor a mayor</option>
            <option value="high">Precio: mayor a menor</option>
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="property-grid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Search size={34} />
          <h2>No encontramos ese espacio.</h2>
          <p>Prueba con otro destino o cambia los filtros.</p>
          <button className="button dark" onClick={reset}>
            Ver todas las propiedades <ArrowRight size={17} />
          </button>
        </div>
      )}
    </>
  );
}
export function Gallery({ property: p }) {
  const [index, setIndex] = useState(0),
    ref = useRef(null);
  const images = (Array.isArray(p.images) && p.images.length > 0) 
    ? p.images 
    : (typeof p.images === 'string' && p.images) 
      ? [p.images] 
      : [photos.apartment];
  const change = (n) =>
    setIndex((i) => (i + n + images.length) % images.length);
  const currentImg = images[index] || images[0];
  return (
    <div className="gallery">
      <button
        className="gallery-main"
        onClick={() => ref.current?.showModal()}
        aria-label="Ampliar fotografía"
      >
        <Image
          src={currentImg}
          alt={`${p.title}, imagen ${index + 1}`}
          fill
          sizes="(max-width: 800px) 100vw, 70vw"
          priority
          unoptimized={typeof currentImg === 'string' && (currentImg.startsWith('http') || currentImg.startsWith('/uploads'))}
          style={{ objectFit: 'cover' }}
        />
        <span>
          <Maximize size={17} /> Ver galería
        </span>
      </button>
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ver fotografía ${i + 1}`}
            aria-pressed={index === i}
          >
            <Image
              src={src}
              alt={`Vista ${i + 1} de ${p.title}`}
              fill
              sizes="160px"
              unoptimized={typeof src === 'string' && (src.startsWith('http') || src.startsWith('/uploads'))}
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
      <dialog
        ref={ref}
        className="lightbox"
        onClick={(e) => {
          if (e.target === ref.current) ref.current.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") change(1);
          if (e.key === "ArrowLeft") change(-1);
        }}
      >
        <button
          autoFocus
          className="icon close-gallery"
          onClick={() => ref.current.close()}
          aria-label="Cerrar galería"
        >
          <X />
        </button>
        <button
          className="icon"
          onClick={() => change(-1)}
          aria-label="Foto anterior"
        >
          <ChevronLeft />
        </button>
        <div className="lightbox-photo">
          <Image
            src={p.images[index]}
            alt={`${p.title}, imagen ${index + 1}`}
            fill
            sizes="90vw"
            style={{ objectFit: "contain" }}
            unoptimized={!p.images[index].includes("images.unsplash.com")}
          />
        </div>
        <button
          className="icon"
          onClick={() => change(1)}
          aria-label="Foto siguiente"
        >
          <ChevronRight />
        </button>
        <span className="photo-count">
          {index + 1} / {p.images.length}
        </span>
      </dialog>
    </div>
  );
}
export function ContactForm({ property }) {
  const [state, setState] = useState("idle"),
    [feedback, setFeedback] = useState("");
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          propertyId:
            property?.id && !property.id.startsWith("demo-")
              ? property.id
              : null,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setState("success");
      setFeedback(
        "Recibimos tu solicitud. Un asesor de GSD se pondrá en contacto contigo.",
      );
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error.message || "No se pudo enviar. Inténtalo de nuevo.");
    }
  }
  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-row">
        <label>
          Tu nombre
          <input
            name="name"
            placeholder="Nombre y apellido"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <label>
          Correo electrónico
          <input
            name="email"
            placeholder="tu@correo.com"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
      </div>
      <label>
        Teléfono
        <input
          name="phone"
          placeholder="+1 (809) 000-0000"
          type="tel"
          autoComplete="tel"
          minLength={7}
          maxLength={30}
          required
        />
      </label>
      <label>
        ¿Qué espacio estás buscando?
        <textarea
          key={property?.id}
          name="message"
          rows={3}
          minLength={10}
          maxLength={2000}
          placeholder="Cuéntanos cómo imaginas tu próximo hogar..."
          defaultValue={
            property
              ? `Me interesa ${property.title}. Quisiera recibir más información y coordinar una visita.`
              : ""
          }
          required
        />
      </label>
      <div className="honey" aria-hidden="true">
        <label>
          Sitio web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          Acepto que GSD me contacte sobre mi solicitud.{" "}
          <Link href="/privacidad">Privacidad</Link>
        </span>
      </label>
      <button
        className="button dark"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending"
          ? "Enviando..."
          : state === "success"
            ? "Enviar otra consulta"
            : "Hablemos de tu próximo hogar"}
        {state === "success" ? <Check size={18} /> : <Send size={17} />}
      </button>
      <p className={`form-feedback ${state}`} role="status" aria-live="polite">
        {feedback}
      </p>
    </form>
  );
}

export function ProjectLeadCard({ project, formattedPrice }) {
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message") || `Interés en proyecto ${project?.nombre || ""}`,
          service: `Proyecto: ${project?.nombre || "Inmobiliario"}`
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setState("success");
      setFeedback("¡Gracias! Un asesor se comunicará contigo de inmediato.");
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error.message || "No se pudo enviar. Inténtalo de nuevo.");
    }
  }

  const wpMsg = encodeURIComponent(
    `Hola Esteban, me interesa solicitar asistencia y disponibilidad para el proyecto ${project?.nombre || ""}.`
  );

  return (
    <div className="lead-card-box">
      {/* 1. ASESOR INMOBILIARIO CON FOTO GRANDE Y CENTRADA AL INICIO */}
      <div className="lead-card-agent-hero">
        <div className="agent-avatar-wrap-large">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" 
            alt="Esteban Mejía" 
            className="agent-avatar-img"
          />
        </div>
        <div className="agent-info-hero">
          <strong className="agent-name-hero">Esteban Mejía</strong>
          <span className="agent-role-hero">Asesor Inmobiliario & Jurídico</span>
        </div>
      </div>

      {/* 2. PRECIO */}
      <div className="lead-card-price-block">
        <span className="lead-card-price-label">PRECIO</span>
        <div className="lead-card-price-val">
          <small>Desde</small> <strong>{formattedPrice}</strong>
        </div>
      </div>

      {/* 3. METRICAS RAPIDAS */}
      <div className="lead-card-specs-grid">
        <div className="lead-spec-item">
          <span className="spec-k">Entrega</span>
          <span className="spec-v">{project?.entrega || "2026"}</span>
        </div>
        <div className="lead-spec-item">
          <span className="spec-k">Ubicación</span>
          <span className="spec-v">{project?.ubicacion?.split(",")[0] || "Punta Cana"}</span>
        </div>
        <div className="lead-spec-item">
          <span className="spec-k">Estado</span>
          <span className="spec-v">{project?.estado || "En planos"}</span>
        </div>
        <div className="lead-spec-item">
          <span className="spec-k">Ley Confotur</span>
          <span className="spec-v">15 Años Exento</span>
        </div>
      </div>

      {/* FORMULARIO DE ASISTENCIA */}
      <div className="lead-form-inner">
        <h4 className="lead-form-title">Solicitar Asistencia</h4>
        <p className="lead-form-desc">
          Completa el formulario y un asesor de nuestro equipo se pondrá en contacto contigo.
        </p>

        <form onSubmit={submit} className="lead-form-fields">
          <div className="lead-input-group">
            <label>Nombre y Apellido *</label>
            <input 
              name="name" 
              placeholder="Ej. Carlos Martínez" 
              required 
              disabled={state === "sending"}
            />
          </div>

          <div className="lead-input-group">
            <label>Teléfono / WhatsApp *</label>
            <input 
              name="phone" 
              type="tel" 
              placeholder="Ej. +1 (809) 000-0000" 
              required 
              disabled={state === "sending"}
            />
          </div>

          <div className="lead-input-group">
            <label>Correo Electrónico (Opcional)</label>
            <input 
              name="email" 
              type="email" 
              placeholder="tu@correo.com" 
              disabled={state === "sending"}
            />
          </div>

          <div className="lead-input-group">
            <label>Mensaje (Opcional)</label>
            <textarea 
              name="message" 
              rows={3}
              placeholder={`Hola, me interesa obtener más información sobre el proyecto ${project?.nombre || ""}.`}
              defaultValue={`Hola, me interesa obtener más información sobre el proyecto ${project?.nombre || ""}.`}
              disabled={state === "sending"}
            />
          </div>

          <button 
            type="submit" 
            className="lead-submit-btn"
            disabled={state === "sending"}
          >
            {state === "sending" ? "ENVIANDO..." : state === "success" ? "SOLICITUD ENVIADA" : "SOLICITAR ASISTENCIA"}
          </button>

          {feedback && (
            <p className={`lead-feedback ${state}`}>{feedback}</p>
          )}
        </form>

        <a 
          href={`https://wa.me/18294937254?text=${wpMsg}`} 
          target="_blank" 
          rel="noreferrer"
          className="lead-wp-btn"
        >
          <PhoneCall size={14} /> Contactar directo por WhatsApp
        </a>
      </div>
    </div>
  );
}

export function CustomPaymentPlanButton({ projectName = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          budget: data.get("budget"),
          purpose: data.get("purpose"),
          location: data.get("location"),
          paymentVision: data.get("paymentVision"),
          message: data.get("message") || "",
          service: `Plan de Pago a Medida: ${projectName || "General"}`,
          clientType: "Bienes Raíces",
          formSource: `Plan de Pago a Medida (${projectName || "Proyecto"})`
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setState("success");
      setFeedback("Hemos recibido su solicitud formal. Un asesor directivo se comunicará con usted a la mayor brevedad.");
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error.message || "No se pudo procesar la solicitud. Intente nuevamente.");
    }
  }

  return (
    <>
      <div className="custom-plan-trigger-wrap">
        <button 
          type="button" 
          onClick={() => setIsOpen(true)}
          className="custom-plan-trigger-btn"
        >
          Solicitar Plan de Pago a Tu Capacidad
        </button>
        <span className="custom-plan-trigger-hint">
          Diseñamos una propuesta personalizada según su flujo de ingresos y metas de inversión.
        </span>
      </div>

      {isOpen && (
        <div className="custom-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div>
                <span className="modal-eyebrow">Asesoría Patrimonial Personalizada</span>
                <h3 className="modal-title">Estructura Tu Plan de Pago a Medida</h3>
                <p className="modal-subtitle">
                  {projectName ? `Proyecto de Referencia: ${projectName}` : "Indícanos tus requerimientos para estructurar una propuesta adaptada a tu visión."}
                </p>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar formulario"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submit} className="custom-modal-body">
              <div className="form-grid-2">
                <div className="modal-input-field">
                  <label>Nombre y Apellido *</label>
                  <input name="name" placeholder="Ej. Roberto Gómez" required disabled={state === "sending"} />
                </div>

                <div className="modal-input-field">
                  <label>Teléfono / WhatsApp *</label>
                  <input name="phone" type="tel" placeholder="Ej. +1 (809) 000-0000" required disabled={state === "sending"} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="modal-input-field">
                  <label>Correo Electrónico (Para envío de confirmación) *</label>
                  <input name="email" type="email" placeholder="roberto@correo.com" required disabled={state === "sending"} />
                </div>

                <div className="modal-input-field">
                  <label>Presupuesto Estimado de Inversión *</label>
                  <input name="budget" placeholder="Ej. US$ 150,000 - US$ 220,000" required disabled={state === "sending"} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="modal-input-field">
                  <label>Objetivo Principal *</label>
                  <select name="purpose" required disabled={state === "sending"}>
                    <option value="Inversión y Rentabilidad (Alquiler vacacional)">Invertir por Rentabilidad (Airbnb / Retorno)</option>
                    <option value="Vivienda Principal o Segunda Residencia">Comprar para Vivir o Vacacionar</option>
                    <option value="Plusvalía patrimonial a futuro">Plusvalía patrimonial (Compra en planos)</option>
                    <option value="Diversificación de patrimonio">Diversificación de patrimonio en dólares</option>
                  </select>
                </div>

                <div className="modal-input-field">
                  <label>Zona o Ubicación Preferida *</label>
                  <input name="location" placeholder="Ej. Bávaro, Cap Cana, Santo Domingo, Las Terrenas" required disabled={state === "sending"} />
                </div>
              </div>

              <div className="modal-input-field">
                <label>¿Cómo visualizas tu estructura de pago deseada? *</label>
                <textarea 
                  name="paymentVision" 
                  rows={3} 
                  placeholder="Detalla tu preferencia: cuota inicial disponible, plazo deseado durante construcción, cuotas mensuales que se adapten a tu capacidad, financiamiento bancario contra entrega, etc."
                  required 
                  disabled={state === "sending"}
                />
              </div>

              <div className="modal-input-field">
                <label>Comentarios Adicionales (Opcional)</label>
                <textarea 
                  name="message" 
                  rows={2} 
                  placeholder="Cualquier requerimiento específico sobre habitaciones, amenidades o condiciones jurídicas..."
                  disabled={state === "sending"}
                />
              </div>

              <div className="modal-actions-bar">
                <button 
                  type="submit" 
                  className="modal-submit-btn"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "PROCESANDO SOLICITUD..." : state === "success" ? "SOLICITUD ENVIADA CON ÉXITO" : "ENVIAR SOLICITUD DE PLAN A MEDIDA"}
                </button>
              </div>

              {feedback && (
                <div className={`modal-feedback-alert ${state}`}>
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function ProjectSubNav({ hasGallery = false }) {
  const [activeSection, setActiveSection] = useState("vision");
  const navContainerRef = useRef(null);

  const navItems = [
    { id: "vision", label: "Visión General" },
    { id: "metricas", label: "Métricas" },
    { id: "tipologias", label: "Tipologías & Planos" },
    { id: "amenidades", label: "Amenidades" },
    { id: "plan-pago", label: "Plan de Pago" },
    { id: "ubicacion", label: "Ubicación" },
    ...(hasGallery ? [{ id: "galeria", label: "Galería" }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasGallery]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // Medir altura real del header fijo y la subnav bar
    const headerEl = document.querySelector(".header");
    const subnavEl = document.querySelector(".proy-subnav-bar");
    const headerH = headerEl ? headerEl.offsetHeight : 80;
    const subnavH = subnavEl ? subnavEl.offsetHeight : 50;
    const totalOffset = headerH + subnavH + 12;

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth"
    });
    setActiveSection(id);

    // Auto-scroll horizontal de la pestaña seleccionada en pantallas pequeñas
    if (navContainerRef.current) {
      const btn = navContainerRef.current.querySelector(`[data-id="${id}"]`);
      if (btn) {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  return (
    <nav className="proy-subnav-bar">
      <div className="container proy-subnav-inner" ref={navContainerRef}>
        {navItems.map((item) => (
          <button
            key={item.id}
            data-id={item.id}
            type="button"
            onClick={(e) => scrollToSection(e, item.id)}
            className={`proy-nav-link ${activeSection === item.id ? "active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}


