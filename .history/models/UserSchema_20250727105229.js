import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
      name: String,
       email: {
        type: String,
        uniqe:true
       } ,

        password: {
        type: String,
      
       } ,

       role : {
        type:String,
        default:"user"
       }
})