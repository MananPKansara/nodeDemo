const joi = require('joi');

async function profileValidation(req, res, next)
{
    const schema = joi.object({
        username : joi.string().trim().min(3).max(20).required()
    })

    let data = {
        user : req.user,
        error : null
    }

    try{
        req.userUpdate = await schema.validateAsync(req.body);
        next()
    }catch(err){
        console.log(err.details[0].path[0]);
        switch(err.details[0].path[0])
        {
            case 'username' : 
                data.error = "Username is required and should contain 3 to 20 characters"
                res.render('./profile', { data });
                break;
            default : 
                data.error = "Something went wrong"
                res.render('./profile', { data });
        }
    }
}

module.exports = profileValidation;