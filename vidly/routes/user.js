const { validateUser, User } = require("../models/user");
const _=require("lodash")
const router=require("express").Router();
const bcrypt=require("bcrypt")


router.get("/",async(req,res)=>{

})

router.get("/",async(req,res)=>{
    
})
router.post("/",async(req,res)=>{

    let user=await User.findOne({email:req.body.email})
    if(user){
        console.log(user)
        return res.status(400).send("User with email id already exists")
    }
    const {error}=validateUser(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    user=new User(_.pick(req.body,['name','email','password']))
    user.password=hashedPassword
    await user.save()
    res.send(user)

    
})
router.put("/",async(req,res)=>{
    
})
router.delete("/",async(req,res)=>{
    
})
exports.userRouter=router