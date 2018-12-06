const express = require('express');
const app = express();
const morgan = require('morgan');

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('../config');

const ViewRouter = require('./modules/view/router');
const ApiRouter = require('./routes-api');

const Server = {
  init: () => {
    Server.enableCrossOriginRequests();
    Server.enableLogs();
    Server.setTheming();
    Server.enableRouting();
  },

  enableLogs: () => {
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(
        bodyParser.urlencoded({
          extended: true,
        }),
    );
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('combined'));
    }
  },

  setTheming: () => {
    app.use(express.static('public'));
    app.set('view engine', 'pug');
  },

  enableRouting: () => {
    const corsOptions = {
      origin: ['http://localhost:4200'],
      credentials: true,
    };

    app
        .use(cors(corsOptions))
        .use('/api', ApiRouter)
        .use('/', ViewRouter);
  },

  enableCrossOriginRequests: () => {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
          'Access-Control-Allow-Methods',
          'GET,HEAD,OPTIONS,POST,PUT,DELETE',
      );
      res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token',
      );
      next();
    });
  },

  start: (cmdConfig) => {
    Server.init();

    const mongoCreds = (process.env.NODE_ENV === 'test') ? config.test.mongo : config.production.mongo;

    mongoose.Promise = global.Promise;
    mongoose
        .connect(mongoCreds, { useMongoClient: true })
        .then(() => {
          // console.log("DB connection: OK");
        })
        .catch(err => {
          // console.log("DB connection: ERROR");
          // console.log(err);
        });

    const serverPort = (typeof config.port !== 'undefined') ? config.port : 4000;
    server = app.listen(serverPort, () => {
      console.log('http://localhost:' + serverPort);
    });

    return app;
  },

  stop: () => {
    server.close();
  },
};

module.exports = Server;
