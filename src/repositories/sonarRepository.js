import fetch from 'node-fetch';
import { commandExecuter } from '../utils/commandExecuter.js';

const sonarqubeUrl = process.env.SONARQUBE_API_URL;
const username = process.env.ADMUSERNAME
const password = process.env.ADMPASSWORD;
const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

const usernameUser = process.env.USERNAME
const passwordUser = process.env.PASSWORD;
const userAuthHeader = `Basic ${Buffer.from(`${usernameUser}:${passwordUser}`).toString('base64')}`

export const sonarRepository = {
  getAllProjects: async () => {
    try {
      const response = await fetch(`${sonarqubeUrl}/api/projects/search`, {
        headers: {'Authorization': authHeader}
      });

      if (response.ok) {
        const projects = await response.json();
        return projects
      } else {
        console.error(`Error getting project list. Status code: ${response.status}`);
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Repository error @getAllProjects', error.message);
    }
  },
  createNewProject: async ({ title }) => {
    try {
      const response = await fetch(`${sonarqubeUrl}/api/projects/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader,
        },
        body: `name=${title}&project=${title}&key=${title}`,
      });

      if (response.ok) {
        const project = await response.json();
        return project
      } else {
        console.error(`Error to create project in sonar. status code: ${response.status}`);
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Repository error @createNewProject', error.message);
      throw error;
    }
  },
  createProjectAnalysisToken: async ({ key }) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('name', key);
      searchParams.append('type', 'PROJECT_ANALYSIS_TOKEN');
      searchParams.append('projectKey', key);

      const response = await fetch(`${sonarqubeUrl}/api/user_tokens/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': userAuthHeader,
        },
        body: searchParams.toString(),
      });
      if (response.ok) {
        const project = await response.json();
        return project
      } else {
        console.error(`Error to create project token in sonar. status code: ${response.status}`);
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Repository error @createProjectAnalysisToken', error.message);
      throw error;
    }
  },
  startScanner: async({ key, token, name }) => {
    commandExecuter(
      `cd directories/${name} && sonar-scanner -Dsonar.projectKey=${key} -Dsonar.sources=. -Dsonar.host.url=${sonarqubeUrl} -Dsonar.login=${token}`
    )
    .then((result) => {
      console.log(`\n${result}`);
    })
    .catch((error) => {
      console.error(`@startScanner repository. Erro during command executing: ${error.message}`);
    });
  }
}