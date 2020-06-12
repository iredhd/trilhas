const gitBranch = require('git-branch');
const fs = require('fs');

const branch = gitBranch.sync();

if (branch === 'master') {
  fs.copyFileSync('.env.prd', '.env');
} else {
  fs.copyFileSync('.env.dev', '.env');
}

return process.exit(0);
