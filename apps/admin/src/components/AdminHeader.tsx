import React from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { AdminService } from '../services/admin.service';
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';

export const AdminHeader: React.FC<{ title?: string }> = ({ title = 'Admin Overview' }) => {
  const { user } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    AdminService.logout();
    navigate('/login');
  };

  return (
    <header className="h-18 border-b border-[#ffd8a2]/15 px-8 flex items-center justify-between bg-[#120b22]/70 backdrop-blur-md sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd8a2]/10 border border-[#ffd8a2]/25 text-[11px] text-[#ffd8a2] font-semibold">
          <Shield className="size-3" /> Super Admin
        </div>

        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-gradient-to-tr from-[#ffd8a2] to-[#c99e64] flex items-center justify-center font-bold text-xs text-[#0b0717]">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-white">{user?.fullName || 'Administrator'}</p>
            <p className="text-[10px] text-[#ffd8a2]/60">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-[#ffd8a2]/60 hover:text-[#ffd8a2] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  );
};
