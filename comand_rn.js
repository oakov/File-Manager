import path from 'path';
import { stat, rename } from 'fs/promises';

export const comandRn = async (currDir, oldPath, newName) => {
  let oldFilePath, newFilePath;
  if (oldPath.match(':')) {
    oldFilePath = oldPath;
    newFilePath = oldFilePath.split(path.sep).slice(0, -1).join(path.sep) + path.sep + newName;
  } else {
    oldFilePath = currDir + path.sep + oldPath;
    newFilePath = currDir + path.sep + newName;
  }

  let exists;
  try {
    exists = await stat(newFilePath);
  } catch { }
  if (exists) return `Operation failed\n`;
  try {
    await rename(oldFilePath, newFilePath);
  } catch (e) {
    if (e.code === 'ENOENT') return `Operation failed\n`;
  }
  return '';
}