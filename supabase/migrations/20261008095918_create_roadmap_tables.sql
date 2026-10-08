/*
# Create career roadmap tables (single-tenant, no auth)

1. New Tables
- `roadmaps`: Stores generated career roadmaps with full skill tree data.
  - `id` (uuid, primary key)
  - `job_title` (text, the user's dream job title)
  - `job_description` (text, the user's description of their dream job)
  - `current_level` (text, user's self-assessed current level)
  - `target_timeline` (text, user's target timeline)
  - `roadmap_data` (jsonb, the full generated skill tree / timeline / mind map structure)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
- `node_progress`: Tracks completion status of individual nodes within a roadmap.
  - `id` (uuid, primary key)
  - `roadmap_id` (uuid, foreign key to roadmaps, cascade delete)
  - `node_id` (text, the node identifier within the roadmap_data jsonb)
  - `status` (text: 'not_started', 'in_progress', 'completed')
  - `completed_at` (timestamp, nullable)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (single-tenant app with no sign-in).
3. Indexes
- Index on `roadmap_id` in `node_progress` for fast lookups.
- Index on `job_title` in `roadmaps` for search.
*/

CREATE TABLE IF NOT EXISTS roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  job_description text,
  current_level text,
  target_timeline text,
  roadmap_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_roadmaps" ON roadmaps;
CREATE POLICY "anon_select_roadmaps" ON roadmaps FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_roadmaps" ON roadmaps;
CREATE POLICY "anon_insert_roadmaps" ON roadmaps FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_roadmaps" ON roadmaps;
CREATE POLICY "anon_update_roadmaps" ON roadmaps FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_roadmaps" ON roadmaps;
CREATE POLICY "anon_delete_roadmaps" ON roadmaps FOR DELETE
TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS node_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id uuid NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
  node_id text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(roadmap_id, node_id)
);

ALTER TABLE node_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_node_progress" ON node_progress;
CREATE POLICY "anon_select_node_progress" ON node_progress FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_node_progress" ON node_progress;
CREATE POLICY "anon_insert_node_progress" ON node_progress FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_node_progress" ON node_progress;
CREATE POLICY "anon_update_node_progress" ON node_progress FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_node_progress" ON node_progress;
CREATE POLICY "anon_delete_node_progress" ON node_progress FOR DELETE
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_node_progress_roadmap_id ON node_progress(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_job_title ON roadmaps(job_title);
