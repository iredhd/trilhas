const package = require('./package.json');
const gitBranch = require('git-branch');
require('dotenv/config');

const branchesAllowed = ['master', 'develop'];

const branch = gitBranch.sync();

if (!branchesAllowed.includes(branch)) {
  return new Error(`The deploy just can be executed in master or develop branch.`);
}

const name = branch === 'master' ? package.description : `${package.description} [${branch}]`;

let extra = {};

Object.keys(process.env)
  .filter(key => key.indexOf('EXPO_') > -1)
  .map(item => extra[item] = process.env[item]);

module.exports = {
  helpers: {
    name: name,
    version: package.version,
    extra
  }
};