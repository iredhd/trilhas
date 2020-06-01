require('dotenv/config');

module.exports = {
  helpers: {
    extra: {
      ...process.env
    }
  }
};