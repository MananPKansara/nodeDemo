const mongoose = require('mongoose');
const Post = require('./../../model/postModel');
const path = require('path');

async function postSave(req, res, next)
{
    req.post.author = req.user._id;

    let post = new Post(req.post);
    try{
        await post.save();
        res.redirect('./../../')

    }catch(err){
        res.render('./createPost', {error : 'Something went wrong' });
    }
}

module.exports = postSave;