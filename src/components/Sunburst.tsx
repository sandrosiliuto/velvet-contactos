/**
 * Sunburst — Decoración de rayos de sol dorados (como en el logo original).
 * SVG con líneas radiantes desde el centro, con animación de pulso.
 */
export default function Sunburst({
  position = 'top',
  className = '',
}: {
  position?: 'top' | 'bottom'
  className?: string
}) {
  const isTop = position === 'top'

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 sunburst-pulse ${className}`}
      style={{
        [isTop ? 'top' : 'bottom']: isTop ? -60 : -60,
        width: 320,
        height: 160,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 320 160"
        fill="none"
        className="w-full h-full"
        style={{ transform: isTop ? 'none' : 'rotate(180deg)' }}
      >
        {/* Rayos finos radiantes */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = -90 + (i * 180) / 35
          const rad = (angle * Math.PI) / 180
          const len = 80 + (i % 3 === 0 ? 40 : i % 2 === 0 ? 25 : 10)
          const x2 = 160 + Math.cos(rad) * len
          const y2 = 150 + Math.sin(rad) * len
          return (
            <line
              key={i}
              x1={160}
              y1={150}
              x2={x2}
              y2={y2}
              stroke="#e8deb5"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
              strokeOpacity={i % 3 === 0 ? 0.7 : 0.4}
              strokeLinecap="round"
            />
          )
        })}
        {/* Arco central */}
        <path
          d="M80 150 Q160 60 240 150"
          stroke="#e8deb5"
          strokeWidth="1.2"
          strokeOpacity="0.3"
          fill="none"
        />
      </svg>
    </div>
  )
}
