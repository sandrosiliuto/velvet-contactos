import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase-server'
import SwipeDeck from '@/components/SwipeDeck'
import JungleBackground from '@/components/JungleBackground'

export const dynamic = 'force-dynamic'

const DEMO_USERS = [
  { id: 'demo-p1', name: 'Laura', photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura&backgroundColor=fbbf24' },
  { id: 'demo-p2', name: 'Diego', photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego&backgroundColor=f472b6' },
  { id: 'demo-p3', name: 'Carmen', photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen&backgroundColor=60a5fa' },
  { id: 'demo-p4', name: 'Javier', photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier&backgroundColor=a78bfa' },
  { id: 'demo-p5', name: 'Sofía', photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia&backgroundColor=fbbf24' },
]

export default async function DiscoverPage() {
  const cookieStore = await cookies()
  const currentUserId = cookieStore.get('party_user_id')?.value
  if (!currentUserId) redirect('/')

  const isDemoMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY

  if (isDemoMode) {
    const myName = cookieStore.get('party_user_name')?.value ?? 'tú'
    return (
      <div className="relative h-screen flex flex-col overflow-hidden">
        <JungleBackground />
        <header className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-purple-900/30 bg-black/60 backdrop-blur-sm"
        >
          <span className="font-black text-xl">
            <span className="text-[#fbbf24]">VERBENA</span>{' '}
            <span className="text-[#f472b6]">CÓSMICA</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">Hola, {myName} ✨</span>
            <span className="text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2 py-0.5 rounded-full">
              ⚡ Demo
            </span>
          </div>
        </header>
        <div className="relative z-10 flex-1 overflow-hidden">
          <SwipeDeck users={DEMO_USERS} currentUserId={currentUserId} isDemo />
        </div>
      </div>
    )
  }

  const supabase = createServiceClient()

  const { data: swipes } = await supabase
    .from('swipes')
    .select('swiped_id, liked')
    .eq('swiper_id', currentUserId)

  const likedIds = (swipes ?? []).filter((s) => s.liked).map((s) => s.swiped_id)

  let query = supabase
    .from('party_users')
    .select('id, name, photo_url')
    .neq('id', currentUserId)
    .order('created_at', { ascending: false })

  if (likedIds.length > 0) {
    query = query.not('id', 'in', `(${likedIds.join(',')})`)
  }

  const { data: users } = await query

  const { data: me } = await supabase
    .from('party_users')
    .select('name')
    .eq('id', currentUserId)
    .single()

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <JungleBackground />
      <header className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-purple-900/30 bg-black/60 backdrop-blur-sm"
      >
        <span className="font-black text-xl">
          <span className="text-[#fbbf24]">VERBENA</span>{' '}
          <span className="text-[#f472b6]">CÓSMICA</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/50">Hola, {me?.name ?? '...'} ✨</span>
          <form action="/api/logout" method="post">
            <button className="text-xs text-white/30 hover:text-white transition">
              Salir
            </button>
          </form>
        </div>
      </header>
      <div className="relative z-10 flex-1 overflow-hidden">
        <SwipeDeck users={users ?? []} currentUserId={currentUserId} />
      </div>
    </div>
  )
}
