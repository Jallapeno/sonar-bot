import { foldersServices } from "../services/foldersServices.js";
import { getDirectories } from '../utils/getDirectories.js';
import { compareAndViewIfNotExistItems } from "../utils/compareArrayItens.js";

export const foldersController = {
  perform: async() => {
    let directoriesListed = [];
    let nameFolderListed = [];
    let foldersNonExistents = [];
    let newFoldersCreated = [];

    directoriesListed = await getDirectories("./directories").then( directories => directories)
    nameFolderListed = await foldersServices.getAllFolders()
    foldersNonExistents.push(...compareAndViewIfNotExistItems(directoriesListed, nameFolderListed));

    if(foldersNonExistents.length > 0) {
      try {
        newFoldersCreated = await Promise.all(foldersNonExistents.map(async (title) => {
          return await foldersServices.createNewFolder(title);
        }));
        return newFoldersCreated;
      } catch (error) {
        console.log('Erro to create new folders', error);
        throw error
      }
    } else {
      console.log('not folders to create');
      return newFoldersCreated;
    }
  }
}