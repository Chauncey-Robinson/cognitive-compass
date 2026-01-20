-- Add user_id columns to tables that need user ownership
ALTER TABLE public.playbook_analyses ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.playbook_chat_messages ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.playbooks ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Mark preloaded playbooks as system-owned (NULL user_id = public)
UPDATE public.playbooks SET user_id = NULL WHERE is_preloaded = true;

-- Drop all permissive public policies
DROP POLICY IF EXISTS "Allow public read analyses" ON public.playbook_analyses;
DROP POLICY IF EXISTS "Allow public insert analyses" ON public.playbook_analyses;
DROP POLICY IF EXISTS "Allow public read chat" ON public.playbook_chat_messages;
DROP POLICY IF EXISTS "Allow public insert chat" ON public.playbook_chat_messages;
DROP POLICY IF EXISTS "Allow public read playbooks" ON public.playbooks;
DROP POLICY IF EXISTS "Allow public insert playbooks" ON public.playbooks;
DROP POLICY IF EXISTS "Allow public update playbooks" ON public.playbooks;
DROP POLICY IF EXISTS "Allow public delete playbooks" ON public.playbooks;

-- Create user-scoped policies for playbook_analyses
CREATE POLICY "Users read own analyses" 
  ON public.playbook_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own analyses" 
  ON public.playbook_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create user-scoped policies for playbook_chat_messages
CREATE POLICY "Users read own chat" 
  ON public.playbook_chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own chat" 
  ON public.playbook_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create user-scoped policies for playbooks
-- Preloaded playbooks (user_id IS NULL) are publicly readable by authenticated users
-- User-created playbooks are only visible to their owner
CREATE POLICY "Read preloaded or own playbooks" 
  ON public.playbooks FOR SELECT
  TO authenticated
  USING (is_preloaded = true OR auth.uid() = user_id);

CREATE POLICY "Users insert own playbooks" 
  ON public.playbooks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own non-preloaded playbooks" 
  ON public.playbooks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND is_preloaded = false);

CREATE POLICY "Users delete own non-preloaded playbooks" 
  ON public.playbooks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND is_preloaded = false);