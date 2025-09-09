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
    
    const userId = req.user._id;

    const foodItems = await foodItemModel.find({});
    const likedItems = await likeModel.find({ user: userId }).select("foodItem");
    const savedItems = await saveModel.find({ user: userId }).select("foodItem");

    const likedSet = new Set(likedItems.map((like) => like.foodItem.toString()));
    const savedSet = new Set(savedItems.map((save) => save.foodItem.toString()));

    const foodItemsWithStatus = foodItems.map((item) => ({
        ...item.toObject(),
        liked: likedSet.has(item._id.toString()),
        saved: savedSet.has(item._id.toString()),
    }));

    res.status(200).json({
        message: "Food Items Fetched Successfully!!",
        foodItems: foodItemsWithStatus,
    });
    
}

async function likeFoodItem(req, res) {

    const { foodId } = req.body;
    const user = req.user;

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

    await foodItemModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function getLikedItem(req, res){

    console.log("Reached getLikedItem")

    const user = req.user;
    
    console.log(user);
    const likedItems = await likeModel.find({ user: user._id });

    res.status(200).json({
        message:"Liked Items Fetched Successfully!!",
        likedItems
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

        await foodItemModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        foodItem: foodId
    })

    await foodItemModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSavedItem(req, res){

    const user = req.user;
    
    const savedItems = await saveModel.find({ user: user._id });

    res.status(200).json({
        message:"Saved Items Fetched Successfully!!",
        savedItems
    })

}


module.exports = {
    createFoodItem,
    getFoodItems,
    likeFoodItem,
    saveFoodItem,
    getLikedItem,
    getSavedItem
}