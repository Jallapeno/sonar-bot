import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const repository = {
  getAllFolders: async(req, res) => {
      try {
          return await prisma.folder.findMany({
            select: {
              title: true
            }
          })
      } catch (error) {
          console.log(error);
      }
  },
  createNewFolder: async(title) => {
    try {
      return await prisma.folder.create({
        data: title
      , select: {
        id: true,
        title: true
      }
    })
    } catch (error) {
      console.log(error);
    }
  }
}