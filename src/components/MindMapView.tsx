import { useRef, useState, useCallback, useEffect } from 'react';
import type { RoadmapNode, NodeStatus } from '@/types';
import { getCategoryColors } from '@/lib/roadmapEngine';
import { ZoomIn, ZoomOut, Maximize2, CheckCircle2, Circle, PlayCircle } from 'lucide-react';

interface MindMapViewProps {
  nodes: RoadmapNode[];
  progressMap: Map<string, NodeStatus>;
  onNodeClick: (node: RoadmapNode) => void;
  selectedNodeId?: string;
}

export default function MindMapView({ nodes, progressMap, onNodeClick, selectedNodeId }: MindMapViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const root = nodes.find((n) => n.isRoot) || nodes[0];
  const nonRootNodes = nodes.filter((n) => !n.isRoot);

  // Radial layout: position nodes around root by category
  const categoryGroups = new Map<string, RoadmapNode[]>();
  nonRootNodes.forEach((n) => {
    const group = categoryGroups.get(n.category) || [];
    group.push(n);
    categoryGroups.set(n.category, group);
  });

  const categories = [...categoryGroups.keys()];
  const radiusStep = 220;

  // Compute radial positions
  const positionedNodes = new Map<string, { x: number; y: number }>();
  positionedNodes.set(root.id, { x: 0, y: 0 });

  categories.forEach((cat, catIdx) => {
    const groupNodes = categoryGroups.get(cat)!;
    const baseAngle = (catIdx / categories.length) * Math.PI * 2 - Math.PI / 2;
    const angleSpread = (Math.PI * 2) / categories.length * 0.7;

    groupNodes.forEach((node, nodeIdx) => {
      const ring = Math.ceil((nodeIdx + 1) / 3);
      const posInRing = nodeIdx % 3;
      const ringSize = Math.min(3, groupNodes.length - (ring - 1) * 3);
      const angle = baseAngle - angleSpread / 2 + (posInRing / Math.max(ringSize - 1, 1)) * angleSpread;
      const r = ring * radiusStep;
      positionedNodes.set(node.id, {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
      });
    });
  });

  const allPoints = [...positionedNodes.values()];
  const bounds = {
    minX: Math.min(...allPoints.map((p) => p.x)) - 150,
    maxX: Math.max(...allPoints.map((p) => p.x)) + 150,
    minY: Math.min(...allPoints.map((p) => p.y)) - 150,
    maxY: Math.max(...allPoints.map((p) => p.y)) + 150,
  };
  const svgWidth = bounds.maxX - bounds.minX;
  const svgHeight = bounds.maxY - bounds.minY;

  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / svgWidth, ch / svgHeight, 1) * 0.85;
    setTransform({ x: cw / 2, y: ch / 2, scale: Math.max(scale, 0.2) });
  }, [svgWidth, svgHeight]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setTransform((prev) => ({ ...prev, scale: Math.max(0.15, Math.min(3, prev.scale * (1 + delta))) }));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
  }, [transform.x, transform.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform((prev) => ({
      ...prev,
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    }));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const zoomIn = () => setTransform((p) => ({ ...p, scale: Math.min(3, p.scale * 1.2) }));
  const zoomOut = () => setTransform((p) => ({ ...p, scale: Math.max(0.15, p.scale / 1.2) }));
  const reset = () => {
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const scale = Math.min(container.clientWidth / svgWidth, container.clientHeight / svgHeight, 1) * 0.85;
    setTransform({ x: container.clientWidth / 2, y: container.clientHeight / 2, scale: Math.max(scale, 0.2) });
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
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
          {/* Connection curves from root */}
          {nodes.map((node) => {
            if (node.isRoot) return null;
            const pos = positionedNodes.get(node.id);
            if (!pos) return null;
            const colors = getCategoryColors(node.category);
            const status = progressMap.get(node.id) || 'not_started';
            const isHovered = hoveredId === node.id;
            const isCompleted = status === 'completed';

            const midX = pos.x * 0.3;
            const midY = pos.y * 0.3;
            const d = `M 0 0 Q ${midX} ${midY}, ${pos.x} ${pos.y}`;

            return (
              <path
                key={`mind-line-${node.id}`}
                d={d}
                fill="none"
                stroke={isHovered || isCompleted ? colors.border : 'rgba(100,116,139,0.25)'}
                strokeWidth={isHovered ? 3 : isCompleted ? 2.5 : 1.5}
                style={{
                  filter: isHovered ? `drop-shadow(0 0 6px ${colors.glow})` : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            );
          })}

          {/* Category group arcs */}
          {categories.map((cat) => {
            const groupNodes = categoryGroups.get(cat)!;
            const catIdx = categories.indexOf(cat);
            const baseAngle = (catIdx / categories.length) * Math.PI * 2 - Math.PI / 2;
            const colors = getCategoryColors(cat);
            const labelRadius = radiusStep * 1.5;
            const lx = Math.cos(baseAngle) * labelRadius;
            const ly = Math.sin(baseAngle) * labelRadius;

            return (
              <g key={`cat-${cat}`}>
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={10}
                  fontWeight={600}
                  className="select-none pointer-events-none uppercase tracking-wide"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)', opacity: 0.5 }}
                >
                  {cat.replace('-', ' ')}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positionedNodes.get(node.id);
            if (!pos) return null;
            const colors = getCategoryColors(node.category);
            const status = progressMap.get(node.id) || 'not_started';
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredId === node.id;
            const isCompleted = status === 'completed';
            const isInProgress = status === 'in_progress';
            const isRoot = node.isRoot;
            const r = isRoot ? 56 : isHovered || isSelected ? 40 : 36;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => onNodeClick(node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
              >
                {(isCompleted || isInProgress || isSelected || isHovered) && (
                  <circle
                    r={r + 6}
                    fill="none"
                    stroke={isCompleted ? '#10b981' : colors.border}
                    strokeWidth={2}
                    opacity={isHovered ? 0.5 : 0.25}
                    style={{ filter: `drop-shadow(0 0 10px ${isCompleted ? 'rgba(16,185,129,0.4)' : colors.glow})` }}
                  >
                    {(isCompleted || isInProgress) && (
                      <animate attributeName="r" values={`${r + 4};${r + 8};${r + 4}`} dur="2s" repeatCount="indefinite" />
                    )}
                  </circle>
                )}

                <circle
                  r={r}
                  fill={isCompleted ? '#064e3b' : isRoot ? '#1e3a5f' : colors.bg}
                  stroke={isCompleted ? '#10b981' : colors.border}
                  strokeWidth={isSelected ? 4 : isRoot ? 3 : 2}
                  style={{
                    filter: `drop-shadow(0 4px 10px ${isCompleted ? 'rgba(16,185,129,0.25)' : colors.glow})`,
                    transition: 'all 0.3s ease',
                  }}
                />

                {isRoot && <circle r={r - 4} fill="url(#mindRootGrad)" opacity={0.4} />}

                {isCompleted ? (
                  <CheckCircle2 className="text-emerald-400" style={{ width: 28, height: 28, transform: 'translate(-14px, -14px)' }} />
                ) : isInProgress ? (
                  <PlayCircle className="text-white" style={{ width: 26, height: 26, transform: 'translate(-13px, -13px)' }} />
                ) : (
                  <Circle className="text-slate-400" style={{ width: isRoot ? 32 : 22, height: isRoot ? 32 : 22, transform: isRoot ? 'translate(-16px, -16px)' : 'translate(-11px, -11px)' }} />
                )}

                <text
                  y={r + 18}
                  textAnchor="middle"
                  fill={isCompleted ? '#6ee7b7' : colors.text}
                  fontSize={isRoot ? 14 : 11}
                  fontWeight={isRoot ? 700 : 500}
                  className="select-none pointer-events-none"
                  style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}
                >
                  {node.title.length > 24 ? node.title.substring(0, 22) + '...' : node.title}
                </text>
              </g>
            );
          })}
        </g>

        <defs>
          <radialGradient id="mindRootGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1e3a5f" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button onClick={zoomIn} className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={zoomOut} className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={reset} className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
