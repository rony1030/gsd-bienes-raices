from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.utils import ImageReader
from PIL import Image
import os

ROOT = os.path.dirname(os.path.dirname(__file__))
OUT = os.path.join(ROOT, "output", "pdf", "PROPUESTA GSD REAL ESTATE ODYSSEY MARKETING.pdf")
SOURCE = r"C:\Users\Rony\AppData\Local\Temp\codex-clipboard-7bc1b15b-ad90-4989-8479-bcfd3a55fb0f.jpg"
MARK = os.path.join(ROOT, "tmp", "gsd-real-estate-mark.png")
W, H = A4
INK, BLACK, LIME = HexColor("#15233A"), HexColor("#0A0D0C"), HexColor("#C8FF2A")
MIST, GREY, PAPER = HexColor("#E7ECE7"), HexColor("#78837D"), HexColor("#F5F7F3")

def crop_mark():
    Image.open(SOURCE).crop((1110, 435, 1595, 940)).save(MARK)

def txt(c, x, y, s, z=10, f="Helvetica", col=INK):
    c.setFont(f, z); c.setFillColor(col); c.drawString(x, y, s)

def para(c, x, y, s, width, z=10, f="Helvetica", col=INK, leading=None):
    leading = leading or z * 1.48; rows=[]; row=""
    for word in s.split():
        trial=(row+" "+word).strip()
        if stringWidth(trial, f, z) <= width: row=trial
        else: rows.append(row); row=word
    if row: rows.append(row)
    c.setFont(f,z); c.setFillColor(col)
    for row in rows: c.drawString(x,y,row); y-=leading
    return y

def header(c, n, label, dark=False):
    fg=MIST if dark else INK
    txt(c,20*mm,H-16*mm,"ODYSSEY MARKETING",9,"Helvetica-Bold",LIME if dark else INK)
    txt(c,W-34*mm,H-16*mm,f"0{n}",9,"Helvetica-Bold",fg)
    c.setStrokeColor(HexColor("#3A4640") if dark else HexColor("#D7DED7")); c.setLineWidth(.45)
    c.line(20*mm,H-20*mm,W-20*mm,H-20*mm)
    txt(c,20*mm,H-28*mm,label.upper(),8,"Helvetica-Bold",LIME if dark else HexColor("#637168"))

def footer(c, dark=False):
    col=GREY if dark else HexColor("#718078")
    txt(c,20*mm,12*mm,"Propuesta - GSD Real Estate",8,"Helvetica",col)
    txt(c,W-72*mm,12*mm,"Responsable: Odyssey Marketing",8,"Helvetica",col)

def brand(c,x,y,w=42*mm):
    c.drawImage(ImageReader(MARK),x,y,w,w*.92,preserveAspectRatio=True,mask="auto")

def bullet(c,x,y,title,body,dark=False):
    c.setFillColor(LIME); c.circle(x+2.5*mm,y+1*mm,2.3*mm,fill=1,stroke=0)
    txt(c,x+9*mm,y-1*mm,title,11,"Helvetica-Bold",MIST if dark else INK)
    return para(c,x+9*mm,y-7*mm,body,145*mm,9.3,"Helvetica",GREY if dark else HexColor("#53615A"),13.5)

def cover(c):
    c.setFillColor(white); c.rect(0,0,W,H,fill=1,stroke=0)
    txt(c,20*mm,H-16*mm,"ODYSSEY MARKETING",9.5,"Helvetica-Bold",INK)
    c.setFillColor(HexColor("#57A32B")); c.rect(20*mm,H-23*mm,43*mm,1.4*mm,fill=1,stroke=0)
    brand(c,W-74*mm,H-65*mm,54*mm)
    txt(c,20*mm,H-51*mm,"PROPUESTA DIGITAL",10,"Helvetica-Bold",HexColor("#57A32B"))
    txt(c,20*mm,H-83*mm,"GSD REAL",40,"Helvetica-Bold",INK)
    txt(c,20*mm,H-106*mm,"ESTATE",40,"Helvetica-Bold",INK)
    c.setFillColor(HexColor("#57A32B")); c.rect(20*mm,H-119*mm,104*mm,1.4*mm,fill=1,stroke=0)
    para(c,20*mm,H-141*mm,"Plataforma inmobiliaria, CRM web y arquitectura escalable para la primera unidad digital del grupo GSD.",128*mm,13,"Helvetica",HexColor("#53615A"),19)
    txt(c,20*mm,57*mm,"INVERSIÓN",8.5,"Helvetica-Bold",HexColor("#57A32B")); txt(c,20*mm,47*mm,"RD$12,000",17,"Helvetica-Bold",INK)
    c.setStrokeColor(HexColor("#D7DED7")); c.setLineWidth(.45); c.line(20*mm,21*mm,W-20*mm,21*mm)
    txt(c,20*mm,12*mm,"Responsable: Odyssey Marketing",9,"Helvetica",GREY); txt(c,W-64*mm,12*mm,"odysseymarketing.info",9,"Helvetica",GREY); c.showPage()

def vision(c):
    header(c,2,"Visión y objetivo")
    txt(c,20*mm,H-52*mm,"Una experiencia que",27,"Helvetica",INK)
    txt(c,20*mm,H-67*mm,"conecta marca,",25,"Helvetica-Bold",INK)
    txt(c,20*mm,H-80*mm,"propiedades y oportunidades.",25,"Helvetica-Bold",INK)
    para(c,20*mm,H-100*mm,"GSD Real Estate será la primera unidad digital conectada a GSD Principal. La propuesta combina un sitio inmobiliario de alto impacto, captación de contactos y una base operativa para administrar el crecimiento comercial.",158*mm,10.8,"Helvetica",HexColor("#53615A"),16.5)
    y=H-145*mm; y=bullet(c,20*mm,y,"Diseño inmobiliario","Fotografía de gran formato, lectura editorial y recorridos claros para ayudar al usuario a imaginar cada espacio antes de solicitar información.")-9*mm
    y=bullet(c,20*mm,y,"Node.js + Next.js","Una arquitectura moderna que une la experiencia visual, datos, formularios y funciones de servidor; rápida, manejable y lista para crecer.")-9*mm
    bullet(c,20*mm,y,"Escalabilidad","La estructura permite conectar nuevos portales del grupo y crear módulos adicionales cuando el negocio los requiera.")
    footer(c); c.showPage()

def public(c):
    header(c,3,"Sitio público - GSD Real Estate")
    txt(c,20*mm,H-54*mm,"Páginas que estarán",27,"Helvetica",INK); txt(c,20*mm,H-69*mm,"funcionando para Real Estate.",27,"Helvetica-Bold",INK)
    mods=[("INICIO","Hasta 12 secciones enfocadas en identidad, propiedades destacadas, captación y llamadas a la acción."),("PROPIEDADES","Catálogo, fichas de detalle, galerías, amenidades, monedas y opción de compartir."),("DESTINOS","Hasta 6 secciones; propiedades agrupadas por ubicación."),("NOSOTROS","Hasta 6 secciones para explicar marca, equipo y respaldo."),("BLOG","Artículos, categorías, etiquetas y enlaces para compartir."),("ACCESO","Usuario y contraseña para el panel de gestión.")]
    xs,ys=[20*mm,105*mm],[H-108*mm,H-148*mm,H-188*mm]
    for i,(title,body) in enumerate(mods):
        x,y=xs[i%2],ys[i//2]; c.setFillColor(HexColor("#57A32B")); c.rect(x,y+24*mm,2*mm,7*mm,fill=1,stroke=0)
        txt(c,x+6*mm,y+25*mm,title,9,"Helvetica-Bold",INK); para(c,x+6*mm,y+17*mm,body,68*mm,8.7,"Helvetica",HexColor("#53615A"),12)
        c.setStrokeColor(HexColor("#D7DED7")); c.setLineWidth(.45); c.line(x,y+10*mm,x+75*mm,y+10*mm)
    footer(c); c.showPage()

def crm(c):
    header(c,4,"CRM web - Subdominio operativo")
    txt(c,20*mm,H-52*mm,"Control comercial",27,"Helvetica",INK); txt(c,20*mm,H-67*mm,"desde un panel preparado para crecer.",27,"Helvetica-Bold",INK)
    para(c,20*mm,H-87*mm,"El CRM y el portal GSD Real Estate operarán en subdominios del dominio final. Desde ahí se manejará la actividad inmobiliaria y se preparará la conexión con futuras empresas del grupo.",158*mm,10.5,"Helvetica",HexColor("#53615A"),16)
    y=H-126*mm; y=bullet(c,20*mm,y,"Leads y negociación","Registro de contactos, seguimiento comercial y pipeline visual estilo Kanban para organizar cada oportunidad.")-8*mm
    y=bullet(c,20*mm,y,"Gestión de propiedades","Crear, editar, publicar o dejar privadas propiedades. Tipologías: apartamentos, solares, casas, villas y locales, con opción de ampliar categorías.")-8*mm
    y=bullet(c,20*mm,y,"Ficha completa","Monedas, descripción, amenidades, imagen de portada, galería, ubicación, tipología y datos para filtros públicos.")-8*mm
    bullet(c,20*mm,y,"Blog administrable","Editor funcional, publicación, categorías, etiquetas y controles para compartir artículos y propiedades.")
    footer(c); c.showPage()

def data(c):
    header(c,5,"SEO, analítica y evolución")
    txt(c,20*mm,H-54*mm,"Datos para decidir.",29,"Helvetica-Bold",INK)
    para(c,20*mm,H-76*mm,"La plataforma se preparará para que GSD mida qué propiedades, contenidos y páginas generan mayor interés.",158*mm,10.8,"Helvetica",HexColor("#53615A"),16.5)
    y=H-121*mm; y=bullet(c,20*mm,y,"SEO técnico","Estructura optimizada para buscadores, títulos y metadatos para propiedades, destinos y blog.")-9*mm
    y=bullet(c,20*mm,y,"Analítica de visitas","Medición de visitas del sitio, propiedades y artículos para identificar el contenido con mejor respuesta.")-9*mm
    y=bullet(c,20*mm,y,"Aplicación web","Opción de instalar el CRM como app web desde el navegador para un acceso directo del equipo.")-9*mm
    bullet(c,20*mm,y,"Nuevos módulos","El CRM queda preparado para sumar proyectos del grupo. Cada módulo nuevo se analiza y cotiza según necesidad, reglas e integraciones.")
    footer(c); c.showPage()

def process(c):
    header(c,6,"Proceso de definición")
    txt(c,20*mm,H-52*mm,"Antes de construir,",27,"Helvetica",INK); txt(c,20*mm,H-67*mm,"hay que entender el negocio.",27,"Helvetica-Bold",INK)
    para(c,20*mm,H-87*mm,"Para proceder se realizarán reuniones de trabajo con el equipo de GSD. El objetivo es convertir el demo actual en una plataforma que represente las necesidades reales del negocio.",158*mm,10.5,"Helvetica",HexColor("#53615A"),16)
    steps=[("01","Descubrimiento","Revisar datos, propiedades, procesos comerciales, marcas, accesos y prioridades."),("02","Dirección visual","Definir qué elementos del demo gustan, qué se debe cambiar y qué referencias representan a GSD Real Estate."),("03","Reglas operativas","Acordar roles, flujo de leads, etapas de negociación, publicación de propiedades y contenido del blog."),("04","Implementación","Construir por etapas, revisar avances, cargar contenido real y preparar la salida pública.")]
    y=H-133*mm
    for num,title,body in steps:
        txt(c,20*mm,y+1*mm,num,9,"Helvetica-Bold",HexColor("#57A32B")); c.setFillColor(HexColor("#57A32B")); c.rect(33*mm,y-2*mm,1.2*mm,8*mm,fill=1,stroke=0)
        txt(c,42*mm,y+1*mm,title,12,"Helvetica-Bold",INK); para(c,42*mm,y-6*mm,body,130*mm,9.4,"Helvetica",HexColor("#53615A"),13); y-=32*mm
    footer(c); c.showPage()

def investment(c):
    header(c,7,"Inversión y condiciones")
    txt(c,20*mm,H-52*mm,"Inversión del proyecto",27,"Helvetica-Bold",INK)
    txt(c,20*mm,H-74*mm,"INVERSIÓN",8,"Helvetica-Bold",HexColor("#57A32B")); txt(c,20*mm,H-91*mm,"RD$12,000",25,"Helvetica-Bold",INK)
    txt(c,105*mm,H-76*mm,"Inicio: 50% - RD$6,000",11,"Helvetica-Bold",INK); txt(c,105*mm,H-87*mm,"Saldo: 50% - RD$6,000",10,"Helvetica",HexColor("#53615A"))
    c.setStrokeColor(HexColor("#57A32B")); c.setLineWidth(1.2); c.line(20*mm,H-100*mm,W-20*mm,H-100*mm)
    para(c,20*mm,H-116*mm,"El dominio y el hosting se definen al final, cuando todo esté funcional y se confirme el dominio definitivo. Se presentará la opción de Hostinger correspondiente en ese momento.",165*mm,10.3,"Helvetica",HexColor("#53615A"),16)
    txt(c,20*mm,H-153*mm,"ALCANCE Y MÓDULOS",9,"Helvetica-Bold",INK)
    para(c,20*mm,H-166*mm,"Las funcionalidades detalladas se revisarán en las reuniones de definición. Cualquier módulo fuera del alcance acordado, integración especial o expansión futura se cotiza por separado según su complejidad.",165*mm,10,"Helvetica",HexColor("#53615A"),15)
    txt(c,20*mm,55*mm,"Demos en vivo",9,"Helvetica-Bold",INK)
    main_demo = "GSD Principal: https://gsd-nine-drab.vercel.app/"
    estate_demo = "GSD Real Estate: https://gsd-bienes-raices.vercel.app/"
    txt(c,20*mm,46*mm,main_demo,9,"Helvetica",HexColor("#53615A")); c.linkURL("https://gsd-nine-drab.vercel.app/",(20*mm,44*mm,20*mm+stringWidth(main_demo,"Helvetica",9),49*mm),relative=0)
    txt(c,20*mm,39*mm,estate_demo,9,"Helvetica",HexColor("#53615A")); c.linkURL("https://gsd-bienes-raices.vercel.app/",(20*mm,37*mm,20*mm+stringWidth(estate_demo,"Helvetica",9),42*mm),relative=0)
    footer(c); c.showPage()

def payment(c):
    header(c,8,"Datos para pago inicial")
    txt(c,20*mm,H-54*mm,"Para iniciar el proyecto",27,"Helvetica",INK); txt(c,20*mm,H-69*mm,"se requiere el 50% de la inversión.",24,"Helvetica-Bold",HexColor("#57A32B"))
    rows=[("TITULAR","RONY BELLO"),("DOCUMENTO","00118645001"),("CORREO","ronyabellor@gmail.com"),("BANCO","Banco BHD"),("CUENTA DE AHORROS RD$","11913180051"),("CUENTA ESTÁNDAR","DO62BCBH00000000011913180051")]
    y=H-104*mm
    for label,value in rows:
        txt(c,20*mm,y,label,8,"Helvetica-Bold",HexColor("#57A32B")); txt(c,72*mm,y,value,10,"Helvetica",INK)
        c.setStrokeColor(HexColor("#D7DED7")); c.setLineWidth(.4); c.line(20*mm,y-5*mm,W-20*mm,y-5*mm); y-=14*mm
    para(c,20*mm,H-205*mm,"Referencia de pago: GSD Real Estate. Una vez confirmado el pago inicial, se agenda la primera reunión de descubrimiento y definición.",165*mm,10.3,"Helvetica",HexColor("#53615A"),16)
    c.setFillColor(HexColor("#57A32B")); c.rect(20*mm,30*mm,170*mm,1.2*mm,fill=1,stroke=0); txt(c,20*mm,20*mm,"Odyssey Marketing - Desarrollo web, arquitectura digital y crecimiento.",8.7,"Helvetica-Bold",INK); txt(c,W-63*mm,20*mm,"odysseymarketing.info",8.7,"Helvetica",GREY); c.showPage()

crop_mark(); os.makedirs(os.path.dirname(OUT),exist_ok=True)
c=Canvas(OUT,pagesize=A4,pageCompression=1); c.setTitle("PROPUESTA GSD REAL ESTATE - ODYSSEY MARKETING"); c.setAuthor("Odyssey Marketing")
cover(c); vision(c); public(c); crm(c); data(c); process(c); investment(c); payment(c); c.save(); print(OUT)
