const express = require('express');
const multer = require('multer');
const isLoggedIn = require('./../controller/isLoggedIn');
const router = express.Router();

const updateValidate = require('./../controller/updateValidate');
const homeValidation = require('./../controller/homeValidation');
const homeFileUpload = require('./../controller/homeFileUpload');
const homeSave = require('./../controller/db/homeSave');

router.get('/:id', isLoggedIn, updateValidate, (req, res) => {
    let data = {
        post : req.validate,
        error : null
    }
    res.render('./updatepost', {data}); 
});

router.put('/updatePost/:id', isLoggedIn, updateValidate, multer().single('image'), homeValidation, homeFileUpload, homeSave, (req, res) => {
    console.log("Ave che");
    console.log(req.body);
})

module.exports = router;