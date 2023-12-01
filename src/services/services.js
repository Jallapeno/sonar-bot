import { repository } from '../repositories/repository.js';

export const service = {

  // Filters items from arr1 that are not present in arr2
  compareAndViewIfNotExistItems: (arr1, arr2) => {
    const mapArr2 = new Map(arr2.map(item => [item.title, true]));
    return arr1.filter(item1 => !mapArr2.has(item1.title));
  },

  createNewFolder: async ({ title }) => {
    try {
        return await repository.createNewFolder({ title });
    } catch (error) {
        console.log('Service error @createNewFolder', error);
        throw error;
    }
},

  getAllFolders: async() => {
    return await repository.getAllFolders()
  }

}