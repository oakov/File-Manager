import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { BrotliDecompress } from 'zlib';

export const comandDecompress = async (currDir, filePath, arcFile) => {
  let oldFilePath, newFilePath, file;
  if (filePath.match(':')) {
    oldFilePath = filePath;
    // file = filePath.split(path.sep).slice(-1);
  } else {
    oldFilePath = currDir + path.sep + filePath;
    // file = filePath;
  }
  if (arcFile.match(':')) {
    newFilePath = arcFile;
  } else {
    newFilePath = currDir + path.sep + arcFile;
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
    input.pipe(BrotliDecompress()).pipe(output);
    input.on('end', () => { resolve('file was decompresed\n') });
  });
  return pp;
}