const express = require('express');
const isLoggedIn = require('../controller/isLoggedIn');
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.clearCookie('jwt');
    res.redirect('./../');
});

module.exports = router;