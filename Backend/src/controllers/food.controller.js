const foodItemModel = require('../models/fooditem.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');

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

async function getFoodItems(req, res){
    
    const foodItems = await foodItemModel.find({});

    res.status(200).json({
        message:"Food Items Fetched Succsessfully!!",
        foodItems
    })

}

async function likeFoodItem(req, res) {

    console.log("reached controller")
    
    console.log(req.body)

    const { foodId } = req.body;
    console.log(foodId)
    const user = req.user;

    console.log(user)

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        foodItem: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            foodItem: foodId
        })

        await foodItemModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        foodItem: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFoodItem(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        foodItem: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            foodItem: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        foodItem: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}


module.exports = {
    createFoodItem,
    getFoodItems,
    likeFoodItem,
    saveFoodItem
}