const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const isLoggedIn = require('./../controller/isLoggedIn');
const profileValidation = require('./../controller/profileValidation');
const profileFileUpload = require('./../controller/profileFileUpload');
const profileSave = require('./../controller/db/profileSave');

router.get('/', isLoggedIn, (req, res) => {
    let data = {
        user : req.user,
        error : null
    }
    res.render('./profile', { data });
})

router.post('/', isLoggedIn, multer().single('image') ,  profileValidation, profileFileUpload, profileSave)

module.exports = router;


// nice Manan loves DP