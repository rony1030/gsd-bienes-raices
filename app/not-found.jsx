import Link from "next/link";
export default function NotFound() {
  return (
    <main id="contenido" className="container empty">
      <span className="eyebrow">404</span>
      <h1>Este lugar aún no está aquí.</h1>
      <p>La propiedad que buscas no está disponible.</p>
      <Link className="button dark" href="/propiedades">
        Explorar propiedades
      </Link>
    </main>
  );
}
