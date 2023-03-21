const mongoose = require('mongoose');

let commentsSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    content : {
        type : String,
        require : true
    }
}, { timestamps : {
    createdAt : 'createdAt'
} })

module.exports = commentsSchema;