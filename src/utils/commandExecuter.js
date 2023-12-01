import { exec } from 'child_process';
// Function that executes commands in Linux
export const commandExecuter = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
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

// * example to use
// executeCommand('ls')
//   .then((result) => {
//     console.log(`\n${result}`);
//   })
//   .catch((error) => {
//     console.error(`Erro during command executing: ${error.message}`);
//   });
// console.log(directoriesListed);