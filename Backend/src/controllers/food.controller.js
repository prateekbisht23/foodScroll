const foodItemModel = require('../models/fooditem.model');
const storageService = require('../services/storage.service');
const{ v4 : uuid } = require('uuid');


async function createFoodItem(req, res){
    
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodItemModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "New food item created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res) {
    
    const foodItems = await foodItemModel.find({});

    res.status(200).json({
        message:"Food Items Fetched Succsessfully!!",
        foodItems
    })

}



module.exports = {
    createFoodItem,
    getFoodItems
}