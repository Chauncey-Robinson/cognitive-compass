-- Create table to track seen articles for deduplication
CREATE TABLE public.seen_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  title TEXT,
  source TEXT,
  seen_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for fast URL lookups
CREATE INDEX idx_seen_articles_url ON public.seen_articles (url);

-- Create index for cleanup queries (older than 30 days)
CREATE INDEX idx_seen_articles_date ON public.seen_articles (seen_date);

-- No RLS needed - this is backend-only data accessed via service role