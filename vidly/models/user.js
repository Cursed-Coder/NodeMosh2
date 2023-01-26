const mongoose=require("mongoose")
const Joi=require("joi")

const schema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:255
    },
    email:{
        type:String,
        minLength:10,
        maxLength:1024,
        unique:true
    },
    password:{
        type:String,
        minLength:5,
        maxLength:1024
    }
})
const User=mongoose.model("User",schema)

function validateUser(user){
    const schema={
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(10).max(1024).required().email(),
        password:Joi.string().min(5).max(1024)
    }
    return Joi.validate(user,schema)

}

exports.User=User
exports.validateUser=validateUser