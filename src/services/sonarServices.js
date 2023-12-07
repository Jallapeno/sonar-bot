import { pipeline } from 'stream/promises';
import { Writable, Readable } from 'stream';
import { sonarRepository } from "../repositories/sonarRepository.js"
import { CreateProjectStream } from '../middleware/createProjectStream.js';
import { foldersRepository } from '../repositories/foldersRepository.js';

export const sonarServices = {
  getAllProjects: async () => {
    try {
      return await sonarRepository.getAllProjects()
    } catch (error) {
      console.log('Service error @getAllProjects', error);
      throw error;
    }
  },
  createNewProject: async (project) => {
    try {
      return await sonarRepository.createNewProject({ title: project.title })
      // const createProjectStream = new CreateProjectStream();
      // const readable = Readable.from(projects);
      // const writable = new Writable({ objectMode: true, write: () => {} });

      // await pipeline(
      //   readable,
      //   createProjectStream,
      //   writable
      // );
      // console.log('All projects are created!');
      // return createProjectStream;
    } catch (error) {
      console.error(`Service error @createNewProject`, error);
    }
  },
  createProjectAnalysisToken: async (projects) => {
    try {
      const result = await sonarRepository.createProjectAnalysisToken({key: projects.key})
      return result;
    } catch (error) {
      console.error(`Service error @createProjectAnalysisToken`, error);
      throw error
    }
  },
  insertProjectTokenOnDB: async (projects) => {
    try {
      return await foldersRepository.insertProjectTokenByProjecctKeyOnDb({ key: projects.projectKey, token: projects.token })
    } catch (error) {
      console.error(`Service error @insertProjectTokenOnDB`, error);
      throw error
    }
  },
  startScanner: async (projects) => {
    try {
      return await sonarRepository.startScanner({ key: projects.projectKey, token: projects.token, name: projects.name })
    } catch (error) {
      console.error(`Service error @startScanner`, error);
      throw error
    }
  }

}