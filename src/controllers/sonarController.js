import { sonarServices } from "../services/sonarServices.js";

export const sonarController = {
  perform: async(newFoldersCreated) => {
    if(newFoldersCreated > 0) {
      try {
        await sonarServices.getAllProjects().then(projects => {
          console.log(projects);
        })
      } catch (error) {
        console.log('Erro to create a new project', error);
        throw error
      }
    } else {
      console.log('not sonar project to create');
      return newFoldersCreated;
    }
  }
}