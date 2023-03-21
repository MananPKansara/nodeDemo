const joi = require('joi');

async function validatePost(req, res , next)
{

    console.log(req.body);
    let schema = joi.object({
        title : joi.string().trim().required().min(3).max(40),
        content : joi.string().trim().required().min(5).max(1000),
    })

    try{
        req.post = await schema.validateAsync(req.body);
    }catch(err){
        console.log(err);
        switch(err.details[0].path[0])
        {
            case 'title' :
                res.render('./createPost', {error : 'Title is required and must have at least 3 character' });
                break;
            case 'content' :
                res.render('./createPost', {error : 'Conent is required and must have at least 5 character' });
                break;
            default : 
                res.render('./createPost', {error : 'Something went wrong' });
        }
    }
    next();   
}

module.exports = validatePost;