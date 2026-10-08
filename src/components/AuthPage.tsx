import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, Phone, KeyRound } from 'lucide-react';

type AuthMethod = 'email' | 'phone';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');

  // Email states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Phone states
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Format phone to E.164 (Supabase requires + prefix)
  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, '');
    if (raw.startsWith('+')) return '+' + digits;
    return '+' + digits;
  };

  // Cooldown timer for resend
  const startCooldown = () => {
    setOtpCooldown(60);
    const interval = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    const formattedPhone = formatPhone(phone.trim());
    if (formattedPhone.length < 8) {
      setError('Please enter a valid phone number with country code (e.g. +14155552671).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInfo(null);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      if (otpError) throw otpError;

      setOtpSent(true);
      setInfo(`A verification code was sent to ${formattedPhone}. Enter it below to continue.`);
      startCooldown();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      if (msg.toLowerCase().includes('phone') && msg.toLowerCase().includes('rate')) {
        setError('Too many attempts. Please wait a minute before trying again.');
      } else if (msg.toLowerCase().includes('phone')) {
        setError('Could not send OTP to this number. Make sure it includes the country code (e.g. +1 for US).');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    const formattedPhone = formatPhone(phone.trim());
    setIsLoading(true);
    setError(null);
    setInfo(null);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp.trim(),
        type: 'sms',
      });
      if (verifyError) throw verifyError;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('expired')) {
        setError('Invalid or expired code. Please try again or request a new code.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setError(null);
    setInfo(null);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (signUpError) throw signUpError;
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      if (msg.toLowerCase().includes('invalid login')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already been registered')) {
        setError('An account with this email already exists. Try logging in instead.');
      } else if (msg.toLowerCase().includes('password')) {
        setError('Password must be at least 6 characters long.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMethod = (method: AuthMethod) => {
    setAuthMethod(method);
    setError(null);
    setInfo(null);
    setOtpSent(false);
    setOtp('');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
    setInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="relative w-12 h-12 flex items-center justify-center group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 opacity-60 blur-xl" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-cyan-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                <svg viewBox="0 0 32 32" className="relative w-7 h-7">
                  <line x1="16" y1="16" x2="7" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  <line x1="16" y1="16" x2="25" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  <line x1="16" y1="16" x2="16" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <circle cx="7" cy="7" r="3" fill="white" />
                  <circle cx="25" cy="7" r="3" fill="white" />
                  <circle cx="16" cy="28" r="2.5" fill="white" opacity="0.8" />
                  <circle cx="16" cy="16" r="5" fill="white" />
                  <circle cx="16" cy="16" r="2.5" fill="#0ea5e9" />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">FEATURENAVIGATOR</span>
            <p className="text-sm text-slate-400 text-center">
              {mode === 'login' ? 'Welcome back. Sign in to see your roadmaps.' : 'Create an account to start building your roadmap.'}
            </p>
          </div>

          {/* Method switcher */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10 mb-4">
            <button
              type="button"
              onClick={() => switchMethod('email')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                authMethod === 'email'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => switchMethod('phone')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                authMethod === 'phone'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Phone className="w-4 h-4" />
              Phone
            </button>
          </div>

          {/* Auth form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {info && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <KeyRound className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-cyan-300">{info}</p>
              </div>
            )}

            {authMethod === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    disabled={isLoading}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    disabled={isLoading}
                    required
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {authMethod === 'phone' && !otpSent && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    disabled={isLoading}
                    required
                    autoComplete="tel"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Enter your number starting with +91. You'll receive a text with a verification code.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !phone.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending code...
                    </>
                  ) : (
                    <>
                      Send Code
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {authMethod === 'phone' && otpSent && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Verification Code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-center text-2xl tracking-[0.5em] placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    disabled={isLoading}
                    required
                    autoFocus
                  />
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Code sent to {formatPhone(phone)}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !otp.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                      setError(null);
                      setInfo(null);
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    Change number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading || otpCooldown > 0}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {otpCooldown > 0 ? `Resend in ${otpCooldown}s` : 'Resend code'}
                  </button>
                </div>
              </form>
            )}

            {/* Mode switch — only show for email method */}
            {authMethod === 'email' && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <span className="font-medium text-cyan-400">
                    {mode === 'login' ? 'Sign up' : 'Log in'}
                  </span>
                </button>
              </div>
            )}

            {authMethod === 'phone' && (
              <p className="text-center text-xs text-slate-500 pt-1">
                Phone login works for both new and existing accounts. A new account is created automatically on first use.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
