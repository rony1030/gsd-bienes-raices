"use client";
export default function ErrorPage({ reset }) {
  return (
    <main id="contenido" className="container empty">
      <h1>No pudimos cargar los espacios.</h1>
      <p>
        Estamos teniendo un problema de conexión. Prueba de nuevo en un momento.
      </p>
      <button className="button dark" onClick={reset}>
        Volver a intentar
      </button>
    </main>
  );
}
