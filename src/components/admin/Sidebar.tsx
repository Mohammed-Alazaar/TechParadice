'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Briefcase, Settings, MessageSquare, LogOut, Layers } from 'lucide-react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-white/10 bg-[#0a0a0a]">
      <div className="flex h-14 items-center border-b border-white/10 px-5">
        <span className="font-display text-[15px] font-bold tracking-tight text-white">
          Tech<span className="text-teal">Paradice</span>
          <span className="ml-1 text-[11px] font-normal text-white/40">admin</span>
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-teal/10 text-teal'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  )
}
