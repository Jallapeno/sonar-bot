import { commandExecuter } from '../utils/commandExecuter.js';
import fetch from 'node-fetch';

const sonarqubeUrl = process.env.SONARQUBE_API_URL;
// const token = 'sqa_e491a890989613ecc63e56f242372e26d8ae3f64';
const token = 'sqa_ad2c288094cd136bc833413731f6854213862ee8'
const username = process.env.USERNAME
const password = process.env.PASSWORD;
const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

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
      console.error('Service error @getAllProjects', error.message);
    }
  },
  createNewProject: async ({ title }) => {
    try {
      await commandExecuter(`curl -X POST -u ${username}:${password} -d "name=${title}" -d "key=${title}" -d "project=${title}" ${sonarqubeUrl}/api/projects/create`)
      .then(async (result) => {
        return await result
      })
      .catch((error) => {
        console.error(`Erro during command executing: ${error}`);
      });
    } catch (error) {
      console.error('Service error @createNewProject', error.message);
    }
  }
}