-- Add policy for seen_articles table - this is used by edge functions with service role
-- Allow read access for authenticated users and service role insert
CREATE POLICY "Service role manages seen articles" 
  ON public.seen_articles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users read seen articles" 
  ON public.seen_articles FOR SELECT
  TO authenticated
  USING (true);