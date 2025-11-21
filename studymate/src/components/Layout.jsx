import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, BookOpen, FileText, User, Settings, LogOut, MessageCircle } from 'lucide-react'
import { storage } from '../utils/storage'

const Layout = ({ children }) => {
  const navigate = useNavigate()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/study-plan', icon: BookOpen, label: 'Study Plan' },
    { path: '/past-papers', icon: FileText, label: 'Past Papers' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  const handleLogout = () => {
    storage.logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 fixed h-full flex flex-col shadow-xl">
        <div className="p-6 flex-1">
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
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout
