import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const verify_token  = (req, res, next)  =>  {
    // check tookies
    const {access_token} = req.cookies;
    console.log(access_token);

    // check
    if(!access_token){
        return res.status(401).json({message: "Unathoriesd"})
    }

    // token verify
    jwt.verify(access_token, process.env.JWT_SECRET, asyncHandler( async (error, decode) => {
        if(error){
            return res.status(400).json({message: "Invalid token"});
        }
        next();
     }))
}

// export defolt 