import type { RoadmapData, RoadmapNode, NodeStatus, Resource } from '@/types';
import { getCategoryColors } from '@/lib/roadmapEngine';
import { BookMarked, Clock, BookOpen, ChevronRight } from 'lucide-react';

interface BooksViewProps {
  data: RoadmapData;
  progressMap: Map<string, NodeStatus>;
  onNodeClick: (node: RoadmapNode) => void;
}

interface BookEntry extends Resource {
  nodeName: string;
  nodeId: string;
  category: string;
  level: number;
}

export default function BooksView({ data, progressMap, onNodeClick }: BooksViewProps) {
  const allBooks: BookEntry[] = [];
  for (const node of data.nodes) {
    for (const resource of node.resources) {
      if (resource.type === 'book') {
        allBooks.push({
          ...resource,
          nodeName: node.title,
          nodeId: node.id,
          category: node.category,
          level: node.level,
        });
      }
    }
  }

  allBooks.sort((a, b) => a.level - b.level);

  if (allBooks.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center max-w-md px-4">
          <BookMarked className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-white mb-2">No books yet</h2>
          <p className="text-sm text-slate-400">
            Books recommended for your roadmap will appear here. Check the other views to explore your steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Recommended Books</h1>
              <p className="text-sm text-slate-400">{allBooks.length} books for your {data.jobTitle} journey</p>
            </div>
          </div>
        </div>

        {/* Reading order */}
        <div className="mb-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <p className="text-sm text-slate-300">
            Books are listed in the order you should read them, following your roadmap from beginner to advanced.
          </p>
        </div>

        {/* Book list */}
        <div className="space-y-4">
          {allBooks.map((book, idx) => {
            const colors = getCategoryColors(book.category);
            const nodeStatus = progressMap.get(book.nodeId) || 'not_started';
            const isCompleted = nodeStatus === 'completed';
            const isInProgress = nodeStatus === 'in_progress';

            return (
              <div
                key={`${book.nodeId}-${idx}`}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden"
              >
                <div className="flex gap-4 p-5">
                  {/* Book number */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}40` }}
                    >
                      {idx + 1}
                    </div>
                    {isCompleted && (
                      <span className="text-xs text-emerald-400 font-medium">Read</span>
                    )}
                    {isInProgress && (
                      <span className="text-xs text-cyan-400 font-medium">Reading</span>
                    )}
                  </div>

                  {/* Book info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-base leading-tight">{book.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{book.description}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ color: colors.text, borderColor: colors.border + '40', background: colors.bg + '40' }}
                      >
                        {book.category.replace('-', ' ')}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <BookOpen className="w-3 h-3" />
                        Part of: {book.nodeName}
                      </span>
                      {book.level > 0 && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {book.level === 1 ? 'Beginner stage' : book.level === 2 ? 'Intermediate stage' : book.level === 3 ? 'Advanced stage' : 'Expert stage'}
                        </span>
                      )}
                    </div>

                    {/* Go to step */}
                    <button
                      onClick={() => {
                        const node = data.nodes.find((n) => n.id === book.nodeId);
                        if (node) onNodeClick(node);
                      }}
                      className="mt-3 flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                    >
                      View this step
                      <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
