import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cloudinary } from "../config/cloudinary.js";
import { User } from "../models/userSchema.js";
import { successResponse } from "../responseHandler/successResponse.js";

const signup = async (req, res, next) => {
  try {
    const {userName, email, password} = req.body
    const profileImage = req.file

    if(!userName || !email || !password) throw new Error("All fields are required!")

    if(!profileImage) throw new Error("Image is required!")

    const cloudResponse = await cloudinary.uploader.upload(
        profileImage.path,
        {
            folder: "users"
        }
    )

    bcrypt.hash(password, 12, async function(err, hash) {
        const user = await User.create({
            userName,
            email,
            password: hash,
            profileImage: cloudResponse.secure_url
        })

        successResponse(res, 200, true, "User Signup Successfully!", user)
    });


  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body

    if(!email || !password) throw new Error("All fields are required!")

    const myUser = await User.findOne({email})

    if(!myUser) throw new Error("User not found!")

    bcrypt.compare(password, myUser.password, function(err, result) {
        try {
            if(result){
                const token = jwt.sign({email: myUser.email, id: myUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                res.cookie("token", token)
                successResponse(res, 200, true, "User Logged In Successfully!", myUser)
            }else{
                throw new Error("Invalid Credentials!")
            }
        } catch (error) {
            next(error)
        }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token")

    successResponse(res, 200, true, "User logged Out Successfully!")
  } catch (error) {
    next(error);
  }
};

export { signup, login, logout };
