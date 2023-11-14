import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User_model from "../models/User_model.js";


// CRUD create { make crad system }



/**
 *      @DESE GET ALL USER 
 *      @ROUTE /api/v1/user 
 *      @MTEHOD GET
 *      @ACCESS PUBLIC
 */
export const get_all_user = asyncHandler (  async (req, res) =>  {
    // get all user 
    const data = await User_model.find();

    // check user count
    if(data.length === 0){
        return res.status(404).json({message: " User Data is't found", user: []})
    }
    res.status(200).json({user: data})
})




/**
 *      @DESE GET SINGE USER 
 *      @ROUTE /api/v1/user/:id
 *      @MTEHOD GET
 *      @ACCESS PUBLIC
 */

export const get_single_user = asyncHandler( async (req, res) =>{
    // get params
    const { id } = req.params
    
    // get all user 
    const data = await User_model.findById(id);

    // check user count
    if(!data){
        return res.status(404).json({message: " User Data is't found", user: null})
    }
    res.status(200).json({user: data})
})






/**
 *      @DESE CREATE NEW USER 
 *      @ROUTE /api/v1/user/
 *      @MTEHOD PSOT
 *      @ACCESS PUBLIC
 */

export const create_user = asyncHandler( async (req, res) =>{
    const {name, username, email, password, gender, age, location, call} = req.body;

    // velidation
    if(!name || !password ){
        res.status(400).josn({message: "All fild are required"})
    }

    // password hase
    const hass_pass =await bcrypt.hash(password, 10);

    // create new user 
    const data = await User_model.create({ name, username, email, password: hass_pass, gender, age, location, call })
    
    // create jwt 
   const token = jwt.sign({name, email}, process.env.JWT_SECRET, {
    expiresIn: "10d"
   })

    // status
    res.status(200).json({message: "User create successful", user : data, token})
})






/**
 *      @DESE delete USER 
 *      @ROUTE /api/v1/user/:id
 *      @MTEHOD PSOT
 *      @ACCESS PUBLIC
 */

export const delete_user = asyncHandler( async (req, res) =>{
    const { id } = req.params;

    const data = await User_model.findByIdAndDelete(id)

    // validation data 
    if(!data){
        return res.status(404).json({message: "user data is not find", user: null})
    };

    // create status
    res.status(200).json({user: data, message: "delete done"})
})





/**
 *      @DESE update USER 
 *      @ROUTE /api/v1/user/:id
 *      @MTEHOD PUT/PATCH
 *      @ACCESS PUBLIC
 */

export const update_user = asyncHandler( async (req, res) =>{
    // get params
    const { id } = req.params;
    const { name, age, call, location } = req.body;

    // validation
    if(!id ){
        return res.status(404).json({message: "user data is not find", user: null})
    };


    // create new user 
    const data = User_model.findByIdAndUpdate( id, { name, age, call, location }, {new: true})

    // create status
    res.status(200).json({user: req.body, message: "Update data done"})
})