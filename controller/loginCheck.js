const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fetch = require('node-fetch');

const User = require('./../model/model');

app.use(express.urlencoded({ extended: true }));

async function loginCheck(req, res, next) {

    let { username, password } = req.body;


    let user;
    try{
        user = await User.findOne({ username });
    }catch(err){
        res.render('login', { error : "Something went wrong!" } )
    }

    if(!user)
    {
        res.render('login', { error : "User does not exist" } )
    }else{
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.render('login', { error : "Something went wrong!" } )
            } 
            else if (result) 
            {
                let token = jwt.sign({ _id : user._id , username : user.username, email : user.email, image : user.image, role : user.role}, process.env.SECRET_KEY, { expiresIn : '1h' });
                res.cookie('jwt', token, { httpOnly: true });
                res.redirect("./../home");
            } 
            else 
            {
                res.render('login', { error : "Wrong password" } )
            }
        });
    }



}

module.exports = loginCheck;