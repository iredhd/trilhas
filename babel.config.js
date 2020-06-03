module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['inline-dotenv', '@babel/plugin-proposal-optional-chaining'],
  };
};
