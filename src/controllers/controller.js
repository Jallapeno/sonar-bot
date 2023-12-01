import { service } from "../services/services.js";
import { getDirectories } from '../utils/getDirectories.js';

export const controller = {
  perform: async() => {
    let directoriesListed = [];
    let nameFolderListed = [];
    let foldersNonExistents = [];
    let newFoldersCreated = [];

    directoriesListed = await getDirectories("./directories").then( directories => directories)
    nameFolderListed = await service.getAllFolders()
    foldersNonExistents.push(...service.compareAndViewIfNotExistItems(directoriesListed, nameFolderListed));

    if(foldersNonExistents.length > 0) {
      try {
        newFoldersCreated = await Promise.all(foldersNonExistents.map(async (title) => {
          return await service.createNewFolder(title);
        }));

        console.log('all folders created', newFoldersCreated);
      } catch (error) {
        console.log('Erro to create new folders', error);
        throw error
      }
    } else {
      console.log('not folders to create');
    }
  }
}