-- Create the update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create playbooks table for storing document metadata
CREATE TABLE public.playbooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  publication_date DATE,
  category TEXT NOT NULL DEFAULT 'Strategy',
  file_url TEXT,
  file_name TEXT,
  content_extracted TEXT,
  is_preloaded BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analyses table for storing AI analysis results
CREATE TABLE public.playbook_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_type TEXT NOT NULL CHECK (role_type IN ('CEO', 'CTO', 'MBA')),
  analysis_data JSONB NOT NULL DEFAULT '{}',
  playbook_ids UUID[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table for Q&A
CREATE TABLE public.playbook_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  context_role TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public access for now (no auth)
ALTER TABLE public.playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playbook_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playbook_chat_messages ENABLE ROW LEVEL SECURITY;

-- Public read/write policies
CREATE POLICY "Allow public read playbooks" ON public.playbooks FOR SELECT USING (true);
CREATE POLICY "Allow public insert playbooks" ON public.playbooks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update playbooks" ON public.playbooks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete playbooks" ON public.playbooks FOR DELETE USING (true);

CREATE POLICY "Allow public read analyses" ON public.playbook_analyses FOR SELECT USING (true);
CREATE POLICY "Allow public insert analyses" ON public.playbook_analyses FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read chat" ON public.playbook_chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert chat" ON public.playbook_chat_messages FOR INSERT WITH CHECK (true);

-- Create updated_at trigger
CREATE TRIGGER update_playbooks_updated_at
BEFORE UPDATE ON public.playbooks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();