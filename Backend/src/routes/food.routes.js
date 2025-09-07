const express = require('express');
const router = express.Router();
const multer = require('multer');

const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')


const upload = multer({
    storage: multer.memoryStorage(),
})


router.post('/add',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFoodItem
)


router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)


router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFoodItem
)


router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFoodItem
)


module.exports = router;