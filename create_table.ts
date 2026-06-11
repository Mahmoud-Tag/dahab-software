import { Client } from 'pg'
import { config } from 'dotenv'

config() // Load .env

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  try {
    await client.connect()
    await client.query(`
      CREATE TABLE IF NOT EXISTS "team_members" (
        "id" SERIAL PRIMARY KEY,
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
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "image_public_id" TEXT;
      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "specialty" TEXT;
      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "email" TEXT;
      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "phone" TEXT;
      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "linkedin" TEXT;
      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "github" TEXT;
      ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "twitter" TEXT;
      CREATE INDEX IF NOT EXISTS "team_members_created_at_idx" ON "team_members"("created_at" ASC);
    `)
    console.log("Table created successfully")
  } catch (error) {
    console.error("Error creating table:", error)
  } finally {
    await client.end()
  }
}

main()
