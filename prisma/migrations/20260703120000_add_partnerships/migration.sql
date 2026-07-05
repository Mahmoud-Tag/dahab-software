-- Create partnerships table used by the partnerships CRUD endpoints.
CREATE TABLE IF NOT EXISTS "partnerships" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "partnerName" TEXT NOT NULL,
    "desc" TEXT,
    "fullDesc" TEXT,
    "image" TEXT,
    "image_public_id" TEXT,
    "websiteUrl" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partnerships_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "partnerships" ADD COLUMN IF NOT EXISTS "image_public_id" TEXT;
ALTER TABLE "partnerships" ADD COLUMN IF NOT EXISTS "websiteUrl" TEXT;
ALTER TABLE "partnerships" ADD COLUMN IF NOT EXISTS "status" TEXT;

CREATE INDEX IF NOT EXISTS "partnerships_created_at_idx" ON "partnerships"("created_at" ASC);
