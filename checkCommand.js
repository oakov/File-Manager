import path from 'path';
import { stat } from 'fs/promises';
import { comand_ls } from './comand_ls.mjs';

export const checkCommand = async (data, currDir) => {
  const commandArray = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm'];
  const [comand, ...params] = data.toString().replace(/\s+/g, ' ').trim().split(' ');

  if (!commandArray.includes(comand)) {
    return [currDir, 'Invalid input\n'];
  }

  if (comand === 'up') {
    if (params.length) {
      return [currDir, 'Invalid input\n'];
    } else {
      if (currDir.split(path.sep).length > 1) {
        currDir = currDir.split(path.sep).slice(0, -1).join(path.sep);
      }
      return [currDir, ''];
    }
  }

  if (comand === 'cd') {
    if (params.length != 1) {
      return [currDir, 'Invalid input\n'];
    } else {
      let newDir;
      if (params[0].match(':')) {
        newDir = params[0];
      } else {
        newDir = currDir + path.sep + params[0];
      }
      let answer = '';
      try {
        await stat(newDir);
        currDir = newDir;
      } catch (err) {
        if (err.code === 'ENOENT') {
          answer += `Operation failed\n`;
        }
      }
      return [currDir, answer];
    }
  }

  if (comand === 'ls') {
    if (params.length) {
      return [currDir, 'Invalid input\n'];
    } else {
      return [currDir, (await comand_ls(currDir)).join('\n') + '\n'];
    }
  }

}
