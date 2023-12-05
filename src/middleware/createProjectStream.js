import { Transform } from 'stream';
import { sonarRepository } from "../repositories/sonarRepository.js"

export class CreateProjectStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  async _transform(project, encoding, callback) {
    try {
      await sonarRepository.createNewProject({ title: project.title });
      this.push(project);
    } catch (error) {
      console.error(`Erro to create project ${project.title}: ${error.message}`);
    }
    callback();
  }
}