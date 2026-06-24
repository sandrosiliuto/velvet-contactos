"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { VelvetLogo } from "@/components/velvet-logo";
import { VIPBadge } from "@/components/vip-badge";
import { Camera, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("La foto debe pesar menos de 5 MB");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      router.push("/discover");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* Glow decorativo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#b76e79]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <VelvetLogo className="w-24 h-24 mb-4" />
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-[0.2em] text-[#f4eade] text-glow">
            VELVET
          </h1>
          <p className="text-[#b76e79] text-xs tracking-[0.3em] uppercase mt-2">
            Contactos
          </p>
          <div className="mt-4">
            <VIPBadge />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 space-y-5 velvet-glow"
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-square max-h-48 rounded-xl border-2 border-dashed border-[#b76e79]/40 bg-[#2b1f2a]/40 flex flex-col items-center justify-center gap-2 overflow-hidden hover:border-[#b76e79] transition-colors"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <Camera className="w-8 h-8 text-[#b76e79]" />
                <span className="text-sm text-[#f4eade]/70">Añade tu foto</span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            name="photo"
            accept="image/png,image/jpeg,image/webp"
            required
            className="hidden"
            onChange={handleFileChange}
          />

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#f4eade]/70 mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={60}
              placeholder="Tu nombre VIP"
              className="w-full bg-[#0a0a0a]/60 border border-[#f4eade]/10 rounded-lg px-4 py-3 text-[#f4eade] placeholder:text-[#f4eade]/30 focus:outline-none focus:border-[#b76e79] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#f4eade]/70 mb-1.5">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              required
              pattern="\d{9}"
              maxLength={9}
              placeholder="612345678"
              className="w-full bg-[#0a0a0a]/60 border border-[#f4eade]/10 rounded-lg px-4 py-3 text-[#f4eade] placeholder:text-[#f4eade]/30 focus:outline-none focus:border-[#b76e79] transition-colors"
            />
            <p className="text-[10px] text-[#f4eade]/40 mt-1.5">
              9 dígitos españoles
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="accepted"
              value="true"
              required
              className="peer sr-only"
            />
            <span className="w-5 h-5 rounded border border-[#f4eade]/20 flex items-center justify-center peer-checked:bg-[#b76e79] peer-checked:border-[#b76e79] transition-colors mt-0.5">
              <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
            </span>
            <span className="text-xs text-[#f4eade]/60 leading-relaxed">
              Acepto que VELVET contactos gestione mis datos para facilitar
              conexiones VIP entre adultos mayores de edad.
            </span>
          </label>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#b76e79] text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b76e79] hover:bg-[#a05d68] disabled:opacity-60 text-white font-[family-name:var(--font-cinzel)] font-semibold tracking-widest uppercase py-4 rounded-lg transition-colors"
          >
            {loading ? "Entrando..." : "Entrar VIP"}
          </button>
        </form>

        <p className="text-center mt-6 text-[10px] uppercase tracking-[0.25em] text-[#f4eade]/40">
          En la vida todo son contactos
        </p>
      </div>
    </motion.main>
  );
}
