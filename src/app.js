import { foldersController } from "./controllers/foldersController.js";
import { sonarCreateController } from "./controllers/sonarCreateProjectController.js";
import { startController } from "./controllers/startController.js";

export const handle = async () => {

  try {
    const newFoldersCreated = await foldersController.perform()
    const projectTokensCreated = await sonarCreateController.perform(newFoldersCreated)
    await startController.perform(projectTokensCreated)
  } catch (error) {
    console.log('Fatal error', error);
  }
}