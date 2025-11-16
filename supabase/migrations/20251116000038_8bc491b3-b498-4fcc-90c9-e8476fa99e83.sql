-- Drop the executive_brief table and related objects
DROP TRIGGER IF EXISTS update_executive_brief_updated_at ON public.executive_brief;
DROP FUNCTION IF EXISTS public.update_executive_brief_updated_at();
DROP TABLE IF EXISTS public.executive_brief;