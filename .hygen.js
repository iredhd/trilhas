const gitBranch = require('git-branch');
const dotenv = require('dotenv');

const package = require('./package.json');

dotenv.config();

const branchesAllowed = ['master', 'develop'];

const branch = gitBranch.sync();

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