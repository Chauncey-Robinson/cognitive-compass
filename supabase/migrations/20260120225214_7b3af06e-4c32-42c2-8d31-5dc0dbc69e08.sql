-- Remove the overly permissive SELECT policy for authenticated users
-- This table is for backend-only global deduplication, not user-facing data
DROP POLICY IF EXISTS "Authenticated users read seen articles" ON public.seen_articles;