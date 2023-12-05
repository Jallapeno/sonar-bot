import { exec } from 'child_process';
// Function that executes commands in Linux
export const commandExecuter = (command) => {
    return new Promise((resolve, reject) => {
        exec(`${command} -s`,(error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          if (stderr) {
            reject(new Error(stderr));
            return;
          }
          resolve(stdout);
        });
    });
}
