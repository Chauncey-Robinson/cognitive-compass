-- Enable RLS on seen_articles (backend-only table)
ALTER TABLE public.seen_articles ENABLE ROW LEVEL SECURITY;

-- No public policies needed - accessed only via service role in edge functions