const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outDir = __dirname;
const doc = new PDFDocument({ size: 'A4', margin: 50 });
const outputPath = path.join(outDir, 'VELVET_Memoria_Registro_Marca_App.pdf');
doc.pipe(fs.createWriteStream(outputPath));

const velvetBlack = '#0A0A0A';
const velvetRose = '#B76E79';
const velvetMauve = '#2B1F2A';
const velvetChampagne = '#F4EADE';

function coverPage() {
  doc.rect(0, 0, 595, 842).fill(velvetBlack);

  doc.fontSize(48)
     .fillColor(velvetRose)
     .font('Helvetica-Bold')
     .text('VELVET', 50, 220, { align: 'center', characterSpacing: 8, width: 495 });

  doc.fontSize(22)
     .fillColor(velvetChampagne)
     .font('Helvetica')
     .text('CONTACTOS', { align: 'center', characterSpacing: 6 });

  doc.fontSize(14)
     .fillColor(velvetRose)
     .font('Helvetica-Oblique')
     .text('"EN LA VIDA TODO SON CONTACTOS"', 50, 330, { align: 'center', width: 495 });

  doc.fontSize(16)
     .fillColor(velvetChampagne)
     .font('Helvetica-Bold')
     .text('Memoria explicativa para registro de idea, marca y aplicación móvil', 50, 420, { align: 'center', width: 495 });

  doc.fontSize(12)
     .fillColor(velvetChampagne)
     .font('Helvetica')
     .text('Autor: Sandro Siliuto', 50, 500, { align: 'center', width: 495 })
     .text('Estudio: SSILIUTODESIGN / SSILIUTO · Digital Alchemy', { align: 'center', width: 495 })
     .text('Ubicación: Tenerife · Londres · Bilbao', { align: 'center', width: 495 })
     .text('Web: https://ssiliuto-3-dweb-dhlr.vercel.app/', { align: 'center', width: 495 })
     .text('Fecha: 30 de junio de 2026', { align: 'center', width: 495 });

  doc.fontSize(10)
     .fillColor('#888888')
     .text('Documento confidencial para registro de marca y patente de software', 50, 780, { align: 'center', width: 495 });
}

function newPage() {
  doc.addPage();
  doc.rect(0, 0, 595, 60).fill(velvetBlack);
  doc.rect(0, 812, 595, 30).fill(velvetBlack);
  doc.fontSize(10).fillColor(velvetChampagne).font('Helvetica').text('VELVET · PATENTE / REGISTRO DE MARCA Y APP', 50, 25);
}

function section(title) {
  doc.moveDown(1.5);
  doc.fontSize(18).fillColor(velvetRose).font('Helvetica-Bold').text(title);
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor('#1a1a1a').font('Helvetica');
}

function subSection(title) {
  doc.moveDown(1);
  doc.fontSize(13).fillColor(velvetMauve).font('Helvetica-Bold').text(title);
  doc.moveDown(0.3);
  doc.fontSize(11).fillColor('#1a1a1a').font('Helvetica');
}

function paragraph(text) {
  doc.fontSize(11).fillColor('#1a1a1a').font('Helvetica').text(text, { align: 'justify', paragraphGap: 8 });
}

function bullet(text) {
  doc.fontSize(11).fillColor('#1a1a1a').font('Helvetica').text('• ' + text, { indent: 15, paragraphGap: 4 });
}

function addImage(imageName, caption) {
  const imgPath = path.join(outDir, imageName);
  if (fs.existsSync(imgPath)) {
    const imgWidth = 170;
    const x = (595 - imgWidth) / 2;
    const y = doc.y;
    doc.image(imgPath, x, y, { width: imgWidth });
    doc.moveDown(115);
    doc.fontSize(10).fillColor('#555555').font('Helvetica-Oblique').text(caption, { align: 'center' });
    doc.moveDown(0.5);
  }
}

coverPage();
newPage();

section('1. Resumen ejecutivo');
paragraph('VELVET es una aplicación móvil y plataforma digital de networking social exclusivo orientada a adultos que buscan establecer contactos de calidad en entornos de ocio nocturno, eventos privados y experiencias VIP.');
paragraph('La propuesta de valor combina un sistema de emparejamiento por tarjetas (swipe) con un ecosistema de recompensas geolocalizadas llamado VELVET_GO. Los usuarios obtienen acceso a descuentos, consumiciones gratuitas, entradas VIP y merchandising exclusivo en locales asociados.');
paragraph('La identidad visual se inspira en un club privado nocturno: fondos oscuros, acentos en oro rosa, tipografías serif elegantes y efectos de vidrio esmerilado (glassmorphism). La palabra VIP está presente de forma recurrente para reforzar el posicionamiento de exclusividad.');

section('2. Propósito de este documento');
paragraph('Este documento tiene como objetivo registrar y proteger la idea de VELVET como aplicación para eventos, su posible personalización y su extensión gamificada VELVET_GO. Se describe el concepto, las funcionalidades, la identidad visual, la arquitectura técnica, las URLs de despliegue y los datos del autor, con el fin de presentarlo ante organismos de registro de marca y/o patente de software.');

section('3. Concepto y propuesta de valor');
subSection('3.1. Problema que resuelve');
paragraph('En entornos de ocio nocturno y eventos sociales, muchas personas encuentran dificultades para iniciar conversaciones o conocer a otras personas con intereses compatibles. Las apps de dating tradicionales carecen del contexto de evento en vivo, mientras que la experiencia presencial puede resultar intimidante o poco eficiente.');
paragraph('VELVET resuelve este problema mediante tres pilares:');
bullet('Perfiles verificados por teléfono: cada usuario se registra con nombre y número de teléfono, reduciendo cuentas falsas.');
bullet('Sistema de swipe en el entorno del evento: los usuarios visualizan perfiles de personas presentes o cercanas y solo cuando ambas partes coinciden (match) se comparten los datos de contacto.');
bullet('Geolocalización gamificada: mediante VELVET_GO, los usuarios descubren checkpoints y recompensas en locales asociados, fomentando la interacción física.');

subSection('3.2. Público objetivo');
bullet('Adultos de 25 a 45 años residentes en grandes ciudades españolas.');
bullet('Asistentes a eventos nocturnos, fiestas privadas, discotecas y festivales.');
bullet('Usuarios de apps de contactos que valoran exclusividad, privacidad y seguridad.');

newPage();
section('4. Funcionalidades principales');
subSection('4.1. Registro y acceso VIP');
paragraph('El acceso comienza en una pantalla de bienvenida con el isotipo y la frase "EN LA VIDA TODO SON CONTACTOS". El usuario introduce nombre o apodo, número de teléfono español (9 dígitos, empieza por 6 o 7) y foto opcional (solo se comparte si hay match). El sistema almacena el perfil en una base de datos segura y genera una sesión. Si el usuario cierra sesión, puede volver a entrar con el mismo número.');
addImage('velvet_home.png', 'Figura 1: Pantalla de acceso VIP de VELVET contactos');

subSection('4.2. Descubrimiento de perfiles (swipe)');
paragraph('Una vez dentro, el usuario accede a tarjetas donde puede ver foto, nombre y datos de otros asistentes; deslizar a la derecha (me gusta) o a la izquierda (descartar); recibir notificación de match cuando ambos usuarios se gustan mutuamente; y acceder a la lista de matches y revisar perfiles conectados.');

newPage();
subSection('4.3. Módulo VELVET_GO: recompensas y checkpoints');
paragraph('VELVET_GO es la extensión gamificada de la app, similar a geocompensas tipo Pokémon GO pero adaptada al ocio nocturno. Incluye un mapa de checkpoints en locales asociados, recompensas como vales de descuento, copas gratis, entradas VIP y merchandising, desbloqueo por proximidad y un código de canje QR único por recompensa.');
addImage('velvet_map.png', 'Figura 2: Mapa VIP de checkpoints en VELVET_GO');
addImage('velvet_rewards.png', 'Figura 3: Recompensa desbloqueada con código QR de canje');

newPage();
section('5. Identidad de marca y sistema de diseño');
subSection('5.1. Logotipo e isotipo');
paragraph('El isotipo representa una fusión simétrica de dos rostros humanos enfrentados, sugiriendo conexión, intimidad y emparejamiento selectivo. En el centro destaca una "V" que ancla el nombre y un destello de cuatro puntas que simboliza la chispa del encuentro y el estatus de élite.');

subSection('5.2. Paleta cromática');
bullet('Onyx Black (#0A0A0A): fondos base.');
bullet('Velvet Mauve (#2B1F2A): tarjetas y modales.');
bullet('Classic Rose Gold (#B76E79): botones, acentos y branding.');
bullet('Deep Rose Gold (#8F404C): bordes y estados de presión.');
bullet('Pale Rose Gold (#F2D7D3): etiquetas y textos secundarios.');
bullet('Brut Champagne (#F4EADE): texto principal.');

subSection('5.3. Tipografía y estilo visual');
paragraph('Títulos editoriales con Cinzel y texto de interfaz con Inter. La interfaz emplea glassmorphism: fondos translúcidos con desenfoque, bordes sutiles en tonos oro rosa y sombras difusas que generan sensación de profundidad y lujo.');

section('6. Arquitectura técnica');
bullet('Frontend: Next.js 15 + React + TypeScript + Tailwind CSS.');
bullet('Backend: API routes serverless de Next.js.');
bullet('Base de datos: Supabase (PostgreSQL).');
bullet('Almacenamiento: Supabase Storage para fotos y recompensas.');
bullet('Mapas: Leaflet con capas oscuras de CARTO.');
bullet('Despliegue: Vercel.');

newPage();
section('7. URLs de despliegue y repositorios');
paragraph('A continuación se listan las aplicaciones que se desean registrar:');
bullet('VELVET contactos: https://vamos-a-definir-la-next.vercel.app/');
bullet('VELVET contactos v2: https://velvet-contactos2.vercel.app/');
bullet('VELVET contactos v3: https://vamos-a-definir-la-verbena-clone.vercel.app/');
bullet('VELVET_GO: https://vamos-a-definir-la-go.vercel.app/');
bullet('Repositorio VELVET contactos: https://github.com/sandrosiliuto/velvet-contactos');
bullet('Repositorio VELVET_GO: https://github.com/sandrosiliuto/velvet-go');

section('8. Clases de productos y servicios sugeridas (Nice)');
bullet('Clase 9: software descargable para contactos sociales, emparejamiento y gestión de recompensas; aplicaciones móviles.');
bullet('Clase 35: publicidad, promoción de eventos y fidelización mediante recompensas.');
bullet('Clase 38: telecomunicaciones y mensajería entre usuarios.');
bullet('Clase 41: organización de eventos sociales, fiestas y ocio nocturno.');
bullet('Clase 42: desarrollo y alojamiento de software y plataformas digitales.');

newPage();
section('9. Posibilidades de personalización');
paragraph('VELVET ha sido diseñada como una plataforma modular que puede personalizarse para distintos tipos de eventos y marcas:');
bullet('White-label para promotores: adaptación de colores, logotipo y nombre para eventos específicos.');
bullet('Tipos de evento: discotecas, festivales, fiestas privadas, eventos corporativos, bodas y networkings profesionales.');
bullet('Catálogo de recompensas configurable: copas, entradas, descuentos, experiencias VIP y merchandising.');
bullet('Radio de proximidad ajustable: permite definir la distancia necesaria para desbloquear recompensas según el local o evento.');
bullet('Panel de administración propio: cada cliente puede gestionar sus propios usuarios, recompensas y checkpoints.');

section('10. Declaración de autoría');
paragraph('La presente memoria describe una aplicación y marca original concebida, desarrollada y desplegada por Sandro Siliuto, bajo el sello SSILIUTODESIGN / SSILIUTO · Digital Alchemy. El código fuente, el diseño de interfaz, la identidad visual, la lógica de negocio y el concepto de VELVET_GO han sido creados de forma original para proteger la idea, el software y la marca comercial asociada a VELVET.');
paragraph('Todos los derechos reservados. Queda prohibida la reproducción total o parcial de esta idea, su código, diseño o funcionalidad sin autorización expresa del autor.');

doc.end();
console.log('PDF generado:', outputPath);
