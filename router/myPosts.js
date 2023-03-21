const express = require('express');
const isLoggedIn = require('./../controller/isLoggedIn');
const router = express.Router();
const multer = require('multer');

const Post = require('./../model/postModel');
const ObjectId = require('mongoose').Types.ObjectId;

const homeValidation = require('./../controller/homeValidation');
const homeFileUpload = require('./../controller/homeFileUpload');
const homeSave = require('./../controller/db/homeSave');

router.get('/', isLoggedIn, async (req, res) => {
    let author = new ObjectId(req.user._id);
    let myPosts = await Post.find({author}).populate('author');
    let data = {
        posts : myPosts,
        user : req.user
    }
    res.render('myPosts', {data});
});

router.post('/', isLoggedIn, multer().single('image'), homeValidation, homeFileUpload, homeSave);

router.delete('/', async (req, res) => {
    let post = await Post.deleteOne({ _id : req.body.id });
    res.send({message : "Deleted successfully"});
});

module.exports = router;