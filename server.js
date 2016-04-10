var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session  = require('express-session');
var mongoose = require("mongoose");
var connectionStringAssignment = 'mongodb://127.0.0.1:27017/FormMaker';
var connectionStringProject = 'mongodb://127.0.0.1:27017/CinePhilia';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionStringAssignment = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;

    connectionStringProject = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        'cinephilia';
}
var dbAssignment = mongoose.createConnection(connectionStringAssignment);
var dbProject = mongoose.createConnection(connectionStringProject);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


//console.log(process.env.SESSION_SECRET);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


require("./public/assignment/server/app.js")(app,mongoose,dbAssignment);
require("./public/project/server/app.js")(app,mongoose,dbProject);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;



app.listen(port, ipaddress);
