"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { VelvetIsoLogo } from "@/components/velvet-logo";
import { VIPBadge } from "@/components/vip-badge";
import { Loader2, Trash2, Users, AlertTriangle } from "lucide-react";

type User = {
  id: string;
  name: string;
  phone: string;
  photo_url: string;
  created_at: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${password}` },
    });

    if (!res.ok) {
      setError("Contraseña incorrecta");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setUsers(data.users || []);
    setLoggedIn(true);
    setLoading(false);
  };

  const refreshUsers = async () => {
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${password}` },
    });
    const data = await res.json();
    setUsers(data.users || []);
  };

  const deleteAll = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/delete-all", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${password}` },
    });
    setLoading(false);
    setConfirmDelete(false);

    if (res.ok) {
      await refreshUsers();
    } else {
      setError("Error borrando datos");
    }
  };

  if (!loggedIn) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-dvh flex flex-col items-center justify-center px-6"
      >
        <div className="flex flex-col items-center mb-8">
          <VelvetIsoLogo className="w-20 h-20 mb-4" />
          <h1 className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.2em] text-[#f4eade]">
            VELVET
          </h1>
          <VIPBadge className="mt-3" />
        </div>

        <form
          onSubmit={login}
          className="glass rounded-2xl p-6 w-full max-w-sm velvet-glow space-y-4"
        >
          <label className="block text-xs uppercase tracking-wider text-[#f4eade]/70">
            Acceso administrador
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full bg-[#0a0a0a]/60 border border-[#f4eade]/10 rounded-lg px-4 py-3 text-[#f4eade] placeholder:text-[#f4eade]/30 focus:outline-none focus:border-[#b76e79]"
          />

          {error && (
            <p className="text-[#b76e79] text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b76e79] hover:bg-[#a05d68] disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors uppercase tracking-widest"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-dvh pt-24 pb-8 px-4 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-[#b76e79]" />
          <h2 className="font-[family-name:var(--font-cinzel)] text-xl tracking-widest">
            Panel Admin
          </h2>
        </div>
        <VIPBadge />
      </div>

      <div className="glass rounded-2xl p-4 mb-6 flex items-center justify-between">
        <span className="text-sm text-[#f4eade]/70">
          {users.length} usuario{users.length !== 1 ? "s" : ""} registrados
        </span>
        <button
          onClick={() => setConfirmDelete(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-900/60 hover:bg-red-900 text-red-100 rounded-lg text-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Borrar todo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#b76e79] animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="glass rounded-xl p-3 flex items-center gap-3"
            >
              <img
                src={user.photo_url}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#f4eade] truncate">{user.name}</p>
                <p className="text-xs text-[#f4eade]/50 truncate">{user.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmación borrar todo */}
      {confirmDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="glass-strong rounded-2xl p-6 max-w-sm w-full text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="font-[family-name:var(--font-cinzel)] text-lg mb-2">
              ¿Borrar todo?
            </h3>
            <p className="text-sm text-[#f4eade]/60 mb-6">
              Esta acción eliminará todos los usuarios, swipes, matches y fotos.
              No se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 rounded-lg border border-[#f4eade]/20 text-[#f4eade] hover:bg-[#f4eade]/5"
              >
                Cancelar
              </button>
              <button
                onClick={deleteAll}
                className="flex-1 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white"
              >
                Sí, borrar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}
