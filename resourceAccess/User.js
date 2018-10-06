const User = require('../models/User.js');
const objectId = require('mongodb').ObjectID;
module.exports = {
    insertOneDoc: (data, project) => {
        return new Promise((resolve, reject) => {
            data.createdAt = new Date();
            User.create(data).then(resultCreated => {
                User.findOne({ _id: objectId(resultCreated._id) }, project)
                    .then(result => {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    });
            });
        });
    },

    getOneDoc: (condition, project) => {
        return new Promise((resolve, reject) => {
            User.findOne(condition, project)
                .then(result => {
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                });
        });
    },

    getManyDoc: (condition, sort, paginate, limit, project) => {
        return new Promise((resolve, reject) => {
            User.aggregate([
                { $match: condition },
                { $sort: sort },
                { $skip: (limit * paginate) - limit },
                { $limit: limit },
                { $project: project }
            ]).then(results => {
                results = JSON.parse(JSON.stringify(results));
                resolve(results);
            });
        });
    },


    // ===== Custom functions here, please do not edit function on top

}