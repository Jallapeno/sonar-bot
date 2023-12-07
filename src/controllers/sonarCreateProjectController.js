import { sonarServices } from "../services/sonarServices.js";
import { compareAndViewIfNotExistItems } from "../utils/compareArrayItens.js";

export const sonarCreateController = {
  perform: async(newFoldersCreated) => {
    let projectsFindedInSonar = []
    let foldersNonExistentsInSonar = []
    let newProjectsCreated = []
    let projectTokensCreated = []

    await sonarServices.getAllProjects().then(projects => {
      projects.components.map(project => {
        projectsFindedInSonar.push({title: project.name, key: project.key})
      })
    })

    foldersNonExistentsInSonar.push(...compareAndViewIfNotExistItems(newFoldersCreated, projectsFindedInSonar));

    if(foldersNonExistentsInSonar.length == 0) {
      await sonarServices.createNewProject(foldersNonExistentsInSonar)

      await sonarServices.getAllProjects().then(projects => {
        projects.components.map(project => {
          newProjectsCreated.push({title: project.name, key: project.key})
        })
      })

      projectTokensCreated = await Promise.all(newProjectsCreated.map(async (newProject) => {
        return await sonarServices.createProjectAnalysisToken(newProject)
      }))
      console.log(projectTokensCreated);
      return projectTokensCreated;
    } else {
      console.log('not projects to create in sonar');
    }
  }
}