import { createHash } from 'crypto';
import path from 'path';
import { createReadStream } from 'fs';

export const comandHash = async (currDir, file) => {
  let filePath;
  if (file.match(':')) {
    filePath = file;
  } else {
    filePath = currDir + path.sep + file;
  }

  const hash = createHash('sha256');
  const input = createReadStream(filePath);

  const pp = new Promise((resolve, reject) => {

    input.on('error', () => {
      resolve(`Operation failed\n`);
    });
    input.pipe(hash).setEncoding('hex').pipe(process.stdout);
    input.on('end', () => { resolve('\n') });
  });
  return pp;
}