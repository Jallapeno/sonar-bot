// Função para buscar uma pasta pelo nome
export const findFolderByName = (folderPath, folderName) => {
  return new Promise((resolve, reject) => {
    const command = `find ${folderPath} -type d -name ${folderName} -print -quit`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      if (stderr) {
        reject(new Error(stderr));
        return;
      }

      if (stdout.trim() !== '') {
        // resolve(`${stdout.trim()}`);
        return resolve(`${stdout.trim()}`)
      } else {
        reject(new Error(`${folderName} não encontrado em ${folderPath}`));
      }
    });
  });
};