import { createReadStream } from 'fs';
import path from 'path';

export const comandCat = async (currDir, file) => {
  let filePath;
  if (file.match(':')) {
    filePath = file;
  } else {
    filePath = currDir + path.sep + file;
  }

  const input = createReadStream(filePath);

  const pp = new Promise((resolve, reject) => {

    input.on('error', () => {
      resolve(`Operation failed\n`);
    });
    input.on('open', () => process.stdout.write('----------START\n'));
    input.pipe(process.stdout);
    input.on('end', () => { resolve('---------END\n') });
  });
  return pp;
}