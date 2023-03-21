const Post = require('./../model/postModel')

async function updateValidate(req, res, next)
{
    req.validate = await Post.findOne( { _id : req.params.id } );

    // user and admincan only update his post and   
    if(req.validate.author == req.user._id || req.user.role == 'admin' )
    {
        next()
    }else{
        res.redirect('./../../')
    }
}

module.exports = updateValidate;