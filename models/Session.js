const mongoose = require('../configs/database.js');
const schema = mongoose.Schema;
const objectId = schema.ObjectId;
const sessionsSchema = new mongoose.Schema({
    token: { type: String, default: null },
    userId: { type: objectId, default: null },
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiredAt: { type: Date, default: Date.now },
}, { versionKey: false });
module.exports = mongoose.model('sessions', sessionsSchema); 