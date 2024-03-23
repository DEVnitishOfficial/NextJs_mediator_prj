import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"please provide a user Name"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide a password"]
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User