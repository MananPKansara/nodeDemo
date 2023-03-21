const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const User = require('./../model/model');

const isLoggedIn = require('./../controller/isLoggedIn');
const getAllPosts = require('./../controller/getAllPosts');
const commentPost = require('./../controller/commentPost');
const deleteComment = require('./../controller/deleteComment');
const updateComment = require('./../controller/updateComment');
// const homeValidation = require('./../controller/homeValidation');
// const homeFileUpload = require('./../controller/homeFileUpload');
// const homeSave = require('./../controller/db/homeSave');

router.get('/', isLoggedIn, async (req, res) => { 
    let posts = await getAllPosts(req.user._id);
    let user = await User.findById(req.user._id);
    console.log(user);
    let data = {
        posts : posts,
        user : req.user
    }
    res.render('home', {data});
});

router.post('/', isLoggedIn, commentPost);

router.put('/', isLoggedIn, updateComment );

router.delete('/', isLoggedIn, deleteComment)
module.exports = router;
