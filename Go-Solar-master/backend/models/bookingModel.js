const { Schema, model, Types } = require('../connection');

const myschema = new Schema({
    user: {type : Types.ObjectId, ref: 'users'},
    product: {type : Types.ObjectId, ref: 'products'},
    amount: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('bookings', myschema);