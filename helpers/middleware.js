const appConfig = require('../configs/app.js');
const toJson = require('../helpers/functions.js').toJson;
const objectId = require('mongodb').ObjectID;
const Session = require('../resourceAccess/Session.js');

module.exports = {
    jwt: {
        key: appConfig.jwt.secret,
        verifyOptions: { algorithms: ['HS256'] },
        validateFunc: (req, decodedToken, callback) => {
            var token = ((req.headers.authorization).split(/\s+/))[1];

            // if (decodedToken != {} && token) {
            //     return new Promise((resolve) => {
            //         Session.findOne({
            //             token: token,
            //             userId: ObjectId(decodedToken._id),
            //             isActive: true
            //         }).then(result => {
            //             if (result) {
            //                 result = toJson(result);
            //                 if (Math.round((new Date()).getTime() / 1000) > Math.round((new Date(result.expiredAt)).getTime() / 1000)) {
            //                     console.log("ok");
            //                     let condition = {
            //                         _id: ObjectId(result._id),
            //                         userId: ObjectId(decodedToken._id),

            //                     }
            //                     SessionTokens.findOneAndUpdate(condition, { isActive: 0 }).then(result => {

            //                     })
            //                     return callback(Boom.unauthorized('Expired token received for JSON Web Token validation', 'Bearer'));
            //                 }
            //                 return callback(null, true, decodedToken);
            //             } else {
            //                 return callback(Boom.unauthorized('Expired token received for JSON Web Token validation', 'Bearer'));
            //             }
            //         })
            //     })

            // }
            // return callback(Boom.unauthorized('Invalid signature received for JSON Web Token validation', 'Bearer'));

        }
    }
}