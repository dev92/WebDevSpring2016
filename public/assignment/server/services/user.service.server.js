"use strict";

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;


module.exports = function(app, userModel) {

    var auth = authorized;

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.get   ('/api/assignment/loggedin',  loggedin);


    app.get("/api/assignment/user", auth ,FindAllUsers);
    //app.get("/api/assignment/user/:id",auth ,FindById);
    app.put("/api/assignment/user/:id",auth,UpdateUser);
    app.delete("/api/assignment/user/:id",auth, DeleteUser);
    app.post("/api/assignment/user", auth, CreateUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .FindUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {

                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .FindById(user._id)
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
        if(newUser.hasOwnProperty("roles")){
            newUser.roles.push('student');
        }else{
            newUser.roles = ['student'];
        }


        userModel
            .FindUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.Create(newUser);
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



    //function CreateUser(req,res){
    //    model.Create(req.body)
    //        .then(function(response){
    //            res.json(response);
    //        })
    //
    //
    //}

    function FindAllUsers(req,res){

        if(isAdmin(req.user)) {

            userModel
                .FindAll()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403).send("Unautorized access!");
        }
    }

    //function FindById(req,res){
    //
    //    model.FindById(req.params.id)
    //        .then(function(response){
    //            res.json(response);
    //        })
    //
    //}

    function DeleteUser(req, res) {

        if(isAdmin(req.user)) {

            userModel
                .Delete(req.params.id)
                .then(
                    function(user){
                        return userModel.FindAll();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
            } else {
                res.status(403);
            }
    }

    function UpdateUser(req, res) {

        var newUser = req.body;
        //console.log(req.user);

        //if(!isAdmin(req.user)) {
        //    delete newUser.roles;
        //}
        //if(typeof newUser.roles == "string") {
        //    newUser.roles = newUser.roles.split(",");
        //}

        userModel
            .Update(req.params.id, newUser)
            .then(
                function(user){
                    if(!isAdmin(req.user)){
                        return user;
                    }else{
                        return userModel.FindAll();
                    }

                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function CreateUser(req, res) {

        var newUser = req.body;

        if(newUser.roles == null || newUser.roles.length < 1) {
            newUser.roles.push("student");
        }

        // first check if a user already exists with the username
        userModel
            .FindUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.Create(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.FindAll();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.FindAll();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }


    function isAdmin(user) {

        if(user.roles.indexOf("admin") > -1) {
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
