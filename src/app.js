import { service } from './services/services.js';

export const handle = async () => {

  try {
    await service.perform()
  } catch (error) {
    console.log('Fatal error', error);
  }
}