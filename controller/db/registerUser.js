const User = require('./../../model/model');

async function registerUser(req, res, next)
{
    let obj = new User(req.validate);
    try{
        await obj.save();
        res.clearCookie('jwt');
        res.redirect('./../../')
    }catch(err){
        if(err.code == 11000)
        {
            let field = Object.keys(err.keyValue)[0];
            res.render('./register', { error : `${field} already exist` });
        }
        else
        {
            res.render('./register', { error : `Something went wrong` });
        }

    }
    next();
}

module.exports = registerUser;