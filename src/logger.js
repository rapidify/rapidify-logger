import LoggerModel from './models/logger.model';
import {HttpCode} from 'rapidify-core/lib/utils';

async function requestLogger(server) {
  server.addHook('onRequest', (req, res, done) => {
    done();
  });
}

async function responseLogger(server) {
  server.addHook('onSend', async (req, res, payload) => {
    // log only those requests & responses for which Server/DB throws Error
    const logger = LoggerModel;

    try {
      if (
        res.statusCode !== HttpCode[200].code &&
        res.statusCode !== HttpCode[201].code
      ) {
        await logger.createLog(req, res, payload);
      }
    } catch (err) {
      await logger.createLog(req, res, payload);
    }
  });
}

// Logger Plugin
export default (fastify) => {
  requestLogger(fastify);
  responseLogger(fastify);
};
