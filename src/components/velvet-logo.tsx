"use client";

import { motion } from "framer-motion";

export function VelvetLogo({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="120"
      height="138"
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="roseGoldIso" x1="0" y1="0" x2="400" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8F404C" />
          <stop offset="25%" stopColor="#B76E79" />
          <stop offset="50%" stopColor="#F2D7D3" />
          <stop offset="75%" stopColor="#B76E79" />
          <stop offset="100%" stopColor="#8F404C" />
        </linearGradient>
        <linearGradient id="roseGoldStroke" x1="0" y1="0" x2="400" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B76E79" />
          <stop offset="50%" stopColor="#F2D7D3" />
          <stop offset="100%" stopColor="#B76E79" />
        </linearGradient>
      </defs>

      {/* Marco exterior en V */}
      <path d="M55 50 L200 400 L345 50 L295 50 L200 310 L105 50 Z" fill="url(#roseGoldIso)" opacity="0.95" />

      {/* Perfil izquierdo (frente, nariz, labios, barbilla) */}
      <path d="M138 72 C115 82 100 110 96 150 C93 190 105 230 128 260 C145 283 168 300 195 315 L200 318 L200 362 L150 325 C120 300 98 265 90 225 C82 185 88 140 108 105 C118 87 130 76 138 72 Z" fill="none" stroke="url(#roseGoldStroke)" strokeWidth="4.5" opacity="0.95" />
      <path d="M138 72 C142 95 145 120 140 145 C138 158 132 168 122 175 C118 178 114 180 110 181" fill="none" stroke="url(#roseGoldStroke)" strokeWidth="3.5" opacity="0.9" />

      {/* Perfil derecho (espejo) */}
      <path d="M262 72 C285 82 300 110 304 150 C307 190 295 230 272 260 C255 283 232 300 205 315 L200 318 L200 362 L250 325 C280 300 302 265 310 225 C318 185 312 140 292 105 C282 87 270 76 262 72 Z" fill="none" stroke="url(#roseGoldStroke)" strokeWidth="4.5" opacity="0.95" />
      <path d="M262 72 C258 95 255 120 260 145 C262 158 268 168 278 175 C282 178 286 180 290 181" fill="none" stroke="url(#roseGoldStroke)" strokeWidth="3.5" opacity="0.9" />

      {/* Destello central de 4 puntas */}
      <g transform="translate(200,232)">
        <motion.path
          d="M0 -44 L9 -9 L44 0 L9 9 L0 44 L-9 9 L-44 0 L-9 -9 Z"
          fill="#F4EADE"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="0" cy="0" r="9" fill="url(#roseGoldIso)" />
      </g>
    </motion.svg>
  );
}
