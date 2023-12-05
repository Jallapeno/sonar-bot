import { pipeline } from 'stream/promises';
import { Writable, Readable } from 'stream';
import { sonarRepository } from "../repositories/sonarRepository.js"
import { CreateProjectStream } from '../middleware/createProjectStream.js';

export const sonarServices = {
  getAllProjects: async () => {
    try {
      return await sonarRepository.getAllProjects()
    } catch (error) {
      console.log('Service error @getAllProjects', error);
      throw error;
    }
  },
  createNewProject: async (projects) => {
    try {
      const createProjectStream = new CreateProjectStream();
      const readable = Readable.from(projects);
      const writable = new Writable({ objectMode: true, write: () => {} });

      await pipeline(
        readable,
        createProjectStream,
        writable
      );
      console.log('All projects are created!');
    } catch (error) {
      console.error(`Service error @createNewProject`, error);
    }
  }

}