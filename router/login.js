const express = require('express');
const router = express.Router();
const path = require('path');

const tokenCheck = require('./../controller/tokenCheck');
const loginCheck = require('./../controller/loginCheck');

router.get('/', tokenCheck, (req, res) => {
    res.render('login', { error : null } )
})

router.post('/', loginCheck);

module.exports = router;