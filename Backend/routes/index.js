const express = require('express');
const router = express.Router();
const { User } = require('../db/db');

const userRouter = require('./user')
const accountRouter = require('./account');


router.use('/user' , userRouter) ;
router.use('/account' , accountRouter) ;

module.exports = router