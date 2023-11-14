import mongoose from "mongoose";


const user_Schema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        // minLength: 3,
        // maxLength: 20
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
        //required: [true, "username is required"],
    },
    age: {
        type: Number,
        trim: true,
        min: 10,
        max: 100,
        default: null
    },
    call: {
        type: String,
        trim: true,
        unique: true
    },
    location: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    gender: {
        type:String,
        enum: ["Male", "Female", "Custom"]
    },
    email: {
        type: String,
        trim: true,
        //required: true,
    },
    password: {
        type: String,
        trim: true,
        //required: true,
    },
    photo: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: true
    },
    trash:{
        type: String,
        default: false
    }
}, 
{
    timestamps : true
})


// create user model
export default mongoose.model("User", user_Schema)