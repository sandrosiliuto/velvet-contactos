"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { VelvetHeader } from "@/components/velvet-header";
import { Heart, MessageCircle, Loader2, Crown } from "lucide-react";

type Match = {
  id: string;
  created_at: string;
  other: {
    id: string;
    name: string;
    phone: string;
    photo_url: string;
  };
};

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <VelvetHeader />
      <main className="min-h-dvh pt-24 pb-8 px-4 max-w-md mx-auto">
        <h2 className="font-[family-name:var(--font-cinzel)] text-xl tracking-widest text-[#f4eade] mb-6 text-center">
          Tus matches VIP
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#b76e79] animate-spin" />
          </div>
        ) : matches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <Crown className="w-10 h-10 text-[#b76e79] mx-auto mb-4" />
            <p className="text-[#f4eade]/70">
              Aún no tienes matches. Sigue descubriendo contactos VIP.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {matches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={match.other.photo_url}
                  alt={match.other.name}
                  className="w-16 h-16 rounded-full object-cover border border-[#b76e79]/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-[#b76e79]" />
                    <h3 className="font-[family-name:var(--font-cinzel)] font-semibold text-[#f4eade] truncate">
                      {match.other.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[#f4eade]/50 truncate">
                    {match.other.phone}
                  </p>
                </div>
                <a
                  href={`https://wa.me/34${match.other.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 mt-8">
          <a
            href="/discover"
            className="w-full text-center py-3 rounded-lg border border-[#b76e79]/40 text-[#f4eade] hover:bg-[#b76e79]/10 transition-colors text-sm uppercase tracking-widest"
          >
            Seguir descubriendo
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-center py-3 text-xs uppercase tracking-widest text-[#f4eade]/40 hover:text-[#f4eade] transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </>
  );
}
