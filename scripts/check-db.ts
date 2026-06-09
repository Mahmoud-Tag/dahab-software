import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projectCount = await prisma.project.count()
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  console.log('Projects count:', projectCount)
  console.log('Projects:', JSON.stringify(projects, null, 2))
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
