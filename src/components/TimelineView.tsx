import type { RoadmapNode, NodeStatus } from '@/types';
import { getCategoryColors } from '@/lib/roadmapEngine';
import { CheckCircle2, Circle, PlayCircle, Clock, BookOpen, Target } from 'lucide-react';

interface TimelineViewProps {
  nodes: RoadmapNode[];
  progressMap: Map<string, NodeStatus>;
  onNodeClick: (node: RoadmapNode) => void;
  selectedNodeId?: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  advanced: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  expert: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
};

export default function TimelineView({ nodes, progressMap, onNodeClick, selectedNodeId }: TimelineViewProps) {
  const sorted = [...nodes].sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.x - b.x;
  });

  // Group by level
  const levels = new Map<number, RoadmapNode[]>();
  sorted.forEach((n) => {
    const group = levels.get(n.level) || [];
    group.push(n);
    levels.set(n.level, group);
  });

  const maxLevel = Math.max(...nodes.map((n) => n.level));

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-8 py-8">
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-emerald-500/50 -translate-x-1/2" />

        <div className="space-y-8">
          {Array.from({ length: maxLevel + 1 }, (_, level) => {
            const levelNodes = levels.get(level) || [];
            if (levelNodes.length === 0) return null;

            const totalNodes = levelNodes.length;
            const completedCount = levelNodes.filter((n) => progressMap.get(n.id) === 'completed').length;
            const progressPercent = totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0;

            return (
              <div key={level} className="relative">
                {/* Level header */}
                <div className="flex items-center gap-3 mb-4 ml-16 sm:ml-0 sm:justify-center">
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                    {level === 0 ? 'Start Here' : level === 1 ? 'First Steps' : level === 2 ? 'Building Skills' : level === 3 ? 'Getting Advanced' : 'Final Steps'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {completedCount}/{totalNodes} completed
                  </div>
                  {progressPercent > 0 && (
                    <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Nodes */}
                <div className="space-y-4">
                  {levelNodes.map((node, idx) => {
                    const colors = getCategoryColors(node.category);
                    const status = progressMap.get(node.id) || 'not_started';
                    const isSelected = selectedNodeId === node.id;
                    const isCompleted = status === 'completed';
                    const isInProgress = status === 'in_progress';
                    const isLeft = level > 0 && idx % 2 === 0;

                    return (
                      <div
                        key={node.id}
                        className={`flex items-start gap-4 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                      >
                        {/* Timeline dot */}
                        <div className="relative z-10 flex-shrink-0 ml-8 sm:ml-0 sm:w-1/2 sm:flex sm:justify-end" style={{ [isLeft ? 'paddingRight' : 'paddingLeft']: '0' } as React.CSSProperties}>
                          <div className="hidden sm:block sm:w-1/2" />
                        </div>

                        {/* Dot marker */}
                        <div
                          className={`absolute left-8 sm:left-1/2 -translate-x-1/2 mt-4 w-5 h-5 rounded-full border-2 transition-all z-10 ${
                            isCompleted
                              ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50'
                              : isInProgress
                              ? 'bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse'
                              : 'bg-slate-800 border-slate-600'
                          }`}
                        />

                        {/* Card */}
                        <div
                          onClick={() => onNodeClick(node)}
                          className={`flex-1 ml-16 sm:ml-0 sm:w-1/2 cursor-pointer rounded-2xl border p-4 transition-all ${
                            isSelected
                              ? 'border-white/30 bg-white/10 scale-[1.02]'
                              : isCompleted
                              ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                          style={{ [isLeft ? 'marginRight' : 'marginLeft']: '0' } as React.CSSProperties}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                              ) : isInProgress ? (
                                <PlayCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                              )}
                              <h3 className="font-semibold text-white text-sm sm:text-base">{node.title}</h3>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[node.difficulty]}`}>
                              {node.difficulty}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 mb-3 line-clamp-2">{node.description}</p>

                          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {node.estimatedTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" /> {node.resources.length} resources
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" /> {node.skills.length} skills
                            </span>
                          </div>

                          {/* Category indicator */}
                          <div
                            className="mt-3 h-1 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${colors.border}, transparent)` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
