const logger = require('./helpers/logging.js');
const glue = require('glue');
const routes = require('./configs/routes.js');
const manifest = require('./configs/manifest.js');
const middleware = require('./helpers/middleware.js');

glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
    if (err) {
        throw err;
    }
    server.start(() => {
        logger.info('Server running at:', server.info.uri);
    });
    server.auth.strategy('jwt', 'jwt', middleware.jwt);
    server.route(routes);
});