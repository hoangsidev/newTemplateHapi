const logger = require('../helpers/logging.js');
const errorCodes = {
    405: { statusCode: 405, success: false, message: 'Method Not Allowed', data: null },
    500: { statusCode: 500, success: false, message: 'Internal Server Error', data: null },
    200: { statusCode: 200, success: true, message: 'Success', data: null },
    201: { statusCode: 201, success: true, message: null, data: null },
};

module.exports = {
    setup: (controllers) => {
        return (request, reply, method) => {
            controllers[method](request).then((data) => {
                if (data && data.statusCode) {
                    reply(data).code(data.statusCode);
                } else {
                    reply(data).code(200);
                }
            }).catch(data => {
                logger.error(data);
                if (data && data.statusCode) {
                    reply(data).code(data.statusCode);
                } else {
                    reply(errorCodes[500]).code(500);
                }
            });
        }
    },
};