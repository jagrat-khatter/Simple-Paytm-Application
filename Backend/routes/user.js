const express = require('express');
const jwt = require('jsonwebtoken')
const zod = require('zod')
const router = express.Router();
const {User} = require('../db/db')
const {JWT_SECRET} = require('../config')

const signupSchema = zod.object({
    username : zod.string().min(3).max(30).nonempty().trim().toLowerCase() ,
    password : zod.string().min(3).nonempty() ,
    firstName : zod.string().nonempty().trim().max(50),
    lastName : zod.string().nonempty().trim().max(50)
})
const signinSchema = zod.object({
    username : zod.string().min(3).max(30).nonempty().trim().toLowerCase() ,
    password : zod.string().min(3).nonempty() 
})

router.post('/signup' , async (req , res)=>{
    try {   
        const body = req.body;

        const response = signupSchema.safeParse(body);
        
        if(! response.success){
            throw new Error ("Zod verification failed ")
        }
        const username = body.username ;
        const user = await User.findOne({ username: username });
        if(user){
            throw new Error ("User already exists")
        }
        await User.create(body);
        
        return res.status(200).json({
            message : "User created successfully"
        })
    }
    catch(err){
        console.log(err) ;
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    
})
router.post('/signin' , async (req , res)=>{
    try{
        const body = req.body ;
        const response = signinSchema.safeParse(body);

        if(! response.success){
            throw new Error ("Zod verification failed ")
        }
        const user = await User.findOne({ username: body.username });
        if(!user){
            throw new Error ("User does not exist")
        }
        if(user.password === body.password){
            const token = jwt.sign( {username : body.username}, JWT_SECRET , {expiresIn :'2h'})

            return res.status(200).json({
                token : token 
            })
        }
        else throw new Error ("password not correct")
    }
    catch(err){
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }
    
})

module.exports = router