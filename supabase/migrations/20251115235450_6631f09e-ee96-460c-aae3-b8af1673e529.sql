-- Create executive_brief table
CREATE TABLE IF NOT EXISTS public.executive_brief (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  source_url TEXT,
  source_title TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('research', 'news', 'report', 'other')),
  what_happened TEXT NOT NULL,
  explain_like_im_10 TEXT NOT NULL,
  why_it_matters TEXT NOT NULL,
  leader_action TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.executive_brief ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read briefs (public data)
CREATE POLICY "Anyone can read executive briefs"
  ON public.executive_brief
  FOR SELECT
  USING (true);

-- Create index on date for faster queries
CREATE INDEX IF NOT EXISTS idx_executive_brief_date ON public.executive_brief(date DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_executive_brief_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_executive_brief_updated_at
  BEFORE UPDATE ON public.executive_brief
  FOR EACH ROW
  EXECUTE FUNCTION public.update_executive_brief_updated_at();