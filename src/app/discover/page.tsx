"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";
import { VelvetHeader } from "@/components/velvet-header";
import { Heart, X, Crown, Loader2 } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  phone: string;
  photo_url: string;
};

export default function DiscoverPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matchData, setMatchData] = useState<Profile | null>(null);

  const [dragX, setDragX] = useState(0);

  const fetchProfiles = useCallback(async () => {
    try {
      const res = await fetch("/api/profiles");
      if (!res.ok) throw new Error("Error cargando perfiles");
      const data = await res.json();
      setProfiles(data.profiles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = async (swipedId: string, dir: "like" | "pass") => {
    setDirection(dir === "like" ? "right" : "left");

    try {
      const res = await fetch("/api/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swipedId, direction: dir }),
      });
      const data = await res.json();

      if (data.match) {
        const matched = profiles.find((p) => p.id === swipedId);
        if (matched) {
          setMatchData(matched);
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#b76e79", "#f4eade", "#2b1f2a"],
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setDirection(null);
        setDragX(0);
      }, 300);
    }
  };

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!currentProfile) return;
    if (info.offset.x > 100) {
      handleSwipe(currentProfile.id, "like");
    } else if (info.offset.x < -100) {
      handleSwipe(currentProfile.id, "pass");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <>
        <VelvetHeader />
        <div className="min-h-dvh flex items-center justify-center pt-16">
          <Loader2 className="w-8 h-8 text-[#b76e79] animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <VelvetHeader />
      <main className="min-h-dvh pt-24 pb-8 px-4 flex flex-col items-center">
        <h2 className="font-[family-name:var(--font-cinzel)] text-xl tracking-widest text-[#f4eade] mb-6 text-center">
          Descubre contactos VIP
        </h2>

        <div className="relative w-full max-w-sm aspect-[3/4]">
          <AnimatePresence mode="popLayout">
            {currentProfile ? (
              <motion.div
                key={currentProfile.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                exit={{
                  x: direction === "right" ? 300 : -300,
                  rotate: direction === "right" ? 20 : -20,
                  opacity: 0,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDrag={(_, info) => setDragX(info.offset.x)}
                onDragEnd={onDragEnd}
                className="absolute inset-0 rounded-2xl overflow-hidden glass-strong velvet-glow cursor-grab active:cursor-grabbing"
              >
                <img
                  src={currentProfile.photo_url}
                  alt={currentProfile.name}
                  className="w-full h-3/4 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-4 h-4 text-[#b76e79]" />
                    <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-semibold text-[#f4eade]">
                      {currentProfile.name}
                    </h3>
                  </div>
                  <p className="text-[#f4eade]/60 text-sm">{currentProfile.phone}</p>
                </div>

                {/* Badges de acción al arrastrar */}
                <motion.div
                  className="absolute top-5 left-5 border-4 border-green-400 text-green-400 px-4 py-2 rounded-xl font-bold tracking-widest uppercase rotate-[-15deg] pointer-events-none"
                  animate={{
                    opacity: dragX > 40 ? Math.min((dragX - 40) / 80, 1) : 0,
                  }}
                >
                  Like
                </motion.div>
                <motion.div
                  className="absolute top-5 right-5 border-4 border-red-400 text-red-400 px-4 py-2 rounded-xl font-bold tracking-widest uppercase rotate-[15deg] pointer-events-none"
                  animate={{
                    opacity: dragX < -40 ? Math.min((-dragX - 40) / 80, 1) : 0,
                  }}
                >
                  Pass
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center text-center p-6"
              >
                <Crown className="w-12 h-12 text-[#b76e79] mb-4" />
                <h3 className="font-[family-name:var(--font-cinzel)] text-xl mb-2">
                  No hay más perfiles
                </h3>
                <p className="text-[#f4eade]/60 text-sm mb-6">
                  Vuelve más tarde para descubrir nuevos contactos VIP.
                </p>
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    fetchProfiles();
                  }}
                  className="px-6 py-2 bg-[#b76e79] hover:bg-[#a05d68] rounded-lg text-white text-sm font-semibold"
                >
                  Recargar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentProfile && (
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={() => handleSwipe(currentProfile.id, "pass")}
              className="w-16 h-16 rounded-full bg-[#2b1f2a] border border-[#f4eade]/10 flex items-center justify-center text-[#f4eade] hover:bg-[#3a2a38] transition-colors"
              aria-label="Pass"
            >
              <X className="w-7 h-7" />
            </button>
            <button
              onClick={() => handleSwipe(currentProfile.id, "like")}
              className="w-16 h-16 rounded-full bg-[#b76e79] flex items-center justify-center text-white hover:bg-[#a05d68] transition-colors shadow-lg shadow-[#b76e79]/30"
              aria-label="Like"
            >
              <Heart className="w-7 h-7" />
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-10 text-xs uppercase tracking-widest text-[#f4eade]/40 hover:text-[#f4eade] transition-colors"
        >
          Cerrar sesión
        </button>

        {/* Modal de match */}
        <AnimatePresence>
          {matchData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-strong rounded-2xl p-8 max-w-sm w-full text-center velvet-glow"
              >
                <Crown className="w-12 h-12 text-[#b76e79] mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-cinzel)] text-2xl mb-2">
                  ¡Match VIP!
                </h3>
                <p className="text-[#f4eade]/70 mb-6">
                  Tú y {matchData.name} os habéis gustado.
                </p>
                <img
                  src={matchData.photo_url}
                  alt={matchData.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[#b76e79]"
                />
                <a
                  href={`https://wa.me/34${matchData.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mb-3"
                >
                  Abrir WhatsApp
                </a>
                <button
                  onClick={() => setMatchData(null)}
                  className="text-sm text-[#f4eade]/50 hover:text-[#f4eade]"
                >
                  Seguir descubriendo
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
