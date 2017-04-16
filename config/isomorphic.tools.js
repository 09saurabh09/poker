const IsomorphicTools = require('webpack-isomorphic-tools');
const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicConfig = require('./isoConfig.js');
const paths = require('./paths');

const isDevelopment = process.env.NODE_ENV === 'development';
const isomorphicTools = new IsomorphicTools(isomorphicConfig);
const isomorphicPlugin = new IsomorphicToolsPlugin(isomorphicConfig);

module.exports = {
  server() {
    return isomorphicTools
      .server(paths.ROOT)
      .then(() => {
        const assets = isomorphicTools.assets();
        return {
          javascript: Object.keys(assets.javascript).map((asset) => assets.javascript[asset]),
          styles: Object.keys(assets.styles).map((asset) => assets.styles[asset])
        };
      });
  },
  plugin: () => {return isomorphicPlugin}
};
