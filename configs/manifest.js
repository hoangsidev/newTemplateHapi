const appConfig = require('../configs/app.js');
const manifest = {
    server: {

    },
    connections: [
        {
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true
            },
            port: process.env.PORT || 7001,
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                    // additionalHeaders: ['headers']
                },
                payload: { timeout: 3600000 },
                timeout: { server: 3600000, socket: 36000000 }
            }
        }
    ],
    registrations: [{
        plugin: {
            register: 'hapi-auth-jwt',
            options: appConfig.jwt.options
        }
    }]
};

if (appConfig.documentation.enable) {
    manifest.registrations.push(
        {
            plugin: {
                register: 'hapi-swagger',
                options: appConfig.documentation.options
            }
        }
    );

    if (appConfig.documentation.options.documentationPage || appConfig.documentation.options.swaggerUI) {
        manifest.registrations.push(
            {
                plugin: {
                    register: 'inert',
                    options: {}
                }
            },
            {
                plugin: {
                    register: 'vision',
                    options: {}
                }
            }
        );
    }
}

if (appConfig.logging.console.enable || appConfig.logging.loggly.enable) {
    const loggingPlugins = {
        plugin: {
            register: 'good',
            options: {
                reporters: {}
            }
        }
    };

    if (appConfig.logging.console.enable) {
        loggingPlugins.plugin.options.reporters.consoleReporter = [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: appConfig.logging.console.levels
            },
            {
                module: 'good-console'
            }, 'stdout'
        ]
    }

    if (appConfig.logging.loggly.enable) {
        loggingPlugins.plugin.options.reporters.logglyReporter = [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: appConfig.logging.loggly.levels
            },
            {
                module: 'good-loggly',
                args: [
                    {
                        token: appConfig.logging.loggly.token,
                        subdomain: appConfig.logging.loggly.subdomain,
                        tags: appConfig.logging.loggly.tags,
                        name: appConfig.logging.loggly.name,
                        hostname: appConfig.logging.loggly.hostname,
                        threshold: appConfig.logging.loggly.threshold,
                        maxDelay: appConfig.logging.loggly.maxDelay
                    }
                ]
            }
        ]
    }

    manifest.registrations.push(loggingPlugins);
}

module.exports = manifest;
