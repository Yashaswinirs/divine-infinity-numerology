import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Award, ExternalLink } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-[#ffd8a2]/15 bg-[#140e2b] flex flex-col shrink-0 min-h-screen">
      <div className="p-6 border-b border-[#ffd8a2]/10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] bg-clip-text text-transparent">
          Divine Infinity
        </h1>
        <p className="text-xs text-[#ffd8a2]/60 mt-1 uppercase tracking-wider">Student Portal</p>
      </div>

      <nav className="p-4 space-y-1.5 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/my-courses"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <BookOpen className="size-4" />
          My Courses
        </NavLink>

        <NavLink
          to="/certificates"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <Award className="size-4" />
          Certificates
        </NavLink>
      </nav>

      <div className="p-4 border-t border-[#ffd8a2]/10">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#ffd8a2]/70 hover:text-[#ffd8a2] rounded-lg hover:bg-white/5 transition-colors"
        >
          <span>Main Website</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </aside>
  );
};
