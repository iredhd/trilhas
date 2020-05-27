const { exec } = require('child_process');

const executeCommand = (cmd) => new Promise((resolve, reject) => {
  console.log(cmd);
  exec(cmd, (error, stdout) => {
    if (error) {
      reject();
    } else {
      console.log(stdout);
      resolve();
    }
  });
});

module.exports = {
  executeCommand,
};
