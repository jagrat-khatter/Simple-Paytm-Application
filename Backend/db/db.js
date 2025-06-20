const mongoose = require('mongoose');
const {db_string} = require('../config')

mongoose.connect(db_string);

const schema1 = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true ,
        lowercase : true ,
        minlength : 3,
        maxlength : 30
    } ,
    password : {
        type : String ,
        required : true ,
        minlength : 3
    } , 
    firstName : {
        type : String ,
        required : true,
        trim : true,
        maxlength : 50
    },
    lastname : {
        type : String ,
        required : true ,
        trim : true ,
        maxlength : 50
    }
})

const User = mongoose.model('User' , schema1);

module.exports ={
    User
}

type: String
// The field must be a string.

// required: true
// The field must be present (cannot be missing or undefined).

// unique: true
// No two documents in the collection can have the same value for this field (enforces uniqueness).

// trim: true
// Removes leading and trailing whitespace from the string before saving.

// lowercase: true
// Converts the string to lowercase before saving.

// minlength: 3
// The string must be at least 3 characters long.

// maxlength: 30
// The string cannot be longer than 30 characters.

// So, these conditions both validate the data and transform it (like trimming and lowercasing)  
// before saving to the database.