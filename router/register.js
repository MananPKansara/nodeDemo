const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const registerValidation = require('./../controller/registerValidation');
const registerFileUpload = require('./../controller/registerFileUpload');
const registerUser = require('./../controller/db/registerUser');
const tokenCheck = require('./../controller/loginCheck');

router.get('/', (req, res) => {
    res.render('./register', { error : null });
})

router.post('/', multer().single('image') , registerValidation, registerFileUpload, registerUser)

module.exports = router;