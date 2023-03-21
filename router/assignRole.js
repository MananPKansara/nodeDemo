const express = require('express');
const router = express.Router();

const User = require('./../model/model');

router.get('/', async (req, res) => {
    let users = await User.find({role : 'user'});
    res.render('./assignRole', {users})
    console.log(users);
});

router.put('/', async (req, res) => {
    console.log("Ave che");
    let user = await User.updateOne({ _id : req.body.id},{$set : {role : 'admin'}});
    res.send({message : "Assigned to admin"})
})
module.exports = router;