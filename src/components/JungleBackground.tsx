/**
 * JungleBackground — Fondo oscuro tipo templo en la jungla.
 * Colores: verde muy oscuro, dorado tenue, plantas tropicales SVG.
 * Animaciones CSS puras para rendimiento.
 */
export default function JungleBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Gradiente base — verde muy oscuro tipo templo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(20,40,10,0.7) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 0%, rgba(20,35,8,0.4) 0%, transparent 60%), #050a04',
        }}
      />

      {/* Textura de vegetación (overlay sutil) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5' fill='%2300e676' opacity='0.5'/%3E%3Cpath d='M10 35 Q15 45 10 55 Q5 45 10 35' fill='%2300e676' opacity='0.3'/%3E%3Cpath d='M50 40 Q55 50 50 58 Q45 50 50 40' fill='%2300e676' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Enredadera izquierda ────────────────────────────── */}
      <svg
        className="absolute plant-sway-slow"
        style={{ top: 0, left: -10, width: 120, height: '55%', opacity: 0.4 }}
        viewBox="0 0 120 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M60 0 Q45 50 55 100 Q70 150 50 200 Q35 250 55 300 Q65 350 50 400"
          stroke="#2d5a16"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {[60, 130, 200, 270, 340].map((y, i) => (
          <ellipse
            key={i}
            cx={i % 2 === 0 ? 75 : 35}
            cy={y}
            rx="22"
            ry="14"
            fill="#1a4a0a"
            fillOpacity="0.6"
            stroke="#2d5a16"
            strokeWidth="1"
            transform={`rotate(${i % 2 === 0 ? 25 : -25} ${i % 2 === 0 ? 75 : 35} ${y})`}
          />
        ))}
      </svg>

      {/* ── Enredadera derecha ─────────────────────────────── */}
      <svg
        className="absolute plant-sway-rev"
        style={{ top: 0, right: -10, width: 120, height: '55%', opacity: 0.35 }}
        viewBox="0 0 120 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M60 0 Q75 60 65 120 Q50 180 70 240 Q85 300 65 360 Q55 380 60 400"
          stroke="#2d5a16"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {[50, 120, 190, 260, 330].map((y, i) => (
          <ellipse
            key={i}
            cx={i % 2 === 0 ? 40 : 80}
            cy={y}
            rx="20"
            ry="13"
            fill="#1a4a0a"
            fillOpacity="0.5"
            stroke="#2d5a16"
            strokeWidth="1"
            transform={`rotate(${i % 2 === 0 ? -20 : 20} ${i % 2 === 0 ? 40 : 80} ${y})`}
          />
        ))}
      </svg>

      {/* ── Monstera abajo izquierda ──────────────────────── */}
      <svg
        className="absolute plant-sway"
        style={{ bottom: -30, left: -20, width: 180, height: 250, opacity: 0.45 }}
        viewBox="0 0 180 250"
        fill="none"
      >
        <path d="M90 250 Q85 180 95 140" stroke="#1a4a0a" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M90 140 C55 120 20 85 15 55 C12 35 28 28 45 35 C48 20 62 22 60 38 C68 22 82 25 78 42 C92 28 105 35 98 50 C115 48 118 65 105 72 C98 105 90 125 90 140Z"
          fill="#1a4a0a"
          fillOpacity="0.7"
          stroke="#2d5a16"
          strokeWidth="1.5"
        />
      </svg>

      {/* ── Monstera abajo derecha ────────────────────────── */}
      <svg
        className="absolute plant-float-slow"
        style={{ bottom: -20, right: -15, width: 160, height: 220, opacity: 0.4 }}
        viewBox="0 0 160 220"
        fill="none"
      >
        <path d="M80 220 Q78 160 82 120" stroke="#1a4a0a" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M80 120 C50 105 22 75 18 48 C15 30 30 25 42 32 C45 18 58 20 55 35 C63 20 76 24 72 38 C85 24 96 32 90 45 C105 43 108 58 96 65 C90 92 82 110 80 120Z"
          fill="#1a4a0a"
          fillOpacity="0.6"
          stroke="#2d5a16"
          strokeWidth="1.5"
        />
      </svg>

      {/* ── Puntos de luz (luciérnagas) ───────────────────── */}
      {[
        { x: '12%', y: '25%', delay: 0 },
        { x: '85%', y: '18%', delay: 1 },
        { x: '75%', y: '65%', delay: 2 },
        { x: '18%', y: '70%', delay: 0.5 },
        { x: '50%', y: '12%', delay: 1.5 },
        { x: '60%', y: '80%', delay: 2.5 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full plant-breathe"
          style={{
            left: dot.x,
            top: dot.y,
            width: 3,
            height: 3,
            background: '#e8deb5',
            boxShadow: '0 0 8px #e8deb5, 0 0 16px rgba(232,222,181,0.3)',
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
