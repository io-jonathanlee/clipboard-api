import bunyan from 'bunyan';

const logger: bunyan = bunyan.createLogger({name: 'clipboard-api', src: true});
logger.info('Initializing application');

/**
 * Bunyan logger configuration.
 */
export const loggerConfig = () => {
  return logger;
};
