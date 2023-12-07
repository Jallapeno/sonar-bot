import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const foldersRepository = {
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
  createNewFolder: async ({ title }) => {
    try {
        return await prisma.folder.create({
            data: { title, key: title },
            select: {
                title: true,
                key: true
            }
        });
    } catch (error) {
        console.log('Repository error @createNewFolder', error);
        throw error;
    }
  },
  insertProjectTokenByProjecctKeyOnDb: async({ key, token }) => {
    try {
      return await prisma.folder.update({
        where: {
          key
        },
        data: {
          sonar_token: token
        }
      })
    } catch (error) {
      console.error('Repository error @insertProjectTokenOnDB', error.message);
      throw error;
    }
  }
}