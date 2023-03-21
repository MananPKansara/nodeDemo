const express = require('express');
const joi = require('joi');

async function registerValidation(req, res, next)
{
    let schema = joi.object({
        username : joi.string().alphanum().trim().required().min(3).max(20),
        email : joi.string().required().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
        password : joi.string().required().min(3).max(20)
        // .pattern(new RegExp(`/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/`))
    })

    try{
        req.validate = await schema.validateAsync(req.body);
    }catch(err){
        if(err instanceof joi.ValidationError)
        {
            switch(err.details[0].path[0])
            {
                case 'username' : 
                res.render('./register', { error : "Username is required and between 3 to 20 characters" });
                break;
                case 'email' : 
                res.render('./register', { error : "Email is required and should be valid"});
                break;
                case 'password' : 
                res.render('./register', { error : "Paaword is required and between 3 to 20 characters"});
                break;
                default : 
                res.render('./register', { error : "Something went wrong"});
            }
        }
        else
        {
            res.send(err);
        }
    }
    next();
}

module.exports = registerValidation;