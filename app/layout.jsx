import "./globals.css";
import { Header, Footer } from "@/components/site";
export const metadata = {
  title: {
    default: "GSD Bienes Raíces | Tu próximo lugar",
    template: "%s | GSD Bienes Raíces",
  },
  description:
    "Apartamentos, casas y villas en República Dominicana. Descubre tu próximo espacio con GSD Bienes Raíces.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }) {
  return (
    <html lang="es">
      <body>
        <a className="skip" href="#contenido">
          Ir al contenido
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
