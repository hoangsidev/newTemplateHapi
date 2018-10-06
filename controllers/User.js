const User = require('../resourceAccess/User.js');
const helperAuth = require('../helpers/auth.js');
const md5 = require('md5');
const helperFunc = require('../helpers/functions.js');
const resData = require('../helpers/functions.js').resData;
const resErr = require('../helpers/functions.js').resErr;
const objectId = require('mongodb').ObjectID;

module.exports = {
    signUp: (req, res) => {
        return new Promise((resolve, reject) => {
            var data = req.payload; data.password = md5(md5(data.password));
            const project = { 'email': 1, 'fullName': 1 }
            User.getOneDoc({ 'email': data.email }, project)
                .then(existedUser => {
                    if (existedUser) {
                        resolve(resData(201, false, 'Existed email!', null));
                    } else {
                        User.insertOneDoc(data, project)
                            .then(userResult => {
                                const token = helperAuth.createToken(userResult._id); helperAuth.insertToken(token);
                                resolve(resData(201, true, null, { token, userResult }));
                            })
                            .catch(err => {
                                resolve(resErr(err));
                            });
                    }
                })
        });
    },

    signIn: (req, res) => {
        return new Promise((resolve, reject) => {
            var data = req.payload;
            const project = { 'email': 1, 'fullName': 1, 'password': 1 }
            User.getOneDoc({ 'email': data.email }, project)
                .then(userResult => {
                    if (!userResult) {
                        resolve(resData(201, false, 'Email not exist!', null));
                    } else {
                        if (userResult.password != md5(md5(data.password))) {
                            resolve(resData(201, false, 'Incorect password!', null));
                        } else {
                            delete userResult.password;
                            const token = helperAuth.createToken(userResult._id); helperAuth.insertToken(token);
                            resolve(resData(201, true, null, { token, userResult }));
                        }
                    }
                })
                .catch(err => {
                    resolve(resErr(err));
                });
        });
    },

    getUsers: (req, res) => {
        return new Promise((resolve, reject) => {
            var data = req.query;
            var condition = {};
            if (data.keyword) {
                condition = {
                    $or: [
                        { 'email': new RegExp(data.keyword, "i") }
                    ]
                }
            }
            var sort = {}; sort[data.sort] = data.sortType;
            const project = { 'email': 1, 'fullName': 1, 'createdAt': 1 }
            User.getManyDoc(condition, sort, data.paginate, data.limit, project)
                .then(usersResult => {
                    resolve(resData(201, true, null, { usersResult }));
                })
                .catch(err => {
                    resolve(resErr(err));
                });
        });
    },

    getUser: (req, res) => {
        return new Promise((resolve, reject) => {
            var data = req.params;
            const project = { 'email': 1, 'fullName': 1, 'createdAt': 1 }
            User.getOneDoc({ _id: objectId(data.userId) }, project)
                .then(userResult => {
                    resolve(resData(201, true, null, { userResult }));
                })
                .catch(err => {
                    resolve(resErr(err));
                });
        });
    }





}