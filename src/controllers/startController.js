import { sonarServices } from "../services/sonarServices.js";

export const startController = {
  perform: async(projects) => {
    if(projects.length > 0) {
      await projects.map(async (project) => {
        await sonarServices.insertProjectTokenOnDB(project)
        await sonarServices.startScanner(project)
      })
    } else {
      console.log('notting scan');
    }
  }
}