const controllers = require('../controllers/User.js');
const joi = require('joi');
const response = require('./Response.js').setup(controllers);

module.exports = {
    signUp: {
        tags: ['api', 'Auth'],
        description: 'SignUp an Account',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                deviceTypeId: joi.number().allow(null),
                deviceName: joi.string().allow('').allow(null),
                udid: joi.string().allow('').allow(null),
            }).unknown(),
            payload: joi.object({
                fullName: joi.string().allow('').allow(null),
                email: joi.string().email().required(),
                password: joi.string().required()
            })
        },
        handler: (req, res) => {
            response(req, res, 'signUp');
        }
    },

    signIn: {
        tags: ['api', 'Auth'],
        description: 'Sign In',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                deviceTypeId: joi.number().allow(null),
                deviceName: joi.string().allow('').allow(null),
                udid: joi.string().allow('').allow(null),
            }).unknown(),
            payload: joi.object({
                email: joi.string().email().required().default('sihoang@gmail.com'),
                password: joi.string().required()
            })
        },
        handler: (req, res) => {
            response(req, res, 'signIn');
        }
    },

    getUsers: {
        tags: ['api', 'User'],
        description: 'Get list Users',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                authorization: joi.string().required().default('Bearer '),
            }).unknown(),
            query: joi.object({
                keyword: joi.string().allow('').allow(null),
                sortBy: joi.string().required().valid('email', 'fullName', 'createdAt').default('createdAt'),
                sortType: joi.number().required().valid(1, -1).default(-1),
                paginate: joi.number().required().default(1),
                limit: joi.number().required().default(20),
            })
        },
        handler: (req, res) => {
            response(req, res, 'getUsers');
        },
        // auth: {
        //     strategy: 'jwt'
        // }
    },

    getUser: {
        tags: ['api', 'User'],
        description: 'Get User profile',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                authorization: joi.string().required().default('Bearer '),
            }).unknown(),
            params: joi.object({
                userId: joi.string().required()
            })
        },
        handler: (req, res) => {
            response(req, res, 'getUser');
        },
        // auth: {
        //     strategy: 'jwt'
        // }
    },


}