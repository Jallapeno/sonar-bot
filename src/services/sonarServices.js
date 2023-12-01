import fetch from 'node-fetch';

const sonarqubeUrl = 'http://localhost:9000';
const username = 'sonarqube user';
const password = 'sonarqube password';
const headers = { Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}` }

export const sonarServices = {
  getAllProjects: async () => {
    try {
      const response = await fetch(`${sonarqubeUrl}/api/projects/search`, {
        headers: headers
      });

      if (response.ok) {
        const projects = await response.json();
        return projects
      } else {
        console.error(`Erro ao obter a lista de projetos. Código de status: ${response.status}`);
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    }
  },
}