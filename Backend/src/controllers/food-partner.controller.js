const foodPartnerModel = require('../models/foodpartner.model')
const foodItemModel = require('../models/fooditem.model')

async function getFoodPartnerById(req, res){

    
    const foodPartnerId = req.params.id;

    const foodItems = await foodItemModel.find({ foodPartner: foodPartnerId })

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    if(!foodPartner){
        return res.status(404).json({
            message:"Food Partner not Found!!"
        })
    }

    res.status(200).json({
        message:"Food Partner Found Succsessfully!!",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems
        }
    });

}

module.exports = {
    getFoodPartnerById
}