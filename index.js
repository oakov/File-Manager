const { stdin, stdout } = process;
import { startCheck } from './startCheck.js';
import { checkCommand } from './checkCommand.js'

let [name, currDir] = startCheck();

stdin.on('data', data => {
  if (data.toString().trim() === '.exit') process.exit(0);

  checkCommand(data, currDir).then((result) => {
    currDir = result[0];
    stdout.write(result[1] + `\nYou are currently in ${currDir}\n>`);
  });
});

process.on('SIGINT', () => process.exit(0));
process.on('exit', (code) => {
  stdout.write(`\nThank you for using File Manager, ${name}!`);
});