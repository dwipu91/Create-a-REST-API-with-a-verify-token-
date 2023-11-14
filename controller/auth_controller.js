 import expressAsyncHandler from "express-async-handler" ;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User_model.js"

/**
 * @DESC    user loin system
 * @ROUTER /api/v1/login
 * @METHOD POST 
 * @ACCESS PIBLIC
 */
export const login_user = expressAsyncHandler( async (req,res)=>{
    // get form data 
    const { email, password } = req.body;

    //validation
    if( !email || !password ){
        return res.status(400).json({message: " All fileds are required "})
    }
    
    //  user check
    const login_user = await User.findOne({email});
    if( !login_user ){
        res.status(404).json({message: " Invalide email address! "})
    };
    
    // password check
    const password_check = bcrypt.compareSync(password, login_user.password);
    if(!password_check){
        return res.status(404).json({message: "Password is not match"})
    }


    // access token 
    const access_token = jwt.sign(
        {email: login_user.email}, 
        process.env.JWT_SECRET, 
        {
            expiresIn: "1d"    
        }
    );
     
    // set token in cookie memory 
    res.cookie( 
        "access_token",
        access_token,
        {
            httpOnly: true,
            secure: false
        }
    );

    res.status(200).json({
        message: `Hello ${login_user.name}, you are log In on SERVER,`,
        user: login_user,
        token : process.env.APP_ENV === "Development" ? false  :  true,
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
})



/**
 * @DESC    user log out system
 * @ROUTER /api/v1/logout
 * @METHOD POST
 * @ACCESS PIBLIC
 */
export const logout_user =  expressAsyncHandler ( async (req, res) =>  {     
    res.clearCookie("access_token")
    res.status(200).json({message: "you are now log out"})
 })