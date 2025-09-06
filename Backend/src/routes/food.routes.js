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


module.exports = router;