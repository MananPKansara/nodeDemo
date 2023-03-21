const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const nodeFetch = require('node-fetch');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const login = require('./router/login');
const register = require('./router/register');
const home = require('./router/home');
const createPost = require('./router/createPost');
const myPosts = require('./router/myPosts');
const logout = require('./router/logout');
const profile = require('./router/profile');
const updatePost = require('./router/updatePost');
const assignRole = require('./router/assignRole');

app.use('/', login);
app.use('/register', register);
app.use('/home', home);
app.use('/createPost', createPost);
app.use('/myPosts', myPosts);
app.use('/logout', logout);
app.use('/profile', profile);
app.use('/updatePost', updatePost);
app.use('/assignRole', assignRole);

app.all('*', (req, res) => {
    res.send("Page not found")
} );

app.listen(9000);

// mongosh "mongodb+srv://manan.dflg9s3.mongodb.net/myFirstDatabase" --apiVersion 1 --username Manan