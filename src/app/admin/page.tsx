'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [pw, setPw] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch(`/api/admin/users?pw=${encodeURIComponent(pw)}`)
    if (res.ok) {
      const data = await res.json()
      setUsers(data.users)
      setAuthed(true)
    } else {
      setError('Contraseña incorrecta')
    }
    setLoading(false)
  }

  async function deleteAll() {
    if (!confirm('¿Borrar TODOS los usuarios? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/delete-all?pw=${encodeURIComponent(pw)}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      setUsers([])
      setDeleted(true)
    }
    setDeleting(false)
  }

  if (!authed) {
    return (
      <main className="relative min-h-screen flex items-center justify-center p-4 velvet-radial">
        <header className="fixed top-0 inset-x-0 z-50 h-14 velvet-glass border-b border-white/5">
          <div className="max-w-md mx-auto h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 200 200" fill="none" aria-hidden="true" className="sparkle">
                <path d="M100 10 L112 88 L190 100 L112 112 L100 190 L88 112 L10 100 L88 88 Z" fill="url(#roseGoldAdmin)" />
                <defs>
                  <linearGradient id="roseGoldAdmin" x1="0" y1="0" x2="200" y2="200">
                    <stop offset="0%" stopColor="#8F404C" />
                    <stop offset="35%" stopColor="#B76E79" />
                    <stop offset="55%" stopColor="#F2D7D3" />
                    <stop offset="75%" stopColor="#B76E79" />
                    <stop offset="100%" stopColor="#8F404C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-serif text-xs tracking-[0.35em] text-[#F2D7D3]">VELVET</span>
            </div>
            <span className="vip-badge text-[10px] font-semibold tracking-widest">ADMIN</span>
          </div>
        </header>
        <div className="relative z-10 card-border rounded-3xl p-8 w-full max-w-sm space-y-5">
          <h1 className="text-2xl font-black text-center text-[#F2D7D3] font-serif">🔐 Panel Admin</h1>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2B1F2A] focus:border-[#B76E79]/50 outline-none transition placeholder-[#B76E79]/30 text-[#F4EADE]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-[#0A0A0A] disabled:opacity-50 transition hover:opacity-90 metallic-rose-gold"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen p-4 max-w-3xl mx-auto velvet-radial pt-16">
      <header className="fixed top-0 inset-x-0 z-50 h-14 velvet-glass border-b border-white/5">
        <div className="max-w-3xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 200 200" fill="none" aria-hidden="true" className="sparkle">
              <path d="M100 10 L112 88 L190 100 L112 112 L100 190 L88 112 L10 100 L88 88 Z" fill="url(#roseGoldAdmin2)" />
              <defs>
                <linearGradient id="roseGoldAdmin2" x1="0" y1="0" x2="200" y2="200">
                  <stop offset="0%" stopColor="#8F404C" />
                  <stop offset="35%" stopColor="#B76E79" />
                  <stop offset="55%" stopColor="#F2D7D3" />
                  <stop offset="75%" stopColor="#B76E79" />
                  <stop offset="100%" stopColor="#8F404C" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-serif text-xs tracking-[0.35em] text-[#F2D7D3]">VELVET</span>
          </div>
          <span className="vip-badge text-[10px] font-semibold tracking-widest">ADMIN</span>
        </div>
      </header>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-black text-[#F2D7D3] font-serif">🎉 Panel Admin</h1>
          <span className="text-[#B76E79]/60 text-sm">{users.length} asistentes</span>
        </div>

        {deleted ? (
          <div className="text-center py-16 space-y-3">
            <div className="text-5xl">🧹</div>
            <p className="text-xl font-bold text-[#F2D7D3]">Todos los datos eliminados</p>
            <p className="text-[#B76E79]/50">¡Hasta la próxima!</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="card-border rounded-2xl p-4 flex items-center gap-4"
                >
                  {u.photo_url ? (
                    <img
                      src={u.photo_url}
                      alt={u.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#2B1F2A]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#2B1F2A] flex items-center justify-center text-xl">
                      🙂
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-sm text-[#B76E79]/50">{u.phone}</p>
                  </div>
                  <span className="ml-auto text-xs text-[#B76E79]/30">
                    {new Date(u.created_at).toLocaleTimeString('es', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={deleteAll}
              disabled={deleting}
              className="w-full py-4 rounded-2xl font-bold bg-red-800 hover:bg-red-700 disabled:opacity-50 transition text-white"
            >
              {deleting ? 'Eliminando...' : '🗑️ Finalizar Evento y Borrar Todos los Datos'}
            </button>
          </>
        )}
      </div>
    </main>
  )
}
