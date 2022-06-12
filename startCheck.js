export const startCheck = () => {
  const arg = process.argv.slice(2);
  let failure = true;
  let name = '';
  let currDir = process.env.HOME;

  try {
    if (arg.length === 1 & arg[0].split('=')[0] === '--username') {
      name = arg[0].split('=')[1];
      failure = false;
    }
  } catch { };

  if (failure) {
    process.stdout.write(`\nThe program should be launched by running an npm script like this:\nnpm run start -- --username=your_username`);
    process.exit(2);
  } else {
    process.stdout.write(`Welcome to the File Manager, ${name}!\n`);
    process.stdout.write(`You are currently in ${currDir}\n>`);
  }

  return [name, currDir];
}