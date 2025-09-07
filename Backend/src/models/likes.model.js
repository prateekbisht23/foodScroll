const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food-item',
        required: true
    }
}, {
    timestamps: true
})

const LikeModel = mongoose.model('like', likeSchema);
module.exports = LikeModel;