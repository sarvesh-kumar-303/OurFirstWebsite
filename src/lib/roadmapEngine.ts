import type { RoadmapData, RoadmapNode, Milestone, Resource } from '@/types';
import { careerDomains, findCareerDomain, generateGenericDomain } from './careerData';

interface RawSkill {
  name: string;
  level: number;
  category: RoadmapNode['category'];
  difficulty: RoadmapNode['difficulty'];
  time: string;
  prereqs: string[];
  skills: string[];
  resources: Resource[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface PositionedNode extends RawSkill {
  id: string;
  title: string;
  description: string;
  isRoot?: boolean;
  x: number;
  y: number;
  parentId?: string;
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  foundation: 'Build a solid base with the fundamental concepts and principles of the field.',
  technical: 'Master the core technical skills that employers look for in this role.',
  domain: 'Develop deep domain expertise that sets you apart from generalists.',
  'soft-skills': 'Cultivate the interpersonal and communication skills that accelerate career growth.',
  tools: 'Get hands-on with the essential tools and software used in the industry.',
  portfolio: 'Apply your skills to build a compelling portfolio that showcases your abilities.',
  career: 'Position yourself for success with strategic career development and job search skills.',
  specialization: 'Go deep into advanced topics that make you a recognized expert.',
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string; gradient: string }> = {
  foundation: { bg: '#1e3a5f', border: '#3b82f6', text: '#93c5fd', glow: 'rgba(59,130,246,0.4)', gradient: 'from-blue-600 to-blue-800' },
  technical: { bg: '#1a3a2e', border: '#10b981', text: '#6ee7b7', glow: 'rgba(16,185,129,0.4)', gradient: 'from-emerald-600 to-emerald-800' },
  domain: { bg: '#3a2a1a', border: '#f59e0b', text: '#fcd34d', glow: 'rgba(245,158,11,0.4)', gradient: 'from-amber-600 to-amber-800' },
  'soft-skills': { bg: '#3a1a2e', border: '#ec4899', text: '#f9a8d4', glow: 'rgba(236,72,153,0.4)', gradient: 'from-pink-600 to-pink-800' },
  tools: { bg: '#1a2a3a', border: '#06b6d4', text: '#67e8f9', glow: 'rgba(6,182,212,0.4)', gradient: 'from-cyan-600 to-cyan-800' },
  portfolio: { bg: '#2a1a3a', border: '#a855f7', text: '#c4b5fd', glow: 'rgba(168,85,247,0.4)', gradient: 'from-violet-600 to-violet-800' },
  career: { bg: '#3a2a1a', border: '#f97316', text: '#fdba74', glow: 'rgba(249,115,22,0.4)', gradient: 'from-orange-600 to-orange-800' },
  specialization: { bg: '#1a3a3a', border: '#14b8a6', text: '#5eead4', glow: 'rgba(20,184,166,0.4)', gradient: 'from-teal-600 to-teal-800' },
};

export function getCategoryColors(category: string) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.foundation;
}

export function generateRoadmap(
  jobTitle: string,
  jobDescription: string,
  currentLevel: string,
  targetTimeline: string
): RoadmapData {
  const domainKey = findCareerDomain(jobTitle, jobDescription);
  const domain = domainKey === 'generic'
    ? generateGenericDomain(jobTitle, jobDescription)
    : careerDomains[domainKey];

  const rootSkillName = domain.rootSkills[0];
  const rootId = slugify(rootSkillName);

  const allRawSkills: RawSkill[] = [
    ...domain.technicalSkills,
    ...domain.domainSkills,
    ...domain.tools,
    ...domain.softSkills,
    ...domain.portfolioProjects,
    ...domain.careerSteps,
  ];

  const nodes: RoadmapNode[] = [];
  const idMap = new Map<string, string>();

  // Root node
  nodes.push({
    id: rootId,
    title: rootSkillName,
    description: `The essential starting point for achieving your goal of ${jobTitle}. Master the core concepts that everything else builds upon.`,
    category: 'foundation',
    level: 0,
    difficulty: 'beginner',
    estimatedTime: '2-4 weeks',
    resources: [],
    prerequisites: [],
    skills: ['Mindset', 'Goal Setting', 'Learning Strategy', 'Industry Overview'],
    isRoot: true,
    x: 0,
    y: 0,
  });

  for (const skill of allRawSkills) {
    const id = slugify(skill.name);
    idMap.set(skill.name, id);

    nodes.push({
      id,
      title: skill.name,
      description: CATEGORY_DESCRIPTIONS[skill.category] || `Key skill for ${jobTitle}: ${skill.name}.`,
      category: skill.category,
      level: skill.level,
      difficulty: skill.difficulty,
      estimatedTime: skill.time,
      resources: skill.resources,
      prerequisites: skill.prereqs,
      skills: skill.skills,
      x: 0,
      y: 0,
    });
  }

  // Assign parent IDs based on prerequisites
  for (const node of nodes) {
    if (node.isRoot) continue;
    if (node.prerequisites.length > 0) {
      node.parentId = node.prerequisites[0];
    } else {
      node.parentId = rootId;
    }
  }

  // Compute positions using a radial/tree layout
  computePositions(nodes, rootId);

  // Generate milestones
  const milestones: Milestone[] = [];
  const sortedByLevel = [...nodes].sort((a, b) => a.level - b.level);
  const weekPerLevel = 8;
  sortedByLevel.forEach((node, idx) => {
    if (node.level === 0) return;
    const targetWeek = node.level * weekPerLevel + idx * 2;
    milestones.push({
      id: `milestone-${node.id}`,
      title: `Master ${node.title}`,
      description: `Complete the ${node.title} node to unlock the next stage of your journey.`,
      nodeId: node.id,
      targetWeek,
    });
  });

  const summary = `Your personalized roadmap for ${jobTitle} contains ${nodes.length - 1} steps across ${new Set(nodes.map((n) => n.category)).size} areas. Starting from ${rootSkillName}, you'll progress through ${Math.max(...nodes.map((n) => n.level))} levels, building expertise step by step${targetTimeline ? ` with a target timeline of ${targetTimeline}` : ''}.`;

  return {
    jobTitle,
    jobDescription,
    currentLevel,
    targetTimeline,
    summary,
    nodes,
    milestones,
  };
}

function computePositions(nodes: RoadmapNode[], rootId: string) {
  const nodeMap = new Map<string, RoadmapNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const childrenOf = new Map<string, RoadmapNode[]>();
  nodes.forEach((n) => {
    if (n.parentId) {
      const siblings = childrenOf.get(n.parentId) || [];
      siblings.push(n);
      childrenOf.set(n.parentId, siblings);
    }
  });

  // Build level groups
  const levelGroups = new Map<number, RoadmapNode[]>();
  nodes.forEach((n) => {
    const group = levelGroups.get(n.level) || [];
    group.push(n);
    levelGroups.set(n.level, group);
  });

  const root = nodeMap.get(rootId);
  if (root) {
    root.x = 0;
    root.y = 0;
  }

  const maxLevel = Math.max(...nodes.map((n) => n.level));
  const levelHeight = 200;
  const nodeSpacing = 220;

  // Position nodes level by level
  for (let level = 1; level <= maxLevel; level++) {
    const levelNodes = levelGroups.get(level) || [];

    // Group by parent
    const byParent = new Map<string, RoadmapNode[]>();
    levelNodes.forEach((n) => {
      const pid = n.parentId || rootId;
      const group = byParent.get(pid) || [];
      group.push(n);
      byParent.set(pid, group);
    });

    let xCursor = 0;
    const parents = [...byParent.keys()];

    // Sort parents by their x position
    parents.sort((a, b) => (nodeMap.get(a)?.x || 0) - (nodeMap.get(b)?.x || 0));

    for (const parentId of parents) {
      const children = byParent.get(parentId)!;
      const parent = nodeMap.get(parentId);
      const parentX = parent?.x || 0;

      const totalWidth = children.length * nodeSpacing;
      let startX = parentX - totalWidth / 2 + nodeSpacing / 2;

      // Ensure we don't go before xCursor
      if (startX < xCursor) {
        startX = xCursor;
      }

      children.forEach((child, i) => {
        child.x = startX + i * nodeSpacing;
        child.y = level * levelHeight;
      });

      xCursor = startX + children.length * nodeSpacing + nodeSpacing * 0.3;
    }
  }

  // Center the entire layout
  const allX = nodes.map((n) => n.x);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const offsetX = (minX + maxX) / 2;
  nodes.forEach((n) => {
    n.x = n.x - offsetX;
  });
}
