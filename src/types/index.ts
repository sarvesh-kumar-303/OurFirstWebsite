export type NodeStatus = 'not_started' | 'in_progress' | 'completed';

export type ViewMode = 'skill-tree' | 'timeline' | 'mind-map' | 'books' | 'videos';

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  level: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime: string;
  resources: Resource[];
  prerequisites: string[];
  skills: string[];
  isRoot?: boolean;
  x: number;
  y: number;
  parentId?: string;
}

export interface Resource {
  title: string;
  type: 'course' | 'book' | 'project' | 'video' | 'article' | 'practice';
  description: string;
}

export interface RoadmapData {
  jobTitle: string;
  jobDescription: string;
  currentLevel: string;
  targetTimeline: string;
  summary: string;
  nodes: RoadmapNode[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  nodeId: string;
  targetWeek: number;
}

export interface RoadmapRecord {
  id: string;
  job_title: string;
  job_description: string | null;
  current_level: string | null;
  target_timeline: string | null;
  roadmap_data: RoadmapData;
  created_at: string;
  updated_at: string;
}

export interface NodeProgressRecord {
  id: string;
  roadmap_id: string;
  node_id: string;
  status: NodeStatus;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export type SkillCategory =
  | 'foundation'
  | 'technical'
  | 'domain'
  | 'soft-skills'
  | 'tools'
  | 'portfolio'
  | 'career'
  | 'specialization';
