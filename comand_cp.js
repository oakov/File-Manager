import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

export const comandCp = async (currDir, filePath, newDir) => {
  let oldFilePath, newFilePath, file;
  if (filePath.match(':')) {
    oldFilePath = filePath;
    file = filePath.split(path.sep).slice(-1);
  } else {
    oldFilePath = currDir + path.sep + filePath;
    file = filePath;
  }
  if (newDir.match(':')) {
    newFilePath = newDir + path.sep + file;
  } else {
    newFilePath = currDir + path.sep + newDir + path.sep + file;
  }
  console.log(oldFilePath)
  console.log(newFilePath)
  const input = createReadStream(oldFilePath);
  const output = createWriteStream(newFilePath, { 'flags': 'wx' });
  const pp = new Promise((resolve) => {
    input.on('error', () => {
      resolve(`Operation failed\n`);
    });
    output.on('error', () => {
      resolve(`Operation failed\n`);
    });
    input.pipe(output);
    input.on('end', () => { resolve('file was copied\n') });
  });
  return pp;
}