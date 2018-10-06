const appConfig = require('../configs/app.js');
const sessions = require('../resourceAccess/Session.js');
const toJson = require('../helpers/functions.js').toJson;
const objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
module.exports = {
    createToken: (userId) => {
        return jwt.sign(
            { userId: userId },
            appConfig.jwt.secret,
            {
                algorithm: 'HS256',
                expiresIn: appConfig.jwt.expiresIn
            }
        );
    },

    insertToken: (token) => {
        const decodeToken = jwt.decode(token);
        var data = {
            token: token,
            createdAt: new Date(decodeToken.iat * 1000),
            expiredAt: new Date(decodeToken.exp * 1000),
            userId: objectId(decodeToken.userId),
            isActive: true
        }
        sessions.insert(data).then(newSession => {
            if (newSession) {
                console.log('Created new Session!');
            } else {
                console.log('Can not create new Session!');
            }
        }).catch(error => { reject(error); });
    },

    checkToken: () => {

    }
}