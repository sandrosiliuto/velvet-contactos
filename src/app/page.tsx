import RegisterForm from '@/components/RegisterForm'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Imagen del cartel como fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/verbena-cartel.jpg')" }}
      />

      {/* Overlay degradado: más oscuro abajo donde está el form */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-[100dvh] px-5 pb-8 pt-20">
        {/* LOGO animado */}
        <div className="text-center mb-5 animate-fade-in-bounce">
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{
              color: '#fbbf24',
              textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(251,191,36,0.4), 2px 2px 0 #b45309',
            }}
          >
            VERBENA
          </h1>
          <p
            className="text-3xl sm:text-4xl font-black tracking-wider -mt-1"
            style={{
              color: '#f472b6',
              textShadow: '0 3px 15px rgba(0,0,0,0.8), 0 0 25px rgba(244,114,182,0.4), 2px 2px 0 #be185d',
            }}
          >
            CÓSMICA
          </p>
          <p className="text-xs text-white/60 mt-2 tracking-widest uppercase"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            Música · Arte · Buen rollo · La Laguna
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>

        <p className="mt-4 text-[10px] text-white/30 text-center">
          Tus datos solo se usan hoy y se eliminan al terminar
        </p>
      </div>
    </main>
  )
}
