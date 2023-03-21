const joi = require('joi');


async function homeValidation(req, res, next)
{
    req.body.postid = req.params.id
    let schema = joi.object({
        title : joi.string().trim().required().min(3).max(40),
        content : joi.string().trim().required().min(5).max(1000),
        postid : joi.string().required(),
    })
    
    try{
        req.post = await schema.validateAsync(req.body);
        next()
    }catch(err){
        switch(err.details[0].path[0])
        {
            case 'title' :
                res.send({error : "Title is requires and must have at least 3 character"});
                break;
            case 'content' :
                res.send({error : "Content is requires and must have at least 3 character"});
                break;
            default : 
                res.send({error : "Something went wrong"});
        }   
    }
}

module.exports = homeValidation;