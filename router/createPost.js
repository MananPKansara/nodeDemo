const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const isLoggedIn = require('../controller/isLoggedIn');
const postValidation = require('./../controller/postValidation'); 
const postFileUpload = require('./../controller/postFileUpload');
const postSave = require('./../controller/db/postSave');

router.get('/', isLoggedIn, (req, res) => {
    res.render('./createPost', {error : null })
})

router.post('/', isLoggedIn, multer().single('image'), postValidation, postFileUpload, postSave)

module.exports = router;