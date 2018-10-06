const User = require('../routes/User.js');
const apiVersion = '/api/v1';
module.exports = [
    // Auth
    { method: 'POST', path: apiVersion + '/signUp', config: User.signUp },
    { method: 'POST', path: apiVersion + '/signIn', config: User.signIn },
    // { method: 'GET', path: apiVersion + '/signOut', config: User.signOut },

    // Users
    { method: 'GET', path: apiVersion + '/users', config: User.getUsers },
    { method: 'GET', path: apiVersion + '/users/{userId}', config: User.getUser },
    // { method: 'PUT', path: apiVersion + '/users/{userId}', config: User.updateUser }
]