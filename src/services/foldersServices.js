import { foldersRepository } from '../repositories/foldersRepository.js';

export const foldersServices = {

  createNewFolder: async ({ title }) => {
    try {
        return await foldersRepository.createNewFolder({ title });
    } catch (error) {
        console.log('Service error @createNewFolder', error);
        throw error;
    }
  },

  getAllFolders: async() => {
    return await foldersRepository.getAllFolders()
  }

}