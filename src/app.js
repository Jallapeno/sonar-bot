import { controller } from "./controllers/controller.js";

export const handle = async () => {

  try {
    await controller.perform()
  } catch (error) {
    console.log('Fatal error', error);
  }
}