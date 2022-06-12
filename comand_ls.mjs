import { stat, readdir } from 'fs/promises';
import path from 'path';

export const comand_ls = async (currDir) => {
  currDir += path.sep;
  const files = await readdir(currDir);
  return files;
}
