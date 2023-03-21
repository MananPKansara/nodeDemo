const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('./../model/postModel');


async function getAllPosts(userid)
{
    let userId = new ObjectId(userid);
    try{
        let posts = await Post.find({"author" : {$ne : userId}}).populate('author').populate('comments.author');
        return posts;
    }catch(err){
        console.log(err);
    }
}

module.exports = getAllPosts;