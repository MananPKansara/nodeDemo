const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('./../controller/db/connection');
const ObjectId = mongoose.Types.ObjectId;

let schema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        match : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique : true
    },
    image : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'user',
        enum : ['user', 'admin']
    }
}, { timestamps : true })

schema.pre('save', function() {
    const salt = bcrypt.genSaltSync(10); // Here, the number 10 is the work factor, which determines the number of rounds used to hash the password.
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
})

module.exports = schema;