const Post = require('./../model/postModel');
const ObjectId = require('mongoose').Types.ObjectId;

async function updateComment(req, res, next)
{

    let postId = new ObjectId(req.body.postId);
    let post = await Post.findById(postId);
    let comment = post.comments.find((elem) => elem._id == req.body.commentId);
    comment.content = req.body.commentContent;
    await post.save({timestamps : false});
    res.send({message : "Updated successfully"})
}

module.exports = updateComment;