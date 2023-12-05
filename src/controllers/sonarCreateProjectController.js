import { sonarServices } from "../services/sonarServices.js";
import { compareAndViewIfNotExistItems } from "../utils/compareArrayItens.js";

export const sonarCreateController = {
  perform: async(newFoldersCreated) => {
    let projectsFindedInSonar = []
    let foldersNonExistentsInSonar = []
    // let newProjectsCreated = []

    await sonarServices.getAllProjects().then(projects => {
      projects.components.map(project => {
        projectsFindedInSonar.push({title: project.name, key: project.key})
      })
    })

    foldersNonExistentsInSonar.push(...compareAndViewIfNotExistItems(newFoldersCreated, projectsFindedInSonar));

    await sonarServices.createNewProject(foldersNonExistentsInSonar)

    // TODO - Verify if sonar project exists in DB case not then insert a new register in DB
    // projectsNonExistentsInDB.push(...compareAndViewIfNotExistItems(projectsListedInSonar, newFoldersCreated));
  }
}