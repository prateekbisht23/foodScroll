const foodPartnerModel = require('../models/foodpartner.model');
const foodItemModel = require('../models/fooditem.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    try {
        // Fetch the food partner
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        if (!foodPartner) {
            return res.status(404).json({
                message: "Food Partner not Found!!"
            });
        }

        // Fetch food items for the food partner
        const foodItems = await foodItemModel.find({ foodPartner: foodPartnerId });

        // Add like and save counts to each food item
        const foodItemsWithCounts = await Promise.all(
            foodItems.map(async (item) => {
                const likes = await likeModel.countDocuments({ foodItem: item._id });
                const saves = await saveModel.countDocuments({ foodItem: item._id });

                return {
                    ...item.toObject(),
                    likes,
                    saves
                };
            })
        );

        // Respond with the food partner and enriched food items
        res.status(200).json({
            message: "Food Partner Found Successfully!!",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsWithCounts
            }
        });
    } catch (error) {
        console.error("Error fetching food partner:", error);
        res.status(500).json({
            message: "An error occurred while fetching the food partner."
        });
    }
}

module.exports = {
    getFoodPartnerById
};