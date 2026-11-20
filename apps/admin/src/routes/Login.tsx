import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/admin.service';
import { Shield } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@divineinfinity.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await AdminService.login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0717] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#120b22] border border-[#ffd8a2]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 size-40 bg-[#ffd8a2]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8">
          <div className="size-12 rounded-2xl bg-[#ffd8a2]/15 text-[#ffd8a2] border border-[#ffd8a2]/30 flex items-center justify-center mx-auto mb-3">
            <Shield className="size-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] bg-clip-text text-transparent">
            Admin Console
          </h1>
          <p className="text-xs text-[#ffd8a2]/70 mt-1">Divine Infinity Platform Control Center</p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#ffd8a2]/80 mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#ffd8a2]/80 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0b0717] font-bold text-sm rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? 'Verifying Credentials...' : 'Sign In as Administrator'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-[#ffd8a2]/50">
            Default credentials: <span className="text-[#ffd8a2]">admin@divineinfinity.com</span> / <span className="text-[#ffd8a2]">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};
