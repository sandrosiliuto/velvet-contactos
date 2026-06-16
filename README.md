# JAMBOOmatch 🌿 — Versión Funcional (v2.0)

App para conocer gente en una fiesta de una noche. **Swipe**, **match mutuo** y contacto directo por **WhatsApp**.

## Funcionalidades 100% operativas

| Funcionalidad | Estado |
|---|---|
| Registro (nombre + foto + WhatsApp) | ✅ Funcional |
| Subida de fotos con compresión automática | ✅ Supabase Storage |
| Visualización de participantes (swipe deck) | ✅ Tarjetas con fotos reales |
| Like / No me gusta (botones + arrastre) | ✅ Persistido en DB |
| Match mutuo (lógica bidireccional) | ✅ Detección automática |
| Modal de match + botón WhatsApp | ✅ Con confeti y enlace directo |
| Panel admin (ver usuarios + borrar datos) | ✅ Ruta protegida /admin |
| Fondo selvático animado | ✅ SVG + CSS keyframes |

## Cómo funciona

1. Un asistente abre la app, pone su nombre, foto y WhatsApp
2. Se registra en la base de datos con su foto almacenada en la nube
3. Ve a otros asistentes en formato de tarjetas (swipe)
4. Puede dar Like (♥) o Pasar (✕) — deslizando o con botones
5. Si dos personas se dan Like mutuamente → **MATCH**
6. Aparece animación de confeti + botón para chatear por WhatsApp
7. Al acabar la fiesta, el admin puede borrar todos los datos desde `/admin`

## Stack técnico

- **Next.js 15.3.8** (App Router, TypeScript)
- **Supabase** (PostgreSQL + Storage)
- **Tailwind CSS v4**
- **Framer Motion** (gestos de swipe)
- **canvas-confetti** (animación de match)

## Variables de entorno

Las variables ya están configuradas en `vercel.json` para despliegue automático.

Para desarrollo local, crea `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://edawyshrkzhcnofchcyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(tu anon key)
SUPABASE_SERVICE_ROLE_KEY=(tu service role key)
ADMIN_PASSWORD=jamboo2024
```

## Despliegue en Vercel

1. Importa este repo en [vercel.com/new](https://vercel.com/new)
2. Las variables de entorno se configuran automáticamente desde `vercel.json`
3. Click en Deploy — funciona inmediatamente

## Desarrollo local

```bash
npm install
npm run dev
```

## Base de datos (ya configurada)

Las tablas `party_users` y `swipes` y el bucket `party-photos` ya están activos en Supabase.

## Contraseña admin

Panel de administración: `/admin`  
Contraseña: `jamboo2024`

---

**Nota**: Esta es una app temporal de una noche. Todos los datos se eliminan al terminar el evento desde el panel admin.
