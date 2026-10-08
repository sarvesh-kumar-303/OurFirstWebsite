import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import AuthPage from '@/components/AuthPage';
import LandingPage from '@/components/LandingPage';
import RoadmapView from '@/components/RoadmapView';
import { generateRoadmap } from '@/lib/roadmapEngine';
import { supabase } from '@/lib/supabase';
import type { RoadmapData, RoadmapRecord } from '@/types';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapId, setRoadmapId] = useState<string | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        setRoadmapId(null);
        setRoadmapData(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Load latest roadmap when session is available
  useEffect(() => {
    if (!authReady) return;
    if (session) {
      loadLatestRoadmap();
    } else {
      setLoadingRoadmap(false);
    }
  }, [authReady, session]);

  const loadLatestRoadmap = async () => {
    setLoadingRoadmap(true);
    const { data } = await supabase
      .from('roadmaps')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      const record = data as RoadmapRecord;
      setRoadmapId(record.id);
      setRoadmapData(record.roadmap_data);
    } else {
      setRoadmapId(null);
      setRoadmapData(null);
    }
    setLoadingRoadmap(false);
  };

  const handleGenerate = async (
    jobTitle: string,
    jobDescription: string,
    currentLevel: string,
    targetTimeline: string
  ) => {
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const generated = generateRoadmap(jobTitle, jobDescription, currentLevel, targetTimeline);

    const { data, error } = await supabase
      .from('roadmaps')
      .insert({
        job_title: jobTitle,
        job_description: jobDescription,
        current_level: currentLevel,
        target_timeline: targetTimeline,
        roadmap_data: generated as unknown as Record<string, unknown>,
      })
      .select()
      .single();

    setIsLoading(false);

    if (error || !data) {
      setRoadmapData(generated);
      setRoadmapId(null);
      return;
    }

    const record = data as RoadmapRecord;
    setRoadmapId(record.id);
    setRoadmapData(record.roadmap_data);
  };

  const handleBack = () => {
    setRoadmapId(null);
    setRoadmapData(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Loading state while auth is initializing
  if (!authReady || (session && loadingRoadmap)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Not signed in — show auth page
  if (!session) {
    return <AuthPage />;
  }

  // Signed in with a roadmap — show roadmap
  if (roadmapData) {
    return (
      <RoadmapView
        roadmapId={roadmapId || 'local'}
        data={roadmapData}
        onBack={handleBack}
        onSignOut={handleSignOut}
        userEmail={session.user.email || undefined}
      />
    );
  }

  // Signed in, no roadmap — show landing page
  return (
    <LandingPage
      onGenerate={handleGenerate}
      isLoading={isLoading}
      onSignOut={handleSignOut}
      userEmail={session.user.email || undefined}
    />
  );
}
