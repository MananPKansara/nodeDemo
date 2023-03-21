require('dotenv').config();
const jwt = require('jsonwebtoken');

function tokenCheck(req, res, next)
{
    let token = req.cookies.jwt;
    if(req.cookies.jwt)
    {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) 
            {
                next();
            }
            if(user)
            {
                res.redirect('./../home')
            }
        })
    }else{
        next();
    }
}

module.exports = tokenCheck;