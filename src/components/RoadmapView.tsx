import { useState, useEffect, useCallback } from 'react';
import type { RoadmapData, RoadmapNode, NodeStatus, ViewMode, NodeProgressRecord } from '@/types';
import { supabase } from '@/lib/supabase';
import SkillTree from './SkillTree';
import TimelineView from './TimelineView';
import MindMapView from './MindMapView';
import NodeDetailPanel from './NodeDetailPanel';
import {
  List, GitBranch, Network, Home, LogOut, TrendingUp, BookMarked, PlayCircle,
} from 'lucide-react';
import BooksView from './BooksView';
import VideosView from './VideosView';
import DeveloperFooter from './DeveloperFooter';

interface RoadmapViewProps {
  roadmapId: string;
  data: RoadmapData;
  onBack: () => void;
  onSignOut: () => void;
  userEmail?: string;
}

const VIEW_CONFIG: Record<ViewMode, { icon: typeof List; label: string }> = {
  'timeline': { icon: List, label: 'Step by Step' },
  'videos': { icon: PlayCircle, label: 'Videos' },
  'books': { icon: BookMarked, label: 'Books' },
  'skill-tree': { icon: GitBranch, label: 'Skill Tree' },
  'mind-map': { icon: Network, label: 'Mind Map' },
};

export default function RoadmapView({ roadmapId, data, onBack, onSignOut, userEmail }: RoadmapViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [progressMap, setProgressMap] = useState<Map<string, NodeStatus>>(new Map());
  const [showPanel, setShowPanel] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Load progress from Supabase
  useEffect(() => {
    loadProgress();
  }, [roadmapId]);

  const loadProgress = useCallback(async () => {
    const { data: records } = await supabase
      .from('node_progress')
      .select('*')
      .eq('roadmap_id', roadmapId);

    if (records) {
      const map = new Map<string, NodeStatus>();
      (records as NodeProgressRecord[]).forEach((r) => {
        map.set(r.node_id, r.status);
      });
      setProgressMap(map);
    }
  }, [roadmapId]);

  const handleStatusChange = useCallback(async (nodeId: string, status: NodeStatus) => {
    setProgressMap((prev) => {
      const next = new Map(prev);
      next.set(nodeId, status);
      return next;
    });

    const completedAt = status === 'completed' ? new Date().toISOString() : null;

    await supabase
      .from('node_progress')
      .upsert({
        roadmap_id: roadmapId,
        node_id: nodeId,
        status,
        completed_at: completedAt,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'roadmap_id,node_id' });
  }, [roadmapId]);

  const handleNodeClick = useCallback((node: RoadmapNode) => {
    setSelectedNode(node);
    setShowPanel(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setShowPanel(false);
    setSelectedNode(null);
  }, []);

  // Stats
  const totalNodes = data.nodes.filter((n) => !n.isRoot).length;
  const completedNodes = data.nodes.filter((n) => !n.isRoot && progressMap.get(n.id) === 'completed').length;
  const overallProgress = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;
  const selectedNodeStatus: NodeStatus = selectedNode ? (progressMap.get(selectedNode.id) || 'not_started') : 'not_started';

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top header bar */}
      <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all flex-shrink-0"
            title="New roadmap"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{data.jobTitle}</div>
            <div className="text-xs text-slate-500 truncate">{totalNodes} steps to learn</div>
          </div>
        </div>

        {/* View switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
          {(Object.keys(VIEW_CONFIG) as ViewMode[]).map((mode) => {
            const config = VIEW_CONFIG[mode];
            const Icon = config.icon;
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Progress + user menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">{overallProgress}%</span>
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Mobile view switcher */}
      <div className="sm:hidden flex items-center gap-1 px-4 py-2 bg-slate-900/80 border-b border-white/10 overflow-x-auto">
        {(Object.keys(VIEW_CONFIG) as ViewMode[]).map((mode) => {
          const config = VIEW_CONFIG[mode];
          const Icon = config.icon;
          return (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                viewMode === mode ? 'bg-white/10 text-white' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      {showStats && (
        <div className="px-4 sm:px-6 py-3 bg-slate-900/90 backdrop-blur border-b border-white/10">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <span className="text-sm text-slate-300">
              <span className="font-bold text-white">{completedNodes}</span> of {totalNodes} steps completed
            </span>
            <div className="flex-1 max-w-xs">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative overflow-hidden">
          {viewMode === 'skill-tree' && (
            <SkillTree
              nodes={data.nodes}
              progressMap={progressMap}
              onNodeClick={handleNodeClick}
              selectedNodeId={selectedNode?.id}
            />
          )}
          {viewMode === 'timeline' && (
            <TimelineView
              nodes={data.nodes}
              progressMap={progressMap}
              onNodeClick={handleNodeClick}
              selectedNodeId={selectedNode?.id}
            />
          )}
          {viewMode === 'mind-map' && (
            <MindMapView
              nodes={data.nodes}
              progressMap={progressMap}
              onNodeClick={handleNodeClick}
              selectedNodeId={selectedNode?.id}
            />
          )}
          {viewMode === 'books' && (
            <BooksView
              data={data}
              progressMap={progressMap}
              onNodeClick={handleNodeClick}
            />
          )}
          {viewMode === 'videos' && (
            <VideosView
              data={data}
              progressMap={progressMap}
              onNodeClick={handleNodeClick}
            />
          )}
        </div>

        {/* Detail panel */}
        {showPanel && selectedNode && (
          <div className="fixed sm:relative inset-0 sm:inset-auto z-30 sm:z-10 w-full sm:w-[380px] flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="absolute inset-0 bg-black/50 sm:hidden" onClick={handleClosePanel} />
            <div className="relative h-full sm:ml-0 z-10">
              <NodeDetailPanel
                node={selectedNode}
                status={selectedNodeStatus}
                allNodes={data.nodes}
                progressMap={progressMap}
                onStatusChange={handleStatusChange}
                onClose={handleClosePanel}
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>
        )}
      </div>
      <DeveloperFooter />
    </div>
  );
}
