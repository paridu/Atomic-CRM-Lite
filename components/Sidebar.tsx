import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, KanbanSquare, Settings, Sparkles, Activity as ActivityIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: KanbanSquare, label: 'Deals Pipeline', path: '/deals' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: ActivityIcon, label: 'Activities', path: '/activities' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-10 hidden md:flex">
      <div className="p-6 flex items-center space-x-2 border-b border-slate-100">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="font-bold text-slate-800 text-lg">Atomic CRM</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles size={16} className="text-yellow-300" />
            <span className="font-semibold text-sm">Atomic AI</span>
          </div>
          <p className="text-xs text-indigo-100 mb-3">
            Boost your sales with Gemini-powered insights.
          </p>
          <button className="w-full bg-white/10 hover:bg-white/20 text-xs py-1.5 rounded transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;