const multer = require('multer');
const Post = require("./../../model/postModel");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function homeSave(req, res, next)
{
    let postid = req.post.postid;

    let data = await Post.findOne({_id : req.post.postid});
    console.log(data);

    if(req.post.image==undefined)
    {
        req.post.image = data.image;
    }
    else{
        fs.unlinkSync(path.join(__dirname + './../../postUploads', data.image));
        console.log("deleted");
    }
    console.log("User id " + req.user._id);
    req.post.updatedBy = req.user._id;
    console.log(req.post);

    try{
        await Post.updateOne({_id : data._id}, req.post);
    }catch(err){
        res.send({error : "Something went wrong"});
    }
    res.send({error : null});
}

module.exports = homeSave;