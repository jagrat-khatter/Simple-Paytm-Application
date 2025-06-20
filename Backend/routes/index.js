const express = require('express');
const router = express.Router();
const { User } = require('../db/db');

const userRouter = require('./user')



router.use('/user' , userRouter) ;

module.export = router