import { stat, readdir } from 'fs/promises';
import path from 'path';

export const comand_ls = async (currDir) => {
  let promises = [];
  if (currDir.match(':')) currDir += path.sep;

  const files = readdir(currDir);
  // files.forEach((file) => {
  //   // for await (const file of files) {
  //   promises.push(new Promise(async (resolve, reject) => {
  //     if (file.isFile()) {
  //       const s = await stat(path.join(currDir, file.name));
  //       resolve(`${file.name}\t\t\t ${s.size}b\n`);
  //     } else {
  //       resolve(`${file.name}\t\t\t <DIR>\n`);
  //     }
  //   }));
  // });
  // return Promise.all(promises);
  return await files;
}
