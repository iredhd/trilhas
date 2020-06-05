const gitBranch = require('git-branch');

const branchesAllowed = ['master', 'develop'];

const branch = gitBranch.sync();
if (!branchesAllowed.includes(branch)) {
  console.log('The deploy just can be executed in master or develop branch.');
  return process.exit(1);
}
return process.exit(0);
