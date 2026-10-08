import { useRef, useState, useCallback, useEffect } from 'react';
import type { RoadmapNode, NodeStatus } from '@/types';
import { getCategoryColors } from '@/lib/roadmapEngine';
import { ZoomIn, ZoomOut, Maximize2, CheckCircle2, Circle, PlayCircle } from 'lucide-react';

interface SkillTreeProps {
  nodes: RoadmapNode[];
  progressMap: Map<string, NodeStatus>;
  onNodeClick: (node: RoadmapNode) => void;
  selectedNodeId?: string;
}

const NODE_RADIUS = 42;
const SVG_PADDING = 100;

export default function SkillTree({ nodes, progressMap, onNodeClick, selectedNodeId }: SkillTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const bounds = computeBounds(nodes);
  const svgWidth = bounds.maxX - bounds.minX + SVG_PADDING * 2;
  const svgHeight = bounds.maxY - bounds.minY + SVG_PADDING * 2;

  // Center the view on initial load
  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const initialScale = Math.min(cw / svgWidth, ch / svgHeight, 1) * 0.9;
    setTransform({
      x: cw / 2,
      y: 60,
      scale: Math.max(initialScale, 0.3),
    });
  }, [svgWidth, svgHeight]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setTransform((prev) => {
      const newScale = Math.max(0.15, Math.min(3, prev.scale * (1 + delta)));
      return { ...prev, scale: newScale };
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
  }, [transform.x, transform.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setTransform((prev) => ({ ...prev, x: dragStart.current.tx + dx, y: dragStart.current.ty + dy }));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const zoomIn = () => setTransform((p) => ({ ...p, scale: Math.min(3, p.scale * 1.2) }));
  const zoomOut = () => setTransform((p) => ({ ...p, scale: Math.max(0.15, p.scale / 1.2) }));
  const reset = () => {
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / svgWidth, ch / svgHeight, 1) * 0.9;
    setTransform({ x: cw / 2, y: 60, scale: Math.max(scale, 0.3) });
  };

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: `${transform.x}px ${transform.y}px`,
        }}
      />

      <svg
        ref={svgRef}
        className="w-full h-full"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Connection lines */}
          {nodes.map((node) => {
            if (!node.parentId) return null;
            const parent = nodeMap.get(node.parentId);
            if (!parent) return null;

            const status = progressMap.get(node.id) || 'not_started';
            const parentStatus = progressMap.get(parent.id) || 'not_started';
            const isActive = status === 'in_progress' || status === 'completed';
            const parentDone = parentStatus === 'completed';
            const colors = getCategoryColors(node.category);

            const midY = (parent.y + node.y) / 2;
            const d = `M ${parent.x} ${parent.y} C ${parent.x} ${midY}, ${node.x} ${midY}, ${node.x} ${node.y}`;

            return (
              <path
                key={`line-${node.id}`}
                d={d}
                fill="none"
                stroke={isActive ? colors.border : parentDone ? colors.border + '60' : 'rgba(100,116,139,0.3)'}
                strokeWidth={isActive ? 3 : 2}
                strokeDasharray={parentDone ? 'none' : '8 4'}
                style={{
                  filter: isActive ? `drop-shadow(0 0 6px ${colors.glow})` : 'none',
                  transition: 'all 0.4s ease',
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={parentDone ? '0' : '24'}
                  to={parentDone ? '0' : '0'}
                  dur={parentDone ? '0s' : '1.5s'}
                  repeatCount="indefinite"
                />
              </path>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = getCategoryColors(node.category);
            const status = progressMap.get(node.id) || 'not_started';
            const isSelected = selectedNodeId === node.id;
            const isCompleted = status === 'completed';
            const isInProgress = status === 'in_progress';
            const r = node.isRoot ? 52 : NODE_RADIUS;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => onNodeClick(node)}
                style={{ cursor: 'pointer' }}
                className="transition-transform"
              >
                {/* Outer glow ring for completed/in-progress */}
                {(isCompleted || isInProgress || isSelected) && (
                  <circle
                    r={r + 8}
                    fill="none"
                    stroke={isCompleted ? '#10b981' : isInProgress ? colors.border : '#ffffff'}
                    strokeWidth={2}
                    opacity={isSelected ? 0.6 : 0.3}
                    style={{
                      filter: `drop-shadow(0 0 12px ${isCompleted ? 'rgba(16,185,129,0.5)' : colors.glow})`,
                    }}
                  >
                    {(isCompleted || isInProgress) && (
                      <animate
                        attributeName="r"
                        values={`${r + 6};${r + 10};${r + 6}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                )}

                {/* Main circle */}
                <circle
                  r={r}
                  fill={isCompleted ? '#064e3b' : node.isRoot ? '#1e3a5f' : colors.bg}
                  stroke={isCompleted ? '#10b981' : colors.border}
                  strokeWidth={isSelected ? 4 : 2.5}
                  style={{
                    filter: `drop-shadow(0 4px 12px ${isCompleted ? 'rgba(16,185,129,0.3)' : colors.glow})`,
                    transition: 'all 0.3s ease',
                  }}
                />

                {/* Inner gradient circle for root */}
                {node.isRoot && (
                  <circle r={r - 4} fill="url(#rootGradient)" opacity={0.5} />
                )}

                {/* Status icon */}
                {isCompleted ? (
                  <CheckCircle2 className="text-emerald-400" style={{ width: 28, height: 28, transform: 'translate(-14px, -14px)' }} />
                ) : isInProgress ? (
                  <PlayCircle className="text-white" style={{ width: 28, height: 28, transform: 'translate(-14px, -14px)' }} />
                ) : (
                  <Circle
                    className="text-slate-400"
                    style={{
                      width: node.isRoot ? 32 : 24,
                      height: node.isRoot ? 32 : 24,
                      transform: node.isRoot ? 'translate(-16px, -16px)' : 'translate(-12px, -12px)',
                    }}
                  />
                )}

                {/* Title label */}
                <text
                  y={r + 22}
                  textAnchor="middle"
                  fill={isCompleted ? '#6ee7b7' : colors.text}
                  fontSize={node.isRoot ? 15 : 13}
                  fontWeight={node.isRoot ? 700 : 600}
                  className="select-none pointer-events-none"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                  {node.title.length > 28 ? node.title.substring(0, 25) + '...' : node.title}
                </text>

                {/* Level badge */}
                {!node.isRoot && (
                  <g transform={`translate(${r * 0.65}, ${-r * 0.65})`}>
                    <circle r={14} fill="#0f172a" stroke={colors.border} strokeWidth={1.5} />
                    <text
                      textAnchor="middle"
                      dy={4}
                      fill={colors.text}
                      fontSize={11}
                      fontWeight={700}
                      className="select-none pointer-events-none"
                    >
                      {node.level}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        <defs>
          <radialGradient id="rootGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1e3a5f" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={zoomOut}
          className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={reset}
          className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-6 left-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Status</div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Circle className="w-4 h-4 text-slate-500" /> Not started
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <PlayCircle className="w-4 h-4 text-cyan-400" /> In progress
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Completed
        </div>
      </div>
    </div>
  );
}

function computeBounds(nodes: RoadmapNode[]) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const n of nodes) {
    minX = Math.min(minX, n.x);
    maxX = Math.max(maxX, n.x);
    minY = Math.min(minY, n.y);
    maxY = Math.max(maxY, n.y);
  }
  return { minX, maxX, minY, maxY };
}
