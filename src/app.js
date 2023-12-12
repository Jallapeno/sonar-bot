import chokidar from 'chokidar';
import path from 'path';

import { foldersController } from "./controllers/foldersController.js";
import { sonarCreateController } from "./controllers/sonarCreateProjectController.js";
import { startController } from "./controllers/startController.js";

export const handle = async () => {
  const watcher = chokidar.watch(`${process.env.DIRECTORY}`, {
    /**
     * @prop ignoreInitial: true
     * Ignore initial events when starting the watcher/observer.
     * If you have folders created in the root of fold "/directories" folder then comment the line below (line 15).
     * Then the sonar-bot will synchronize your folders in the database and in the SonarQube
    */
    ignoreInitial: true,
    ignored: /(^|[/\\])\../, // Ignore hidden files
    depth: 0, // Limits watching to depth 0 (only folders directly inside ./directories)
  }).on('addDir', async (newFolderPath) => {
    const folderName = path.basename(newFolderPath);
    if (folderName !== 'directories') {
        try {
          const newFoldersCreated = await foldersController.perform()
          const projectTokensCreated = await sonarCreateController.perform(newFoldersCreated)
          await startController.perform(projectTokensCreated)
        } catch (error) {
          console.log('Fatal error', error);
        }
      console.log(`Sonarbot is syncing your folders, project and sonar settings => ${folderName}`);
    }
  });

  await watcher.on('error', (error) => {
    console.error(`Error on watcher: ${error}`);
  });

  await watcher.on('ready', () => {
    console.log('Sonarbot is running 🤖 ✅');
  });
}

