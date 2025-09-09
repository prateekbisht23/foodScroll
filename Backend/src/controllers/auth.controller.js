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
    const {businessName, email, password, phone, address, contactName} = req.body;

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
        businessName,
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
            businessName: foodPartner.businessName,
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
            businessName: foodPartner.businessName
        }
    })

}

function logoutFoodPartner(req, res){

    console.log("Reached Logot Controller")

    res.clearCookie("token");
    res.status(200).json({
        message:"Food Partner logged out successfully!!"
    });
}


async function getLoggedInUser(req, res) {
    try {
        if (req.foodPartner) {
            const foodPartner = await foodPartnerModel.findById(req.foodPartner._id).select('-password');
            return res.status(200).json({
                message: "Food Partner details fetched successfully",
                user: {
                    id: foodPartner._id,
                    name: foodPartner.contactName,
                    email: foodPartner.email,
                    role: "food-partner",
                },
            });
        }

        // Otherwise, fetch the user details
        const user = await userModel.findById(req.user._id).select('-password');
        return res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
                role: "user",
            },
        });
    } catch (error) {
        console.error("Error fetching logged-in user details:", error);
        res.status(500).json({
            message: "An error occurred while fetching user details",
        });
    }
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getLoggedInUser
}