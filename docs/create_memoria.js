const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, Header, Footer, PageNumber
} = require('docx');
const fs = require('fs');

const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const allBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts,
    children: [new TextRun({ size: 22, font: 'Calibri', ...opts.run, text })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, size: 32, bold: true, color: 'B76E79', font: 'Cinzel' })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, size: 26, bold: true, color: '2B1F2A', font: 'Calibri' })],
  });
}

function bullet(text, ref = 'bullet-list') {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22, font: 'Calibri' })],
  });
}

function createCell(text, width, fill = 'FFFFFF') {
  return new TableCell({
    borders: allBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: 'Calibri' })] })],
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, color: 'B76E79', font: 'Cinzel' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 26, bold: true, color: '2B1F2A', font: 'Calibri' },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '\u2022',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({ children: [new TextRun({ text: 'VELVET - Memoria para registro de marca y app', size: 18, color: '888888', font: 'Calibri' })] })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, font: 'Calibri' })] })],
        }),
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: 'VELVET', size: 72, bold: true, color: 'B76E79', font: 'Cinzel' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: 'CONTACTOS', size: 40, color: '2B1F2A', font: 'Cinzel' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: 'Memoria descriptiva para registro de marca y aplicación móvil', size: 28, bold: true, font: 'Calibri' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: '"EN LA VIDA TODO SON CONTACTOS"', size: 24, italics: true, color: 'B76E79', font: 'Calibri' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: 'Autor: Sandro Siliuto', size: 22, font: 'Calibri' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: 'Fecha: 30 de junio de 2026', size: 22, font: 'Calibri' })],
        }),

        h1('1. Resumen ejecutivo'),
        p('VELVET es una aplicación móvil y plataforma digital de networking social exclusivo orientada a adultos que buscan establecer contactos de calidad en entornos de ocio nocturno, eventos privados y experiencias VIP. La propuesta de valor combina un sistema de emparejamiento por tarjetas (swipe) con un ecosistema de recompensas geolocalizadas (VELVET_GO), ofreciendo descuentos, consumiciones gratuitas, entradas VIP y merchandising exclusivo en locales asociados.'),
        p('La identidad visual se inspira en un club privado nocturno: fondos oscuros, acentos en oro rosa, tipografías serif elegantes y efectos de vidrio esmerilado (glassmorphism). La palabra "VIP" está presente de forma recurrente para reforzar el posicionamiento de exclusividad.'),

        h1('2. Concepto y propuesta de valor'),
        h2('2.1 Problema que resuelve'),
        p('En entornos de ocio nocturno y eventos sociales, muchas personas encuentran dificultades para iniciar conversaciones o conocer a otras personas con intereses compatibles. Las apps de dating tradicionales carecen del contexto de evento en vivo, mientras que la experiencia presencial puede resultar intimidante o poco eficiente.'),
        p('VELVET resuelve este problema mediante:'),
        bullet('Perfiles verificados por teléfono: cada usuario se registra con nombre y número de teléfono, reduciendo cuentas falsas.'),
        bullet('Sistema de swipe en el entorno del evento: los usuarios visualizan perfiles de personas presentes o cercanas y solo cuando ambas partes coinciden (match) se comparten los datos de contacto.'),
        bullet('Geolocalización gamificada: mediante VELVET_GO, los usuarios descubren checkpoints y recompensas en locales asociados, fomentando la interacción física.'),

        h2('2.2 Público objetivo'),
        bullet('Adultos de 25 a 45 años residentes en grandes ciudades españolas.'),
        bullet('Asistentes a eventos nocturnos, fiestas privadas, discotecas y festivales.'),
        bullet('Usuarios de apps de contactos que valoran exclusividad y seguridad.'),

        h1('3. Funcionalidades principales'),
        h2('3.1 Registro y acceso VIP'),
        p('El acceso comienza en una pantalla de bienvenida con el isotipo y la frase "EN LA VIDA TODO SON CONTACTOS". El usuario introduce:'),
        bullet('Nombre o apodo.'),
        bullet('Número de teléfono español (9 dígitos, empieza por 6 o 7).'),
        bullet('Foto opcional (solo se comparte si hay match).'),
        p('El sistema almacena el perfil en una base de datos segura y genera una sesión. Si el usuario cierra sesión, puede volver a entrar con el mismo número.'),

        h2('3.2 Descubrimiento de perfiles (swipe)'),
        p('Una vez dentro, el usuario accede a tarjetas donde puede:'),
        bullet('Ver foto, nombre y datos de otros asistentes.'),
        bullet('Deslizar a la derecha (me gusta) o a la izquierda (descartar).'),
        bullet('Recibir notificación de match cuando ambos usuarios se gustan mutuamente.'),
        bullet('Acceder a la lista de matches y revisar perfiles conectados.'),

        h2('3.3 Módulo VELVET_GO: recompensas y checkpoints'),
        p('VELVET_GO es la extensión gamificada de la app, similar a geocompensas tipo Pokémon GO pero adaptada al ocio nocturno:'),
        bullet('Mapa de checkpoints: paradas exclusivas en discotecas, salas, rooftops asociados.'),
        bullet('Recompensas disponibles: vales de descuento, copas gratis, entradas VIP y regalos o merchandising.'),
        bullet('Desbloqueo por proximidad: cuando el usuario está dentro del radio configurado, puede desbloquear la recompensa.'),
        bullet('Código de canje QR: cada recompensa desbloqueada genera un código único (por ejemplo, VELVET-COPA-001) que se presenta en el local.'),

        h2('3.4 Panel de administración'),
        p('Los organizadores disponen de un panel web protegido para:'),
        bullet('Gestionar usuarios registrados.'),
        bullet('Crear, editar y eliminar recompensas.'),
        bullet('Crear, editar y eliminar checkpoints en el mapa.'),
        bullet('Controlar stock y fechas de validez.'),

        h1('4. Identidad de marca y sistema de diseño'),
        h2('4.1 Logotipo e isotipo'),
        p('El isotipo representa una fusión simétrica de dos rostros humanos enfrentados, sugiriendo conexión, intimidad y emparejamiento selectivo. En el centro destaca una "V" que ancla el nombre y un destello de cuatro puntas que simboliza la chispa del encuentro y el estatus de élite.'),

        h2('4.2 Paleta cromática'),
        new Table({
          width: { size: 9026, type: WidthType.DXA },
          columnWidths: [2256, 2256, 2256, 2258],
          rows: [
            new TableRow({ children: [
              createCell('Token', 2256, 'F4EADE'),
              createCell('Nombre', 2256, 'F4EADE'),
              createCell('HEX', 2256, 'F4EADE'),
              createCell('Aplicación', 2258, 'F4EADE'),
            ]}),
            new TableRow({ children: [createCell('color-bg-absolute', 2256), createCell('Onyx Black', 2256), createCell('#0A0A0A', 2256), createCell('Fondo base', 2258)] }),
            new TableRow({ children: [createCell('color-bg-surface', 2256), createCell('Velvet Mauve', 2256), createCell('#2B1F2A', 2256), createCell('Tarjetas y modales', 2258)] }),
            new TableRow({ children: [createCell('color-accent-primary', 2256), createCell('Classic Rose Gold', 2256), createCell('#B76E79', 2256), createCell('Botones y acentos', 2258)] }),
            new TableRow({ children: [createCell('color-accent-dark', 2256), createCell('Deep Rose Gold', 2256), createCell('#8F404C', 2256), createCell('Bordes y presión', 2258)] }),
            new TableRow({ children: [createCell('color-accent-light', 2256), createCell('Pale Rose Gold', 2256), createCell('#F2D7D3', 2256), createCell('Etiquetas secundarias', 2258)] }),
            new TableRow({ children: [createCell('color-text-primary', 2256), createCell('Brut Champagne', 2256), createCell('#F4EADE', 2256), createCell('Texto principal', 2258)] }),
          ],
        }),

        h2('4.3 Tipografía'),
        bullet('Títulos editoriales: Cinzel (serif elegante, estilo moda y alta joyería).'),
        bullet('Texto de interfaz: Inter (sans-serif geométrica, alta legibilidad).'),

        h2('4.4 Estilo visual'),
        p('La interfaz emplea glassmorphism: fondos translúcidos con desenfoque, bordes sutiles en tonos oro rosa y sombras difusas que generan sensación de profundidad y lujo. Los botones principales usan un gradiente metálico de oro rosa.'),

        h1('5. Arquitectura técnica'),
        h2('5.1 Stack tecnológico'),
        bullet('Frontend: Next.js 15 + React + TypeScript + Tailwind CSS.'),
        bullet('Backend: API routes serverless de Next.js.'),
        bullet('Base de datos: Supabase (PostgreSQL).'),
        bullet('Almacenamiento: Supabase Storage para fotos y recompensas.'),
        bullet('Mapas: Leaflet con capas oscuras de CARTO.'),
        bullet('Despliegue: Vercel.'),

        h2('5.2 Tablas principales en Supabase'),
        bullet('velvet_users: perfiles de usuario.'),
        bullet('swipes: acciones de like/dislike.'),
        bullet('matches: coincidencias mutuas.'),
        bullet('rewards: catálogo de recompensas VIP.'),
        bullet('checkpoints: ubicaciones geográficas de desbloqueo.'),
        bullet('user_rewards: recompensas desbloqueadas por usuario.'),
        bullet('checkpoint_visits: registro de visitas.'),

        h2('5.3 Seguridad y privacidad'),
        bullet('Números de teléfono únicos para evitar duplicados.'),
        bullet('Fotos y datos solo se comparten con match mutuo.'),
        bullet('Operaciones de escritura desde servidor con claves seguras.'),
        bullet('Row Level Security (RLS) en Supabase.'),

        h1('6. URLs de despliegue y repositorios'),
        bullet('VELVET contactos: https://vamos-a-definir-la-verbena-clone.vercel.app'),
        bullet('VELVET_GO: https://vamos-a-definir-la-go.vercel.app'),
        bullet('Repositorio VELVET_GO: https://github.com/sandrosiliuto/velvet-go'),

        h1('7. Clases de productos y servicios sugeridas (Nice)'),
        bullet('Clase 9: software descargable para contactos sociales, emparejamiento y gestión de recompensas; aplicaciones móviles.'),
        bullet('Clase 35: publicidad, promoción de eventos y fidelización mediante recompensas.'),
        bullet('Clase 38: telecomunicaciones y mensajería entre usuarios.'),
        bullet('Clase 41: organización de eventos sociales, fiestas y ocio nocturno.'),
        bullet('Clase 42: desarrollo y alojamiento de software y plataformas digitales.'),

        h1('8. Declaración de autoría'),
        p('La presente memoria describe una aplicación y marca original concebida, desarrollada y desplegada por Sandro Siliuto. El código fuente, el diseño de interfaz, la identidad visual y la lógica de negocio han sido creados de forma original para proteger la idea, el software y la marca comercial asociada a VELVET.'),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(process.argv[2] || 'velvet_memoria_registro.docx', buffer);
  console.log('Documento creado');
});
