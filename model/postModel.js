const mongoose = require('mongoose');
const postSchema = require('./postSchema');

let Post = mongoose.model('post', postSchema);

module.exports = Post;