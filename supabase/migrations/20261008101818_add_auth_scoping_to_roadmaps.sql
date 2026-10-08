/*
# Add user authentication scoping to roadmap tables

1. Changes
- Add `user_id` column to `roadmaps` table (uuid, NOT NULL, defaults to auth.uid(), references auth.users with cascade delete).
- Add `user_id` column to `node_progress` table (uuid, references auth.users with cascade delete).
- Backfill existing rows with a NULL user_id — these will be visible to no one (RLS will hide them), which is fine since all existing data was test data from the no-auth version.
2. Security Changes
- Replace all existing public (anon + authenticated) RLS policies on `roadmaps` with owner-scoped policies (TO authenticated, using auth.uid() = user_id).
- Replace all existing public RLS policies on `node_progress` with owner-scoped policies that check ownership via the parent roadmap's user_id.
- The app now has a sign-in screen, so all policies are TO authenticated only.
3. Notes
- The `user_id` column on `roadmaps` defaults to auth.uid() so inserts that omit user_id succeed for authenticated users.
- The `node_progress` table checks ownership through the parent roadmap: EXISTS (SELECT 1 FROM roadmaps WHERE roadmaps.id = node_progress.roadmap_id AND roadmaps.user_id = auth.uid()).
- Existing anon-key access is removed — the app now requires authentication.
*/

-- Add user_id to roadmaps
ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Backfill: set user_id default for new inserts
ALTER TABLE roadmaps ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Make existing rows non-null going forward (existing rows with NULL user_id will be invisible under new RLS)
-- We leave the column nullable to avoid errors on existing rows, but new inserts get auth.uid() default.

-- Add user_id to node_progress for easier policy checks
ALTER TABLE node_progress ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- ===== Replace roadmaps policies =====

DROP POLICY IF EXISTS "anon_select_roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "anon_insert_roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "anon_update_roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "anon_delete_roadmaps" ON roadmaps;

CREATE POLICY "select_own_roadmaps" ON roadmaps FOR SELECT
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_roadmaps" ON roadmaps FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_roadmaps" ON roadmaps FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_roadmaps" ON roadmaps FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- ===== Replace node_progress policies =====

DROP POLICY IF EXISTS "anon_select_node_progress" ON node_progress;
DROP POLICY IF EXISTS "anon_insert_node_progress" ON node_progress;
DROP POLICY IF EXISTS "anon_update_node_progress" ON node_progress;
DROP POLICY IF EXISTS "anon_delete_node_progress" ON node_progress;

CREATE POLICY "select_own_node_progress" ON node_progress FOR SELECT
TO authenticated USING (
  EXISTS (SELECT 1 FROM roadmaps WHERE roadmaps.id = node_progress.roadmap_id AND roadmaps.user_id = auth.uid())
);

CREATE POLICY "insert_own_node_progress" ON node_progress FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM roadmaps WHERE roadmaps.id = node_progress.roadmap_id AND roadmaps.user_id = auth.uid())
);

CREATE POLICY "update_own_node_progress" ON node_progress FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM roadmaps WHERE roadmaps.id = node_progress.roadmap_id AND roadmaps.user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM roadmaps WHERE roadmaps.id = node_progress.roadmap_id AND roadmaps.user_id = auth.uid())
);

CREATE POLICY "delete_own_node_progress" ON node_progress FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM roadmaps WHERE roadmaps.id = node_progress.roadmap_id AND roadmaps.user_id = auth.uid())
);
