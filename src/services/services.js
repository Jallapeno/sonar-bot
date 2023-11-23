import { getDirectories } from '../utils/getDirectories.js';
import { repository } from '../repositories/repository.js';


export const service = {
  perform: async() => {

    let directoriesListed = [];
    let nameFolderListed = [];
    let foldersNonExistents = [];
    let newFoldersCreated = [];

    await getDirectories("./directories").then( directories => directoriesListed = directories)
    nameFolderListed = await repository.getAllFolders()

    foldersNonExistents = compareAndViewIfNotExistItems(directoriesListed, nameFolderListed);

    newFoldersCreated = await foldersNonExistents.forEach(element => {
      createNewFolder(element)
    });

    return newFoldersCreated
  }
}

// Filters items from arr1 that are not present in arr2
const compareAndViewIfNotExistItems = (arr1, arr2) => {
  const mapArr2 = new Map(arr2.map(item => [item.title, true]));
  return arr1.filter(item1 => !mapArr2.has(item1.title));
}

const createNewFolder = async(title) => {
  console.log(title);
  return await repository.createNewFolder(title)
}