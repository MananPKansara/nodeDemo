const User = require('./../../model/model');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

async function profileSave(req, res, next)
{
    let user = await User.findOne({_id : req.user._id});
    console.log("User from database");
    console.log(user);

    if(req.userUpdate.image)
    {
        fs.unlinkSync(path.join(__dirname + './../../uploads', user.image));
    }
    else
    {
        req.userUpdate.image = user.image;
    }

    try{
        await User.updateOne({_id : req.user._id}, { $set : { username : req.userUpdate.username, image : req.userUpdate.image } });
        let user = req.user;
        user.username = req.userUpdate.username;
        user.image = req.userUpdate.image;
        req.user = user;
        let token = jwt.sign({ _id : user._id , username : user.username, email : user.email, image : user.image, role : user.role}, process.env.SECRET_KEY, { expiresIn : '1h' });
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('./../../');
    }catch(err){
        let data = {
            user : req.user,
            error : null
        }
        if(err.code == 11000)
        {
            let field = Object.keys(err.keyValue)[0];
            data.error = `${field} already exist`
            res.render('./profile', { data });
        }
        else
        {
            data.error = `Something went wrong`
            res.render('./profile', { data });

        }
        res.render('./profile', { error : "Profile does not updated due to some reason" });
    }    
}

module.exports = profileSave;