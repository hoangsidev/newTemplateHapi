'use strict';

var env = process.env.NODE_ENV || 'development';
var pjson = require('../package.json');

module.exports = {
    jwt: {
        secret: process.env.SECRET || 'secret',
        expiresIn: process.env.EXPIRESIN || 60 * 60 * 24 * 30, // 30 day
    },
    documentation: {
        enable: true,
        options: {
            info: {
                title: "App APIs documentation",
                version: pjson.version,
                description: 'Sample Template Hapi'
            },
            grouping: 'tags',
            documentationPage: true,
            swaggerUI: true
        }
    },
    logging: {
        console: {
            enable: true,
            levels: env === 'production' ? [] : [{ log: '*', request: '*', response: '*', error: '*' }],
            winston: {
                level: env === 'production' ? 'info' : 'debug'
            },
            squeeze: {
                levels: env === 'production' ? [] : [{ log: '*', request: '*', response: '*', error: '*' }]
            }
        },
        loggly: {
            enable: true,
            token: "55d8291a-d8d4-4c34-a0f6-8b556d90f84f",
            levels: env === 'production' ? [{ response: '*', error: '*' }] : [{ response: '*', error: '*' }],
            subdomain: "hoangsi.com",
            tags: ["APP-stats"],
            name: "App APIs",
            hostname: "localhost:7001",
            threshold: 5,
            maxDelay: 1500000,
            winston: {
                level: env === 'production' ? 'info' : 'debug'
            },
            squeeze: {
                levels: env === 'production' ? [{ response: '*', error: '*' }] : [{ response: '*', error: '*' }],
            }
        }


    },
    cronJobs: {
        pollingInterval: '*/5 * * * * *'
    },
    cache: {
        duration: 300,
        checkPeriod: 400
    },
    apiVersion: 1.0
};
