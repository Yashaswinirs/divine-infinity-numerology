import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const Header: React.FC<{ title?: string }> = ({ title = 'Student Dashboard' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <header className="h-18 border-b border-[#ffd8a2]/15 px-8 flex items-center justify-between bg-[#140e2b]/60 backdrop-blur-md sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-semibold text-[#fff0db]">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-gradient-to-tr from-[#ffd8a2] to-[#512b58] flex items-center justify-center font-bold text-xs text-[#0e081e] overflow-hidden">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} className="size-full object-cover" />
            ) : (
              user?.fullName?.charAt(0) || 'S'
            )}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-medium text-[#fff0db]">{user?.fullName || 'Student'}</p>
            <p className="text-[10px] text-[#ffd8a2]/60">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-[#ffd8a2]/60 hover:text-[#ffd8a2] hover:bg-white/5 rounded-lg transition-colors"
          title="Sign Out"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  );
};
