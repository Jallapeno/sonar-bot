import { foldersController } from "./controllers/foldersController.js";

export const handle = async () => {

  try {
    const newFoldersCreated = await foldersController.perform()
    console.log(newFoldersCreated);
  } catch (error) {
    console.log('Fatal error', error);
  }
}