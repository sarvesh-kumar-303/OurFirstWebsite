import { useState } from 'react';
import { ArrowRight, Loader2, LogOut } from 'lucide-react';
import DeveloperFooter from './DeveloperFooter';

interface LandingPageProps {
  onGenerate: (jobTitle: string, jobDescription: string, currentLevel: string, targetTimeline: string) => void;
  isLoading: boolean;
  onSignOut: () => void;
  userEmail?: string;
}

const EXAMPLE_JOBS = [
  'Software Engineer',
  'MBA',
  'Doctor',
  'Lawyer',
  'Data Scientist',
  'Marathon Runner',
  'Public Speaker',
  'Entrepreneur',
];

export default function LandingPage({ onGenerate, isLoading, onSignOut, userEmail }: LandingPageProps) {
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;
    onGenerate(jobTitle.trim(), '', 'Complete Beginner', '1 year');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Sign out */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          {userEmail && (
            <span className="text-xs text-slate-400 hidden sm:block">{userEmail}</span>
          )}
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        <div className="max-w-xl w-full">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
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
          </div>

          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
              What's your goal?
            </h1>
            <p className="text-base text-slate-400 max-w-md mx-auto">
              Type any future goal — a career, a skill, a personal achievement — and get a step-by-step roadmap with the best books and resources to get there.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Become a Lawyer, Run a Marathon, Learn AI..."
              className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              disabled={isLoading}
              autoFocus
              required
            />

            {/* Example chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {EXAMPLE_JOBS.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setJobTitle(ex)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!jobTitle.trim() || isLoading}
              className="w-full mt-5 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Building your roadmap...
                </>
              ) : (
                <>
                  Get My Roadmap
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <DeveloperFooter />
      </div>
    </div>
  );
}
