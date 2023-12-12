import { sonarServices } from "../services/sonarServices.js";

export const startController = {
  perform: async(projects) => {
    if(projects) {
      await projects.map(async (project) => {
        await sonarServices.insertProjectTokenOnDB(project)
        await sonarServices.startScanner(project)
      })
    } else {
      console.log('not projects to configure scan');
    }
  }
}