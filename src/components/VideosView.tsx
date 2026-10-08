import type { RoadmapData, RoadmapNode, NodeStatus, Resource } from '@/types';
import { getCategoryColors } from '@/lib/roadmapEngine';
import { PlayCircle, Clock, BookOpen, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';

interface VideosViewProps {
  data: RoadmapData;
  progressMap: Map<string, NodeStatus>;
  onNodeClick: (node: RoadmapNode) => void;
}

interface VideoEntry {
  title: string;
  description: string;
  nodeName: string;
  nodeId: string;
  category: string;
  level: number;
  searchQuery: string;
  isExistingResource: boolean;
}

function buildYouTubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export default function VideosView({ data, progressMap, onNodeClick }: VideosViewProps) {
  const allVideos: VideoEntry[] = [];

  for (const node of data.nodes) {
    if (node.isRoot) {
      allVideos.push({
        title: `Getting started with ${data.jobTitle}`,
        description: `Introductory videos to understand the overall journey and what to expect.`,
        nodeName: node.title,
        nodeId: node.id,
        category: node.category,
        level: node.level,
        searchQuery: `${data.jobTitle} getting started guide for beginners`,
        isExistingResource: false,
      });
      continue;
    }

    // Add existing video resources
    const videoResources = node.resources.filter((r) => r.type === 'video');
    for (const res of videoResources) {
      allVideos.push({
        title: res.title,
        description: res.description,
        nodeName: node.title,
        nodeId: node.id,
        category: node.category,
        level: node.level,
        searchQuery: `${node.title} ${res.title} tutorial`,
        isExistingResource: true,
      });
    }

    // Add course resources as video search too (many courses are on YouTube)
    const courseResources = node.resources.filter((r) => r.type === 'course');
    for (const res of courseResources) {
      allVideos.push({
        title: `${res.title} (video course)`,
        description: res.description,
        nodeName: node.title,
        nodeId: node.id,
        category: node.category,
        level: node.level,
        searchQuery: `${node.title} ${res.title} full course`,
        isExistingResource: true,
      });
    }

    // Always add a general YouTube search for the node topic itself
    allVideos.push({
      title: `Best YouTube videos on ${node.title}`,
      description: `Top-rated YouTube tutorials and explainers for ${node.title}. Covers the skills: ${node.skills.slice(0, 3).join(', ')}${node.skills.length > 3 ? ' and more' : ''}.`,
      nodeName: node.title,
      nodeId: node.id,
      category: node.category,
      level: node.level,
      searchQuery: `${node.title} tutorial for beginners`,
      isExistingResource: false,
    });
  }

  allVideos.sort((a, b) => a.level - b.level);

  const totalVideos = allVideos.length;

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">YouTube Videos</h1>
              <p className="text-sm text-slate-400">{totalVideos} video recommendations for your {data.jobTitle} journey</p>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
          <p className="text-sm text-slate-300">
            Each topic links to the best YouTube tutorials and courses. Videos are ordered from beginner to advanced, following your roadmap. Click any card to watch on YouTube.
          </p>
        </div>

        {/* Video list */}
        <div className="space-y-3">
          {allVideos.map((video, idx) => {
            const colors = getCategoryColors(video.category);
            const nodeStatus = progressMap.get(video.nodeId) || 'not_started';
            const isCompleted = nodeStatus === 'completed';
            const isInProgress = nodeStatus === 'in_progress';
            const youtubeUrl = buildYouTubeSearchUrl(video.searchQuery);

            return (
              <div
                key={`${video.nodeId}-${idx}`}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  {/* Video thumbnail placeholder */}
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-24 sm:w-32 aspect-video rounded-xl bg-gradient-to-br from-red-600/30 to-rose-900/30 border border-red-500/20 flex items-center justify-center hover:from-red-600/50 hover:to-rose-900/50 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </a>

                  {/* Video info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">{video.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">{video.description}</p>
                      </div>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border capitalize"
                        style={{ color: colors.text, borderColor: colors.border + '40', background: colors.bg + '40' }}
                      >
                        {video.category.replace('-', ' ')}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <BookOpen className="w-3 h-3" />
                        {video.nodeName}
                      </span>
                      {video.level > 0 && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {video.level === 1 ? 'Beginner' : video.level === 2 ? 'Intermediate' : video.level === 3 ? 'Advanced' : 'Expert'}
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-xs text-cyan-400 font-medium">In Progress</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Watch on YouTube
                      </a>
                      <button
                        onClick={() => {
                          const node = data.nodes.find((n) => n.id === video.nodeId);
                          if (node) onNodeClick(node);
                        }}
                        className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                      >
                        View step
                        <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
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
