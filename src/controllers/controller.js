import { service } from "../services/services.js";
import { getDirectories } from '../utils/getDirectories.js';

export const controller = {
  perform: async() => {
    let directoriesListed = [];
    let nameFolderListed = [];
    let foldersNonExistents = [];
    let newFoldersCreated = [];

    await getDirectories("./directories").then( directories => directoriesListed = directories)
    nameFolderListed = await service.getAllFolders()

    foldersNonExistents = service.compareAndViewIfNotExistItems(directoriesListed, nameFolderListed);

    if(foldersNonExistents.length > 0) {
      newFoldersCreated = await Promise.all(
        foldersNonExistents.map(async (element) => {
          const response = await service.createNewFolder(element);
          return response;
        })
      );

      return newFoldersCreated;
    }

  }
}