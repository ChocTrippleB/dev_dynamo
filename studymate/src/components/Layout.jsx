import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, CardBody } from '@heroui/react'
import { Home, BookOpen, FileText, Settings } from 'lucide-react'

const Layout = ({ children }) => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/study-plan', icon: BookOpen, label: 'Study Plan' },
    { path: '/past-papers', icon: FileText, label: 'Past Papers' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="flex min-h-screen bg-[#111]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#333] fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">StudyMate</h1>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#333] text-white'
                      : 'text-gray-400 hover:bg-[#252525] hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
