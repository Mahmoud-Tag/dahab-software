import { Client } from 'pg'
import { config } from 'dotenv'

config() // Load .env

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  try {
    await client.connect()
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "email_verified_at" TIMESTAMP(3),
        "password" TEXT NOT NULL,
        "remember_token" TEXT,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log("Users table created successfully")

    // Create personal_access_tokens table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "personal_access_tokens" (
        "id" SERIAL PRIMARY KEY,
        "tokenable_type" TEXT NOT NULL,
        "tokenable_id" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "abilities" TEXT,
        "last_used_at" TIMESTAMP(3),
        "expires_at" TIMESTAMP(3),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "personal_access_tokens_tokenable_id_fkey" FOREIGN KEY ("tokenable_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "personal_access_tokens_tokenable_type_tokenable_id_idx" ON "personal_access_tokens"("tokenable_type", "tokenable_id");
    `)
    console.log("Personal access tokens table created successfully")

    // Ensure projects table exists as well (since it's in public now)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "catIcon" TEXT,
        "desc" TEXT,
        "fullDesc" TEXT,
        "image" TEXT,
        "image_public_id" TEXT,
        "tags" JSONB,
        "year" TEXT,
        "type" TEXT,
        "language" TEXT,
        "downloads" INTEGER NOT NULL DEFAULT 0,
        "downloadUrl" TEXT,
        "websiteUrl" TEXT,
        "status" TEXT,
        "features" JSONB,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log("Projects table created successfully")

  } catch (error) {
    console.error("Error creating tables:", error)
  } finally {
    await client.end()
  }
}

main()
