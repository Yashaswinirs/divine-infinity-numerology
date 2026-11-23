import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/admin.service';
import { CelestialMandala } from '../components/CelestialMandala';
import { Eye, EyeOff, Check, ChevronLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@divineinfinity.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
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
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#140c2e] text-[#f3eefb] flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden selection:bg-[#fdd9a3] selection:text-[#3a2468]">
      {/* Background celestial ambient radial glows */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#342062]/40 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-40 -translate-y-1/2 w-[700px] h-[700px] bg-[#ffd8a2]/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-[#221448]/60 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main 2-column content wrapper */}
      <div className="max-w-[1440px] w-full mx-auto my-auto py-6 grid grid-cols-1 lg:grid-cols-[480px_1fr] items-center gap-12 xl:gap-20 relative z-10">
        {/* Left Column: Glassmorphic Admin Login Card */}
        <main
          className="backdrop-blur-md bg-gradient-to-b from-[#342062]/85 to-[#221448]/90 border border-[#fdd9a3]/28 rounded-[28px] p-8 sm:p-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.45),0_0_90px_rgba(138,106,168,0.35)] w-full max-w-[480px] mx-auto"
        >
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-16 h-16 rounded-full border border-[#fdd9a3]/40 p-1 shadow-[0_0_24px_rgba(253,217,163,0.25)] mb-3 overflow-hidden bg-[#1d1238]">
              <img
                src="/admin-logo.jpg"
                alt="Diviine Infinity"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h1 className="font-serif text-[32px] sm:text-[34px] leading-tight text-[#f7d2a0] font-normal tracking-wide">
              Welcome back
            </h1>
            <p className="text-[14.5px] sm:text-[15.5px] text-[#b9addb] mt-1.5">
              Sign in to your Diviine Infinity admin workspace
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm flex items-start gap-2.5">
              <span className="text-base leading-none">⚠️</span>
              <span className="flex-1 leading-snug">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[14.5px] font-medium text-[#f3eefb] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-[50px] px-4 rounded-xl bg-[#0c0824]/55 border border-[#fdd9a3]/35 text-[#f3eefb] placeholder-[#f3eefb]/35 text-[15px] focus:outline-none focus:border-[#ffd8a2] focus:ring-1 focus:ring-[#ffd8a2]/50 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14.5px] font-medium text-[#f3eefb]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Please contact system administrator to reset credentials.')}
                  className="text-[14px] text-[#fdd9a3] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[50px] pl-4 pr-12 rounded-xl bg-[#0c0824]/55 border border-[#fdd9a3]/35 text-[#f3eefb] placeholder-[#f3eefb]/35 text-[15px] focus:outline-none focus:border-[#ffd8a2] focus:ring-1 focus:ring-[#ffd8a2]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#fdd9a3] hover:text-[#ffd8a2] p-1 cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Keep me signed in Checkbox */}
            <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  keepSignedIn
                    ? 'bg-[#fdd9a3] border-[#fdd9a3] text-[#3a2468]'
                    : 'bg-[#0c0824]/55 border-[#fdd9a3]/50'
                }`}
              >
                {keepSignedIn && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-[14.5px] text-[#f3eefb]">
                Keep me signed in on this device
              </span>
            </label>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] mt-4 bg-[#fdd9a3] hover:bg-[#ffd8a2] active:scale-[0.99] text-[#3a2468] font-bold text-[16px] rounded-full shadow-[0_4px_24px_rgba(253,217,163,0.35)] hover:shadow-[0_6px_30px_rgba(253,217,163,0.5)] transition-all cursor-pointer flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#3a2468] border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-7 pt-4 border-t border-[#fdd9a3]/15 text-center">
            <p className="text-[12px] text-[#b9addb]">
              Default credentials:{' '}
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@divineinfinity.com');
                  setPassword('admin123');
                }}
                className="text-[#fdd9a3] hover:underline font-mono"
              >
                admin@divineinfinity.com
              </button>{' '}
              /{' '}
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@divineinfinity.com');
                  setPassword('admin123');
                }}
                className="text-[#fdd9a3] hover:underline font-mono"
              >
                admin123
              </button>
            </p>
          </div>
        </main>

        {/* Right Column: Celestial Mandala Sacred Geometry */}
        <div className="hidden lg:flex items-center justify-center relative w-full h-[640px] xl:h-[760px]">
          {/* Concentric ambient golden illumination */}
          <div
            className="absolute w-[460px] h-[460px] rounded-full bg-[#fdd9a3]/5 blur-[90px] pointer-events-none"
            aria-hidden="true"
          />
          <CelestialMandala className="w-full h-full max-w-[760px] max-h-[760px] drop-shadow-[0_0_35px_rgba(233,185,110,0.18)]" />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[1440px] mx-auto pt-6 border-t border-[#fdd9a3]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#b9addb] relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-[#b9addb] hover:text-[#fdd9a3] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to website</span>
        </a>

        <div>
          Need help signing in?{' '}
          <a
            href="mailto:support@divineinfinity.com"
            className="text-[#fdd9a3] hover:underline"
          >
            Contact support
          </a>
        </div>

        <div>© 2026 Diviine Infinity Numerology</div>
      </footer>
    </div>
  );
};
