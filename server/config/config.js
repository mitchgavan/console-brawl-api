const _ = require('lodash');

// default config object for api
const config = {
  dev: 'development',
  test: 'test',
  prod: 'production',
  port: process.env.PORT || 3000
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// require could error out if the file doesn't exist so let's try this
// statement and fall back to an empty object if it does error out
try {
  envConfig = require(`./${config.env}`);
  // just making sure the require actually got something back
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

// merge the two config files together the envConfig will overwrite
// properties on the config object
module.exports = _.merge(config, envConfig);
