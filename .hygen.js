const { description, version } = require('./package.json');
const gitBranch = require('git-branch');
const dotenv = require('dotenv');
const slugify = require('slugify');

dotenv.config();

const branch = gitBranch.sync();

const name = branch === 'master' ? description : `${description} [${branch}]`;

const slug = slugify(name, {
  lower: true
});

let extra = {};

Object.keys(process.env)
  .filter(key => key.indexOf('EXPO_') > -1)
  .map(item => extra[item] = process.env[item]);

module.exports = {
  helpers: {
    name,
    slug,
    version,
    extra
  }
};