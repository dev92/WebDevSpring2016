"use strict";

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;


module.exports = function(app, model) {

    var auth = authorized;

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.get   ('/api/assignment/loggedin',  loggedin);


    app.get("/api/assignment/user", auth ,FindUser);
    app.get("/api/assignment/user/:id",auth ,FindById);
    app.put("/api/assignment/user/:id",auth,UpdateUser);
    app.delete("/api/assignment/user/:id",auth, DeleteUser);
    app.post("/api/assignment/user", auth, CreateUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }



    function CreateUser(req,res){
        model.Create(req.body)
            .then(function(response){
                res.json(response);
            })


    }

    function FindUser(req,res){


        var username = req.param("username");
        var password = req.param("password");

        if(typeof username === 'undefined' && typeof password === 'undefined'){

            model.FindAll()
                .then(function(response){
                   res.json(response);
                });

        }
        else if(username != null && password != null){
            var credentials = {
                username : username,
                password : password
            };

            model.FindUserByCredentials(credentials)
                .then(function (response) {
                    res.json(response);
                });

        }
        else if(username != null){

            model.FindUserByUsername(username)
                .then(function (response) {
                    res.json(response);
                });

        }
    }

    function FindById(req,res){

        model.FindById(req.params.id)
            .then(function(response){
                res.json(response);
            })

    }

    function UpdateUser(req,res){

        model.Update(req.params.id, req.body)
            .then(function(response){
                res.json(response);
            })

    }

    function DeleteUser(req, res){

        model.Delete(req.params.id)
            .then(function(response){
               res.json(response);
            });
    }


    function isAdmin(user) {

        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }




}
