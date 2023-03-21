const jwt = require('jsonwebtoken');
require('dotenv').config();

function isLoggedIn(req, res, next) {
    const array = req.headers['cookie'].split('; ');
    let token;
    for (let elem of array) {
        if (elem.slice(0, 4) == 'jwt=') {
            token = elem.slice(4);
        }
    }

    if (token == undefined) {
        return res.redirect('./../');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.redirect('./../');
        if (user)
        req.user = { _id : user._id, username : user.username, email : user.email, image : user.image, role : user.role};
    });
    console.log( "Username is " + req.user.username + " and id is " + req.user._id);
    next();
}

module.exports = isLoggedIn;