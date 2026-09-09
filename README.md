# GSD Bienes Raices

Sitio independiente de demostracion para la division inmobiliaria. Next.js App Router, React y Neon Postgres. No requiere el servidor principal para mostrar propiedades o recibir solicitudes.

## Desarrollo

Node.js 22 o superior. Ejecutar `npm ci` y `npm run dev`. URL local: http://localhost:3001.

Copiar las variables de `.env.example` a `.env.local` y configurar `DATABASE_URL`. La cadena y `CRM_API_KEY` son privadas y nunca deben usar el prefijo NEXT_PUBLIC ni incluirse en Git. Ejecutar `npm run db:migrate` una vez por base y `npm run db:seed` solo para cargar los seis ejemplos autorizados.

`npm run build` compila para Vercel. `npm test` valida entradas y autenticacion. La base usa el esquema `real_estate`; no modifica las tablas del CRM antiguo.

## Despliegue independiente

Importar este repositorio como un nuevo proyecto Next.js en Vercel, directorio raiz `.`. Configurar DATABASE_URL, CRM_API_KEY (al menos 32 caracteres aleatorios), NEXT_PUBLIC_SITE_URL (URL final de este sitio), NEXT_PUBLIC_MAIN_SITE_URL y DEMO_MODE=false. No subir `.env.local`. Ejecutar la migracion antes de habilitar el formulario.

Las propiedades de demostracion estan identificadas y el sitio tiene noindex. Antes de lanzamiento comercial, sustituir ejemplos y galerias, revisar los textos de privacidad y retirar noindex en app/layout.jsx. Las fotos de referencia son de Unsplash, no corresponden a inmuebles reales anunciados en esos destinos. Las fuentes de imagen estan en scripts/assets.mjs.

## CRM central

El servidor principal integra `/admin/bienes-raices` usando su autenticacion existente y un token CSRF para cambios. Configurar en gsd-matrix REAL_ESTATE_URL (URL final inmobiliaria) y REAL_ESTATE_API_KEY (mismo secreto que CRM_API_KEY). Localmente, scripts/configure-crm.mjs prepara .env.real-estate en el proyecto principal y conserva un secreto existente.

El navegador nunca recibe el token. La conexion entre servidores tiene timeout de ocho segundos. Una falla se presenta dentro del modulo y no interrumpe las otras pantallas. El despliegue del principal sigue siendo independiente y requiere publicar sus cambios por separado.

### Contrato API

Todas las peticiones a `/api/crm` requieren `Authorization: Bearer <CRM_API_KEY>` y son privadas, sin cache.

- GET ?resource=properties&page=0: propiedades, 100 por pagina.
- GET ?page=0: contactos con propiedad de interes, 100 por pagina.
- POST: crear/actualizar propiedad por slug. Campos en lib/validation.mjs. Usar status draft, published o archived; las archivadas dejan de mostrarse al publico.
- PATCH: {id,status} para contactos; estados nuevo, contactado, calificado, cerrado.
- POST /api/leads es publico, valida datos, consentimiento y honeypot; rechaza origen ajeno y solicitudes repetidas del mismo correo dentro de un minuto. No es un sistema antiabuso completo: configurar rate limiting de Vercel antes de una campana publica.

Galerias: el demo incluye archivos locales. Para futuras cargas del CRM, usar almacenamiento persistente de objetos y guardar las URLs HTTPS en Neon; no escribir archivos en el disco de Vercel.

## Arquitectura del grupo

Cada division tiene repositorio y despliegue propio. Este sitio guarda sus datos en Neon directamente y el CRM los consulta mediante la API privada. Las otras tres divisiones pueden seguir el mismo patron con su propio esquema y token; no deben compartir secretos de escritura ni depender de la disponibilidad del principal para atender visitantes.

La base Neon sigue siendo una dependencia comun si se reutiliza para todas las divisiones. Para aislamiento completo, usar bases o proyectos separados. El CRM principal conserva su almacenamiento y sesiones anteriores; esta integracion no los migra.
