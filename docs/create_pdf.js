const { PdfPrinter } = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
  Roboto: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  }
};

const printer = new PdfPrinter(fonts);

const docDefinition = {
  pageSize: 'A4',
  pageMargins: [50, 60, 50, 60],
  defaultStyle: { font: 'Roboto', fontSize: 11, color: '#1a1a1a', lineHeight: 1.35 },
  background: function(currentPage, pageSize) {
    return {
      canvas: [
        { type: 'rect', x: 0, y: 0, w: pageSize.width, h: 100, color: '#0A0A0A' },
        { type: 'rect', x: 0, y: pageSize.height - 40, w: pageSize.width, h: 40, color: '#0A0A0A' }
      ]
    };
  },
  header: function(currentPage, pageCount) {
    return {
      columns: [
        { text: 'VELVET · PATENTE / REGISTRO DE MARCA Y APP', color: '#F4EADE', fontSize: 10, margin: [50, 20, 0, 0] },
        { text: currentPage.toString(), alignment: 'right', color: '#F4EADE', fontSize: 10, margin: [0, 20, 50, 0] }
      ]
    };
  },
  footer: function(currentPage, pageCount) {
    return {
      text: 'Documento preparado por SANDRO SILIUTO · SSILIUTODESIGN · 2026',
      alignment: 'center',
      color: '#F4EADE',
      fontSize: 9,
      margin: [0, 12, 0, 0]
    };
  },
  content: [
    {
      stack: [
        { text: 'VELVET', fontSize: 48, bold: true, color: '#B76E79', alignment: 'center', characterSpacing: 8 },
        { text: 'CONTACTOS', fontSize: 22, color: '#F4EADE', alignment: 'center', margin: [0, 5, 0, 10], characterSpacing: 6 },
        { text: '"EN LA VIDA TODO SON CONTACTOS"', fontSize: 14, italics: true, color: '#F4EADE', alignment: 'center' },
        { text: 'Memoria explicativa para registro de idea, marca y aplicación móvil', fontSize: 16, bold: true, color: '#F4EADE', alignment: 'center', margin: [0, 30, 0, 0] },
        { text: 'Autor: Sandro Siliuto', fontSize: 12, color: '#F4EADE', alignment: 'center', margin: [0, 20, 0, 0] },
        { text: 'Estudio: SSILIUTODESIGN / SSILIUTO · Digital Alchemy', fontSize: 11, color: '#F4EADE', alignment: 'center' },
        { text: 'Ubicación: Tenerife · Londres · Bilbao', fontSize: 11, color: '#F4EADE', alignment: 'center' },
        { text: 'Web: https://ssiliuto-3-dweb-dhlr.vercel.app/', fontSize: 11, color: '#F4EADE', alignment: 'center', margin: [0, 0, 0, 30] },
        { text: 'Fecha: 30 de junio de 2026', fontSize: 11, color: '#F4EADE', alignment: 'center' }
      ],
      margin: [0, 120, 0, 0]
    },
    { text: '', pageBreak: 'after' },

    { text: '1. Resumen ejecutivo', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 0, 0, 15] },
    { text: 'VELVET es una aplicación móvil y plataforma digital de networking social exclusivo orientada a adultos que buscan establecer contactos de calidad en entornos de ocio nocturno, eventos privados y experiencias VIP.' },
    { text: 'La propuesta de valor combina un sistema de emparejamiento por tarjetas (swipe) con un ecosistema de recompensas geolocalizadas llamado VELVET_GO. Los usuarios obtienen acceso a descuentos, consumiciones gratuitas, entradas VIP y merchandising exclusivo en locales asociados.' },
    { text: 'La identidad visual se inspira en un club privado nocturno: fondos oscuros, acentos en oro rosa, tipografías serif elegantes y efectos de vidrio esmerilado (glassmorphism). La palabra VIP está presente de forma recurrente para reforzar el posicionamiento de exclusividad.' },

    { text: '2. Propósito de este documento', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { text: 'Este documento tiene como objetivo registrar y proteger la idea de VELVET como aplicación para eventos, su posible personalización y su extensión gamificada VELVET_GO. Se describe el concepto, las funcionalidades, la identidad visual, la arquitectura técnica, las URLs de despliegue y los datos del autor, con el fin de presentarlo ante organismos de registro de marca y/o patente de software.' },

    { text: '3. Concepto y propuesta de valor', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { text: '3.1. Problema que resuelve', fontSize: 14, bold: true, margin: [0, 10, 0, 8] },
    { text: 'En entornos de ocio nocturno y eventos sociales, muchas personas encuentran dificultades para iniciar conversaciones o conocer a otras personas con intereses compatibles. Las apps de dating tradicionales carecen del contexto de evento en vivo, mientras que la experiencia presencial puede resultar intimidante o poco eficiente.' },
    { text: 'VELVET resuelve este problema mediante tres pilares:' },
    { ul: [
      'Perfiles verificados por teléfono: cada usuario se registra con nombre y número de teléfono, reduciendo cuentas falsas.',
      'Sistema de swipe en el entorno del evento: los usuarios visualizan perfiles de personas presentes o cercanas y solo cuando ambas partes coinciden (match) se comparten los datos de contacto.',
      'Geolocalización gamificada: mediante VELVET_GO, los usuarios descubren checkpoints y recompensas en locales asociados, fomentando la interacción física.'
    ]},

    { text: '3.2. Público objetivo', fontSize: 14, bold: true, margin: [0, 15, 0, 8] },
    { ul: [
      'Adultos de 25 a 45 años residentes en grandes ciudades españolas.',
      'Asistentes a eventos nocturnos, fiestas privadas, discotecas y festivales.',
      'Usuarios de apps de contactos que valoran exclusividad, privacidad y seguridad.'
    ]},

    { text: '4. Funcionalidades principales', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { text: '4.1. Registro y acceso VIP', fontSize: 14, bold: true, margin: [0, 10, 0, 8] },
    { text: 'El acceso comienza en una pantalla de bienvenida con el isotipo y la frase "EN LA VIDA TODO SON CONTACTOS". El usuario introduce nombre o apodo, número de teléfono español (9 dígitos, empieza por 6 o 7) y foto opcional (solo se comparte si hay match). El sistema almacena el perfil en una base de datos segura y genera una sesión. Si el usuario cierra sesión, puede volver a entrar con el mismo número.' },
    { image: 'velvet_home.png', width: 220, alignment: 'center', margin: [0, 10, 0, 10] },
    { text: 'Figura 1: Pantalla de acceso VIP de VELVET contactos', fontSize: 10, italics: true, alignment: 'center', margin: [0, 0, 0, 15] },

    { text: '4.2. Descubrimiento de perfiles (swipe)', fontSize: 14, bold: true, margin: [0, 10, 0, 8] },
    { text: 'Una vez dentro, el usuario accede a tarjetas donde puede ver foto, nombre y datos de otros asistentes; deslizar a la derecha (me gusta) o a la izquierda (descartar); recibir notificación de match cuando ambos usuarios se gustan mutuamente; y acceder a la lista de matches y revisar perfiles conectados.' },

    { text: '4.3. Módulo VELVET_GO: recompensas y checkpoints', fontSize: 14, bold: true, margin: [0, 10, 0, 8] },
    { text: 'VELVET_GO es la extensión gamificada de la app, similar a geocompensas tipo Pokémon GO pero adaptada al ocio nocturno. Incluye un mapa de checkpoints en locales asociados, recompensas como vales de descuento, copas gratis, entradas VIP y merchandising, desbloqueo por proximidad y un código de canje QR único por recompensa.' },
    { image: 'velvet_map.png', width: 220, alignment: 'center', margin: [0, 10, 0, 10] },
    { text: 'Figura 2: Mapa VIP de checkpoints en VELVET_GO', fontSize: 10, italics: true, alignment: 'center', margin: [0, 0, 0, 15] },
    { image: 'velvet_rewards.png', width: 220, alignment: 'center', margin: [0, 10, 0, 10] },
    { text: 'Figura 3: Recompensa desbloqueada con código QR de canje', fontSize: 10, italics: true, alignment: 'center', margin: [0, 0, 0, 15] },

    { text: '5. Identidad de marca y sistema de diseño', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { text: '5.1. Logotipo e isotipo', fontSize: 14, bold: true, margin: [0, 10, 0, 8] },
    { text: 'El isotipo representa una fusión simétrica de dos rostros humanos enfrentados, sugiriendo conexión, intimidad y emparejamiento selectivo. En el centro destaca una "V" que ancla el nombre y un destello de cuatro puntas que simboliza la chispa del encuentro y el estatus de élite.' },
    { text: '5.2. Paleta cromática', fontSize: 14, bold: true, margin: [0, 15, 0, 8] },
    { text: 'Onyx Black (#0A0A0A) para fondos; Velvet Mauve (#2B1F2A) para tarjetas y modales; Classic Rose Gold (#B76E79) para botones y acentos; Deep Rose Gold (#8F404C) para bordes; Pale Rose Gold (#F2D7D3) para etiquetas; y Brut Champagne (#F4EADE) para texto principal.' },
    { text: '5.3. Tipografía y estilo visual', fontSize: 14, bold: true, margin: [0, 15, 0, 8] },
    { text: 'Títulos editoriales con Cinzel y texto de interfaz con Inter. La interfaz emplea glassmorphism: fondos translúcidos con desenfoque, bordes sutiles en tonos oro rosa y sombras difusas que generan sensación de profundidad y lujo.' },

    { text: '6. Arquitectura técnica', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { ul: [
      'Frontend: Next.js 15 + React + TypeScript + Tailwind CSS.',
      'Backend: API routes serverless de Next.js.',
      'Base de datos: Supabase (PostgreSQL).',
      'Almacenamiento: Supabase Storage para fotos y recompensas.',
      'Mapas: Leaflet con capas oscuras de CARTO.',
      'Despliegue: Vercel.'
    ]},

    { text: '7. URLs de despliegue y repositorios', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { text: 'A continuación se listan las aplicaciones que se desean registrar:' },
    { ul: [
      'VELVET contactos: https://vamos-a-definir-la-next.vercel.app/',
      'VELVET contactos v2: https://velvet-contactos2.vercel.app/',
      'VELVET contactos v3: https://vamos-a-definir-la-verbena-clone.vercel.app/',
      'VELVET_GO: https://vamos-a-definir-la-go.vercel.app/',
      'Repositorio VELVET contactos: https://github.com/sandrosiliuto/velvet-contactos',
      'Repositorio VELVET_GO: https://github.com/sandrosiliuto/velvet-go'
    ]},

    { text: '8. Clases de productos y servicios sugeridas (Nice)', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { ul: [
      'Clase 9: software descargable para contactos sociales, emparejamiento y gestión de recompensas; aplicaciones móviles.',
      'Clase 35: publicidad, promoción de eventos y fidelización mediante recompensas.',
      'Clase 38: telecomunicaciones y mensajería entre usuarios.',
      'Clase 41: organización de eventos sociales, fiestas y ocio nocturno.',
      'Clase 42: desarrollo y alojamiento de software y plataformas digitales.'
    ]},

    { text: '9. Declaración de autoría', fontSize: 20, bold: true, color: '#B76E79', margin: [0, 25, 0, 15] },
    { text: 'La presente memoria describe una aplicación y marca original concebida, desarrollada y desplegada por Sandro Siliuto, bajo el sello SSILIUTODESIGN / SSILIUTO · Digital Alchemy. El código fuente, el diseño de interfaz, la identidad visual, la lógica de negocio y el concepto de VELVET_GO han sido creados de forma original para proteger la idea, el software y la marca comercial asociada a VELVET.' },
    { text: 'Todos los derechos reservados. Queda prohibida la reproducción total o parcial de esta idea, su código, diseño o funcionalidad sin autorización expresa del autor.' }
  ]
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
const outputPath = path.join(__dirname, 'VELVET_Memoria_Registro_Marca_App.pdf');
pdfDoc.pipe(fs.createWriteStream(outputPath));
pdfDoc.end();
console.log('PDF generado:', outputPath);
