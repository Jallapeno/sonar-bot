import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const test01 = await prisma.folder.upsert({
    where: {
      title: "test01"
    },
    update: {},
    create: {
      title: "test01"
    }
  })

  const test02 = await prisma.folder.upsert({
    where: {
      title: "test02"
    },
    update: {},
    create: {
      title: "test02"
    }
  })
}

main()
.then(async () => { await prisma.$disconnect() })
.catch(async(e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })