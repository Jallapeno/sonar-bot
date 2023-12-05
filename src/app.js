import { foldersController } from "./controllers/foldersController.js";
import { sonarCreateController } from "./controllers/sonarCreateProjectController.js";

export const handle = async () => {

  try {
    const newFoldersCreated = await foldersController.perform()
    await sonarCreateController.perform(newFoldersCreated)
  } catch (error) {
    console.log('Fatal error', error);
  }
}