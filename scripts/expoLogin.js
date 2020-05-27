require('dotenv').config();
const { executeCommand } = require('./functions');

const main = async () => {
  await executeCommand(`expo login -u ${process.env.EXPO_LOGIN} -p ${process.env.EXPO_PASSOWORD} --non-interactive`);
};

main();
