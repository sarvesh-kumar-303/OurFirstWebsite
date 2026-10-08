import type { RoadmapNode, NodeStatus } from '@/types';
import { getCategoryColors } from '@/lib/roadmapEngine';
import {
  X, Clock, BookOpen, CheckCircle2, Circle, PlayCircle,
  Lock, ChevronRight, GraduationCap, BookMarked, Video, FileText, Wrench, Target,
} from 'lucide-react';

interface NodeDetailPanelProps {
  node: RoadmapNode | null;
  status: NodeStatus;
  allNodes: RoadmapNode[];
  progressMap: Map<string, NodeStatus>;
  onStatusChange: (nodeId: string, status: NodeStatus) => void;
  onClose: () => void;
  onNodeClick: (node: RoadmapNode) => void;
}

const STATUS_CONFIG = {
  not_started: { icon: Circle, label: 'Not Started', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
  in_progress: { icon: PlayCircle, label: 'In Progress', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  completed: { icon: CheckCircle2, label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
};

const RESOURCE_ICONS: Record<string, typeof BookOpen> = {
  course: GraduationCap,
  book: BookMarked,
  video: Video,
  article: FileText,
  project: Wrench,
  practice: Target,
};

export default function NodeDetailPanel({
  node, status, allNodes, progressMap, onStatusChange, onClose, onNodeClick,
}: NodeDetailPanelProps) {
  if (!node) return null;

  const colors = getCategoryColors(node.category);
  const prerequisites = node.prerequisites
    .map((id) => allNodes.find((n) => n.id === id))
    .filter(Boolean) as RoadmapNode[];
  const dependents = allNodes.filter((n) => n.prerequisites.includes(node.id));
  const allPrereqsMet = prerequisites.every((p) => progressMap.get(p.id) === 'completed');

  return (
    <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border-l border-white/10">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {!node.isRoot && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full border capitalize"
                style={{ color: colors.text, borderColor: colors.border + '40', background: colors.bg + '40' }}
              >
                {node.category.replace('-', ' ')}
              </span>
            )}
            {node.isRoot && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Start Here
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white leading-tight">{node.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{node.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Quick info */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-4 h-4 text-slate-500" />
            {node.estimatedTime}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <BookOpen className="w-4 h-4 text-slate-500" />
            {node.resources.length} resources
          </div>
        </div>

        {/* Skills to learn */}
        {node.skills.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">What You'll Learn</div>
            <div className="flex flex-wrap gap-2">
              {node.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {prerequisites.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Lock className="w-3 h-3" />
              Do These First
            </div>
            <div className="space-y-2">
              {prerequisites.map((prereq) => {
                const prereqStatus = progressMap.get(prereq.id) || 'not_started';
                const isDone = prereqStatus === 'completed';
                return (
                  <button
                    key={prereq.id}
                    onClick={() => onNodeClick(prereq)}
                    className="w-full flex items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                      )}
                      <span className={`text-sm truncate ${isDone ? 'text-slate-400' : 'text-slate-300'}`}>
                        {prereq.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
            {!allPrereqsMet && (
              <p className="mt-2 text-xs text-amber-300/80">
                Complete the steps above first to unlock this one.
              </p>
            )}
          </div>
        )}

        {/* Unlocks */}
        {dependents.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">This Unlocks</div>
            <div className="space-y-2">
              {dependents.map((dep) => (
                <button
                  key={dep.id}
                  onClick={() => onNodeClick(dep)}
                  className="w-full flex items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
                >
                  <span className="text-sm text-slate-300 truncate">{dep.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Books — shown first, in their own dedicated section */}
        {node.resources.filter((res) => res.type === 'book').length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <BookMarked className="w-3 h-3" />
              Recommended Books
            </div>
            <div className="space-y-2">
              {node.resources.filter((res) => res.type === 'book').map((book, idx) => (
                <div
                  key={`book-${idx}`}
                  className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-500/15 text-amber-400">
                      <BookMarked className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{book.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{book.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other resources — courses, videos, articles, projects */}
        {node.resources.filter((res) => res.type !== 'book').length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Where to Learn</div>
            <div className="space-y-2">
              {node.resources.filter((res) => res.type !== 'book').map((resource, idx) => {
                const ResourceIcon = RESOURCE_ICONS[resource.type] || BookOpen;
                return (
                  <div
                    key={`other-${idx}`}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: colors.bg + '60', color: colors.text }}
                      >
                        <ResourceIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">{resource.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{resource.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Status actions */}
      <div className="p-5 border-t border-white/10 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onStatusChange(node.id, 'not_started')}
            className={`py-3 rounded-xl text-sm font-medium transition-all border ${
              status === 'not_started'
                ? 'bg-slate-500/20 border-slate-500/40 text-slate-300'
                : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
            }`}
          >
            To Do
          </button>
          <button
            onClick={() => onStatusChange(node.id, 'in_progress')}
            className={`py-3 rounded-xl text-sm font-medium transition-all border ${
              status === 'in_progress'
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => onStatusChange(node.id, 'completed')}
            className={`py-3 rounded-xl text-sm font-medium transition-all border ${
              status === 'completed'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
