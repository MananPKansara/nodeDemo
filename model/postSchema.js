const mongoose = require('mongoose');
require('./../controller/db/connection');

const commentsSchema = require('./commentsSchema');

let postSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'user'
    },
    title : {
        type: String,
        trim : true,
        required : true,
        minlength : 3,
        maxlength : 40
    },
    image : {
        type : String,
        required : true
    },
    content : {
        type: String,
        trim : true,
        required : true,
        minlength : 5,
        maxlength : 1000
    }, 
    updatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        default : function() {
            return this.author;
        }
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    deletedAt : {
        type : Date,
        default : undefined
    },
    deletedBy : {
        type : String,
        default : undefined
    },
    comments : [commentsSchema]
}, { timestamps : true })


module.exports = postSchema;