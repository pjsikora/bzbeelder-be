const Server = require('./core/server');
const argv = require('minimist')(process.argv.slice(2));

const config = {
    env: argv.env || 'production'
};

const app = Server.start(config);


console.log('process.env.NODE_ENV');
console.log(process.env.NODE_ENV);
module.exports = app;