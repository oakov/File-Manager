import { rm } from 'fs/promises';
import path from 'path';

export const comandRm = async (currDir, file) => {
  let filePath;
  if (file.match(':')) {
    filePath = file;
  } else {
    filePath = currDir + path.sep + file;
  }
  try {
    await rm(filePath);
    return 'file removed\n';
  } catch {
    return 'Operation failed\n';
  }
}