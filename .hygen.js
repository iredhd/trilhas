const { description, version } = require('./package.json');
const gitBranch = require('git-branch');
const slugify = require('slugify');
const dotenv = require('dotenv');

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
    app: {
      name,
      slug,
      version,
      extra
    },
    firebase: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
};