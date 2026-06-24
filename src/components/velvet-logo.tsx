"use client";

import { motion } from "framer-motion";

export function VelvetLogo({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Aura central */}
      <circle cx="50" cy="50" r="45" fill="url(#velvetGradient)" opacity="0.15" />
      <circle cx="50" cy="50" r="30" fill="url(#velvetGradient)" opacity="0.25" />
      <circle cx="50" cy="50" r="12" fill="#b76e79" opacity="0.9" />

      {/* Rostro izquierdo */}
      <path
        d="M50 50 C38 42 28 48 24 60 C22 68 28 78 38 82 C44 84 50 78 50 72"
        stroke="#f4eade"
        strokeWidth="2"
        fill="none"
        opacity="0.85"
      />
      <circle cx="34" cy="58" r="2.5" fill="#f4eade" opacity="0.9" />
      <path
        d="M30 70 Q36 74 42 70"
        stroke="#b76e79"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Rostro derecho */}
      <path
        d="M50 50 C62 42 72 48 76 60 C78 68 72 78 62 82 C56 84 50 78 50 72"
        stroke="#f4eade"
        strokeWidth="2"
        fill="none"
        opacity="0.85"
      />
      <circle cx="66" cy="58" r="2.5" fill="#f4eade" opacity="0.9" />
      <path
        d="M58 70 Q64 74 70 70"
        stroke="#b76e79"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Destellos */}
      <path
        d="M50 12 L52 22 L50 20 L48 22 Z"
        fill="#f4eade"
        opacity="0.8"
      />
      <path
        d="M50 88 L52 78 L50 80 L48 78 Z"
        fill="#f4eade"
        opacity="0.8"
      />
      <path
        d="M12 50 L22 52 L20 50 L22 48 Z"
        fill="#f4eade"
        opacity="0.6"
      />
      <path
        d="M88 50 L78 52 L80 50 L78 48 Z"
        fill="#f4eade"
        opacity="0.6"
      />

      <defs>
        <radialGradient id="velvetGradient" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b76e79" />
          <stop offset="100%" stopColor="#2b1f2a" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
