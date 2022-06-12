import { createWriteStream } from 'fs';
import path from 'path';

export const comandAdd = async (currDir, file) => {
  let filePath;
  if (file.match(':')) {
    filePath = file;
  } else {
    filePath = currDir + path.sep + file;
  }

  const output = createWriteStream(filePath, { 'flags': 'wx' });
  const pp = new Promise((resolve) => {
    output.on('error', () => {
      resolve(`Operation failed\n`);
    });
    output.on('open', () => resolve('file created\n'));
  });
  return pp;
}