# VELVET - Memoria descriptiva para registro de marca y app

**Autor:** Sandro Siliuto  
**Fecha:** 30 de junio de 2026  
**Marca:** VELVET CONTACTOS  
**Slogan:** EN LA VIDA TODO SON CONTACTOS

---

## 1. Resumen ejecutivo

VELVET es una aplicación móvil y plataforma digital de **networking social exclusivo** orientada a adultos que buscan establecer contactos de calidad en entornos de ocio nocturno, eventos privados y experiencias VIP. La propuesta de valor combina un sistema de emparejamiento por tarjetas (swipe) con un ecosistema de recompensas geolocalizadas (**VELVET_GO**), ofreciendo a los usuarios acceso a descuentos, consumiciones gratuitas, entradas VIP y merchandising exclusivo en locales asociados.

La identidad visual se inspira en un club privado nocturno: fondos oscuros, acentos en oro rosa, tipografías serif elegantes y efectos de vidrio esmerilado (glassmorphism). La palabra "VIP" está presente de forma recurrente para reforzar el posicionamiento de exclusividad.

---

## 2. Concepto y propuesta de valor

### 2.1 Problema que resuelve

En entornos de ocio nocturno y eventos sociales, muchas personas encuentran dificultades para iniciar conversaciones o conocer a otras personas con intereses compatibles. Las apps de dating tradicionales carecen del contexto de evento en vivo, mientras que la experiencia presencial puede resultar intimidante o poco eficiente.

VELVET resuelve este problema mediante:

- **Perfiles verificados por teléfono**: cada usuario se registra con nombre y número de teléfono, reduciendo cuentas falsas.
- **Sistema de swipe en el entorno del evento**: los usuarios visualizan perfiles de personas presentes o cercanas y solo cuando ambas partes coinciden (match) se comparten los datos de contacto.
- **Geolocalización gamificada**: mediante VELVET_GO, los usuarios descubren checkpoints y recompensas en locales asociados, fomentando la interacción física.

### 2.2 Público objetivo

- Adultos de 25 a 45 años residentes en grandes ciudades españolas.
- Asistentes a eventos nocturnos, fiestas privadas, discotecas y festivales.
- Usuarios de apps de contactos que valoran exclusividad y seguridad.

---

## 3. Funcionalidades principales

### 3.1 Registro y acceso VIP

El acceso comienza en una pantalla de bienvenida con el isotipo y la frase "EN LA VIDA TODO SON CONTACTOS". El usuario introduce:

- Nombre o apodo.
- Número de teléfono español (9 dígitos, empieza por 6 o 7).
- Foto opcional (solo se comparte si hay match).

El sistema almacena el perfil en una base de datos segura y genera una sesión. Si el usuario cierra sesión, puede volver a entrar con el mismo número.

### 3.2 Descubrimiento de perfiles (swipe)

Una vez dentro, el usuario accede a tarjetas donde puede:

- Ver foto, nombre y datos de otros asistentes.
- Deslizar a la derecha (me gusta) o a la izquierda (descartar).
- Recibir notificación de match cuando ambos usuarios se gustan mutuamente.
- Acceder a la lista de matches y revisar perfiles conectados.

### 3.3 Módulo VELVET_GO: recompensas y checkpoints

VELVET_GO es la extensión gamificada de la app, similar a geocompensas tipo Pokémon GO pero adaptada al ocio nocturno:

- **Mapa de checkpoints**: paradas exclusivas en discotecas, salas, rooftops asociados.
- **Recompensas disponibles**: vales de descuento, copas gratis, entradas VIP y regalos o merchandising.
- **Desbloqueo por proximidad**: cuando el usuario está dentro del radio configurado, puede desbloquear la recompensa.
- **Código de canje QR**: cada recompensa desbloqueada genera un código único (por ejemplo, VELVET-COPA-001) que se presenta en el local.

### 3.4 Panel de administración

Los organizadores disponen de un panel web protegido para:

- Gestionar usuarios registrados.
- Crear, editar y eliminar recompensas.
- Crear, editar y eliminar checkpoints en el mapa.
- Controlar stock y fechas de validez.

---

## 4. Identidad de marca y sistema de diseño

### 4.1 Logotipo e isotipo

El isotipo representa una fusión simétrica de dos rostros humanos enfrentados, sugiriendo conexión, intimidad y emparejamiento selectivo. En el centro destaca una "V" que ancla el nombre y un destello de cuatro puntas que simboliza la chispa del encuentro y el estatus de élite.

### 4.2 Paleta cromática

| Token | Nombre | HEX | Aplicación |
|---|---|---|---|
| color-bg-absolute | Onyx Black | #0A0A0A | Fondo base |
| color-bg-surface | Velvet Mauve | #2B1F2A | Tarjetas y modales |
| color-accent-primary | Classic Rose Gold | #B76E79 | Botones y acentos |
| color-accent-dark | Deep Rose Gold | #8F404C | Bordes y presión |
| color-accent-light | Pale Rose Gold | #F2D7D3 | Etiquetas secundarias |
| color-text-primary | Brut Champagne | #F4EADE | Texto principal |

### 4.3 Tipografía

- **Títulos editoriales**: Cinzel (serif elegante, estilo moda y alta joyería).
- **Texto de interfaz**: Inter (sans-serif geométrica, alta legibilidad).

### 4.4 Estilo visual

La interfaz emplea **glassmorphism**: fondos translúcidos con desenfoque, bordes sutiles en tonos oro rosa y sombras difusas que generan sensación de profundidad y lujo. Los botones principales usan un gradiente metálico de oro rosa.

---

## 5. Arquitectura técnica

### 5.1 Stack tecnológico

- **Frontend**: Next.js 15 + React + TypeScript + Tailwind CSS.
- **Backend**: API routes serverless de Next.js.
- **Base de datos**: Supabase (PostgreSQL).
- **Almacenamiento**: Supabase Storage para fotos y recompensas.
- **Mapas**: Leaflet con capas oscuras de CARTO.
- **Despliegue**: Vercel.

### 5.2 Tablas principales en Supabase

- `velvet_users`: perfiles de usuario.
- `swipes`: acciones de like/dislike.
- `matches`: coincidencias mutuas.
- `rewards`: catálogo de recompensas VIP.
- `checkpoints`: ubicaciones geográficas de desbloqueo.
- `user_rewards`: recompensas desbloqueadas por usuario.
- `checkpoint_visits`: registro de visitas.

### 5.3 Seguridad y privacidad

- Números de teléfono únicos para evitar duplicados.
- Fotos y datos solo se comparten con match mutuo.
- Operaciones de escritura desde servidor con claves seguras.
- Row Level Security (RLS) en Supabase.

---

## 6. URLs de despliegue y repositorios

- **VELVET contactos**: https://vamos-a-definir-la-verbena-clone.vercel.app
- **VELVET_GO**: https://vamos-a-definir-la-go.vercel.app
- **Repositorio VELVET_GO**: https://github.com/sandrosiliuto/velvet-go

---

## 7. Clases de productos y servicios sugeridas (Nice)

- **Clase 9**: software descargable para contactos sociales, emparejamiento y gestión de recompensas; aplicaciones móviles.
- **Clase 35**: publicidad, promoción de eventos y fidelización mediante recompensas.
- **Clase 38**: telecomunicaciones y mensajería entre usuarios.
- **Clase 41**: organización de eventos sociales, fiestas y ocio nocturno.
- **Clase 42**: desarrollo y alojamiento de software y plataformas digitales.

---

## 8. Declaración de autoría

La presente memoria describe una aplicación y marca original concebida, desarrollada y desplegada por **Sandro Siliuto**. El código fuente, el diseño de interfaz, la identidad visual y la lógica de negocio han sido creados de forma original para proteger la idea, el software y la marca comercial asociada a VELVET.
