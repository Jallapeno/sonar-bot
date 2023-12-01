import { foldersController } from "./controllers/foldersController.js";
import { sonarController } from "./controllers/sonarController.js";

export const handle = async () => {

  try {
    const newFoldersCreated = await foldersController.perform()
    sonarController.perform(newFoldersCreated)
  } catch (error) {
    console.log('Fatal error', error);
  }
}