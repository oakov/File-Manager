import os from 'os';


export const comandOs = async (currDir, flag) => {
  switch (flag) {
    case '--EOL': return JSON.stringify(os.EOL) + '\n';
    case '--cpus': {
      let answer = `overall amount of CPUS: ${os.cpus().length}\n`
      for (const cpu in os.cpus()) {
        answer += `model: ${os.cpus()[cpu].model}, clock rate: ${os.cpus()[cpu].speed / 1000} GHz\n`;
      }
      return answer;
    }
    case '--homedir': return process.env.HOME + '\n';
    case '--username': return process.env.USERNAME + '\n';
    case '--architecture': return os.arch() + '\n';
    default: return 'Operation failed\n';
  }
}