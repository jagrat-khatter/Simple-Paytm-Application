const express = require('express');
const jwt = require('jsonwebtoken')
const zod = require('zod')
const router = express.Router();
const {User} = require('../db/db')
const {Account} = require('../db/db')
const {JWT_SECRET} = require('../config')
const authMiddleware = require('../middlewares/middleware')

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
// f you have removed .nonempty() from your Zod schema fields, then only the type and length 
// constraints will be enforced.
// but to make things optional
const updateSchema = zod.object({
    password : zod.string().min(3).optional() ,
    firstName : zod.string().trim().max(50).optional(),
    lastName : zod.string().trim().max(50).optional()
})
// if none of things come then 

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
        const newUser = await User.create(body);
        const newUserId = newUser._id ;
        await Account.create({
            userId : newUserId ,
            balance : Math.floor(Math.random()*10000)
        })
        
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

router.put('/' ,authMiddleware , async (req , res)=>{
    try
    {   const username = req.username ;
        const body = req.body;
        const response = updateSchema.safeParse(body);
        if(! response.success){
            throw new Error ("Zod verification failed")
        }
        
        await User.updateOne({username : username} , body);

        return res.status(200).json({
            message: "Updated successfully"
        });
    }
    catch(err){
        console.log(err) ;
        if(err.message === 'Zod verification failed') {
            return res.status(411).json({
            message: "Zod verification failed"
        })
        }
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

})
router.get('/bulk' , async (req , res)=>{
    try{   const param  = req.query.filter || "";

        const data = await User.find({$or :[ // this find fetches through all the data 
            {firstName : new RegExp(param , 'i')} ,
            {lastName : new RegExp(param , 'i')}
        ]})


        
        return res.status(200).json({
            users : data.map(x =>({
                _id : x._id,
                username : x.username ,
                lastName : x.lastName ,
                firstName : x.firstName
            }))
        });
    }
    catch(err){
        return res.status(401).json({
            message : "There is something up withour servers"
        })
    }

})

module.exports = router
// User.findOne({ username: username, password: password })
// it finds a user where both username and password match (logical AND). And when you do:
// User.find({
//   $and: [
//     { username: username },
//     { password: password }
//   ]
// })
// can also use $or with $and
// it also finds users where both username and password match (logical AND)
// will return an array of all users matching both conditions (could be multiple, though in a 
// well-designed system usernames should be unique).
