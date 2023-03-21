const fetch = require('node-fetch');
const Post = require('./../model/postModel');
const ObjectId = require('mongoose').Types.ObjectId;

async function commentPost(req, res, next)
{
    console.log(req.body);
    if(req.body.comment)
    {
        // author
        req.body.userid = new ObjectId(req.user._id);

        //postid 
        let postid = req.body.postId;
        console.log(postid);
        
        let commentObj = {
            author : req.body.userid,
            content : req.body.comment
        }
        const post = await Post.findById(postid);
        console.log(req.body);
        post.comments.push(commentObj);
        await post.save({timestamps : false});
        res.send({message : "Post saved"})
    }
}

module.exports = commentPost;