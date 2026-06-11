-- Create team members table used by the team CRUD endpoints.
CREATE TABLE IF NOT EXISTS "team_members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT,
    "image_public_id" TEXT,
    "specialty" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "twitter" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "image_public_id" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "specialty" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "linkedin" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "github" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "twitter" TEXT;

CREATE INDEX IF NOT EXISTS "team_members_created_at_idx" ON "team_members"("created_at" ASC);
