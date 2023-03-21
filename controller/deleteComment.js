const Post = require('./../model/postModel');
const ObjectId = require('mongoose').Types.ObjectId;

async function deleteComment(req, res, next)
{
    let postId = new ObjectId(req.body.postId);
    let post = await Post.findById(postId);
    console.log(req.body);
    let commentIndex = post.comments.findIndex((elem) => elem._id == req.body.commentId);
    post.comments.splice(commentIndex, 1);
    await post.save({timestamps : false});
    res.send({message : "Comment deleted successfully"})
}

module.exports = deleteComment;