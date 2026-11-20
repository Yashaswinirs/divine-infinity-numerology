import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  BarChart3,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-[#ffd8a2]/15 bg-[#120b22] flex flex-col shrink-0 min-h-screen">
      <div className="p-6 border-b border-[#ffd8a2]/10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] bg-clip-text text-transparent">
          Divine Infinity
        </h1>
        <p className="text-[10px] text-[#ffd8a2]/60 mt-1 uppercase tracking-widest font-semibold">
          Platform Administration
        </p>
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
          to="/students"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <Users className="size-4" />
          Students
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <BookOpen className="size-4" />
          Courses
        </NavLink>

        <NavLink
          to="/payments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <CreditCard className="size-4" />
          Payments & Orders
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <BarChart3 className="size-4" />
          Reports & Analytics
        </NavLink>

        <NavLink
          to="/cms-enquiries"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/25'
                : 'text-[#fff0db]/70 hover:bg-white/5 hover:text-[#fff0db]'
            }`
          }
        >
          <MessageSquare className="size-4" />
          CMS Enquiries
        </NavLink>
      </nav>

      <div className="p-4 border-t border-[#ffd8a2]/10 space-y-1">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#ffd8a2]/70 hover:text-[#ffd8a2] rounded-lg hover:bg-white/5 transition-colors"
        >
          <span>Main Website</span>
          <ExternalLink className="size-3.5" />
        </a>
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#ffd8a2]/70 hover:text-[#ffd8a2] rounded-lg hover:bg-white/5 transition-colors"
        >
          <span>Student Portal</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </aside>
  );
};
