const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res){
    const {fullName, email, password} = req.body;

    const isUserAlreadyExisting = await userModel.findOne({
        email
    })

    if(isUserAlreadyExisting){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email, 
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res){

    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message:"User Logged In Successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

function logoutUser(req, res){
    console.log("logout reached");
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully!!"
    });
}


async function registerFoodPartner(req, res){
    const {name, email, password, phone, address, contactName} = req.body;

    const isUserAlreadyExisting = await userModel.findOne({
        email
    })

    if(isUserAlreadyExisting){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email, 
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message:"Food Partner Registered Successfully",
        foodPartner:{
            _id: foodPartner._id,
            contactName: foodPartner.contactName,
            name: foodPartner.name,
            email: foodPartner.email,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    })

}

async function loginFoodPartner(req, res){

    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        _id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message:"Food Partner Logged In Successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })

}

function logoutFoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message:"Food Partner logged out successfully!!"
    });
}




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}