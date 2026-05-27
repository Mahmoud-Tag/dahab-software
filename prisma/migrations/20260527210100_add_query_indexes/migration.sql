-- Add indexes for sort-by-date queries used in list endpoints
CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "messages_created_at_idx" ON "messages"("created_at" DESC);