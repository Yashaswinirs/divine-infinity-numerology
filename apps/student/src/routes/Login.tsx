import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('student@divineinfinity.com');
  const [password, setPassword] = useState('student123');
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isRegister) {
        await AuthService.register(fullName, email, password);
      } else {
        await AuthService.login(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e081e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#140e2b] border border-[#ffd8a2]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute -top-24 -right-24 size-48 bg-[#512b58]/50 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-48 bg-[#ffd8a2]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] bg-clip-text text-transparent">
            Divine Infinity LMS
          </h1>
          <p className="text-xs text-[#ffd8a2]/70 mt-1">
            {isRegister ? 'Create your student account' : 'Sign in to access your courses & certificates'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-[#ffd8a2]/80 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#ffd8a2]/80 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@divineinfinity.com"
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
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-[#ffd8a2] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#ffd8a2] to-[#c99e64] text-[#0e081e] font-bold text-sm rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Register' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#ffd8a2]/60">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#ffd8a2] font-semibold underline underline-offset-2 hover:opacity-80"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New student?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#ffd8a2] font-semibold underline underline-offset-2 hover:opacity-80"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-[#ffd8a2]/50">
            Demo Student: <span className="text-[#ffd8a2]">student@divineinfinity.com</span> / <span className="text-[#ffd8a2]">student123</span>
          </p>
        </div>
      </div>
    </div>
  );
};
