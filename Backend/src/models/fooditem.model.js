const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }
})

const foodItemModel = mongoose.model("fooditem", foodItemSchema);

module.exports = foodItemModel;