const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {User} = require('../db/db')
const {Account} = require('../db/db')
const {JWT_SECRET} = require('../config')
const authMiddleware = require('../middlewares/middleware')
const jwt = require('jsonwebtoken')
const zod = require('zod')

router.get('/balance' ,authMiddleware ,async  (req , res)=>{
    // this authMiddleware gives me the _id  of the user which will be userId for account 
    // associated to that user
    try 
    {   
        const username = req.username ;
        const user = await User.findOne({username : username});
        const id = user._id;
        
        const account = await Account.findOne({userId : id});

        return res.status(200).json({
            balance : account.balance
        })
    }
    catch(err){
        return res.status(401).json({
            message : "Could not fetch account balance"
        })
    }
})

router.post('/transfer' ,authMiddleware,async (req , res)=>{

    
    try{
        const session = await mongoose.startSession();
        await session.startTransaction();


        const username = req.username ;
        const user = await User.findOne({username : username}).session(session);
        const senderId = user._id;
        // fetching the account os user
        const account = await Account.findOne({userId : senderId}).session(session);

        const amount = req.body.amount ;
        const reciverId = req.body.to;
        // these senderId , reciverId are userId from accounts collection

        if(account.balance < amount){
            return res.status(400).json({
                message : "Insufficient balance"
            })
        }
        const reciver = Account.findOne({
            userId  : reciverId
        }).session(session);

        if(!reciver) {
            return res.status(400).json({
                message : "Invalid account"
            })
        }
        await Account.updateOne({
            userId : senderId
        } , {
            $inc : {balance : -amount}
        }).session(session);

        await Account.updateOne({
            userId : reciverId
        } , {
            $inc : {balance : amount}
        }).session(session);

        await session.commitTransaction();

        return res.status(200).json({
            message: "Transfer successful"
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message : "Cannot do transaction"
        })
    }

})

module.exports = router
