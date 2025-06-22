import mongoose , {Schema , Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String, // remember Captial S
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    messages:Message[],
    isVerified:boolean
}

const UserSchema: Schema<User> = new Schema({
    email:{
        type:String,
        required:[true , "Email Id is required"],
        unique:true,
         match:[/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
 , 'please enter a valid email'],
    },
    username:{
        type:String,
        required:[true , "Username is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true , "Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true , "verifyCode is required"],
    },
    verifyCodeExpiry:{
         type:Date,
        required:[true , "verifyCodeExpiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
    
  
})

const UserModel = (mongoose.models.User as mongoose.Model<User> )
|| (mongoose.model<User>("User" , UserSchema))

export default UserModel


/*
Same in JS
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email Id is required"],
        unique: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = UserModel;
*/