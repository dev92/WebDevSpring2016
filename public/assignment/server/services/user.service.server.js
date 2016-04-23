"use strict";

//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;


module.exports = function(app, asgmtuserModel) {

    var auth = authorized;
    var isAdmin = isAdmin;
    //passport.use(new LocalStrategy(assignmentStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    //app.post  ('/api/assignment/login', passport.authenticate('assignment'), login);
    //app.post  ('/api/assignment/logout',         logout);
    //app.post  ('/api/assignment/register',       register);
    //app.get   ('/api/assignment/loggedin',  loggedin);

    app.get("/api/assignment/user/:id",auth ,FindById);
    app.get("/api/assignment/admin/user", isAdmin ,FindAllUsers);
    app.get("/api/assignment/admin/user/:id",isAdmin ,AdminFindById);
    app.put("/api/assignment/user/:id",auth,UpdateUser);
    app.delete("/api/assignment/admin/user/:id",isAdmin, DeleteUser);
    app.post("/api/assignment/admin/user", isAdmin, CreateUser);
    app.put("/api/assignment/admin/user/:id",isAdmin,UpdateUserByAdmin);



    //function assignmentStrategy(username, password, done) {
    //    userModel
    //        .FindUserByCredentials({username: username, password: password})
    //        .then(
    //            function(user) {
    //                if (!user) {
    //
    //                    return done(null, false);
    //                }
    //                return done(null, user);
    //            },
    //            function(err) {
    //                if (err) {
    //                    return done(err);
    //                }
    //            }
    //        );
    //}
    //
    //function serializeUser(user, done) {
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done) {
    //    userModel
    //        .FindById(user._id)
    //        .then(
    //            function(user){
    //                done(null, user);
    //            },
    //            function(err){
    //                done(err, null);
    //            }
    //        );
    //}

    //function login(req, res) {
    //    var user = req.user;
    //    res.json(user);
    //}

    //function loggedin(req, res) {
    //    res.send(req.isAuthenticated() ? req.user : '0');
    //}
    //
    //function logout(req, res) {
    //    req.logOut();
    //    res.send(200);
    //}
    //
    //function register(req, res) {
    //
    //    var newUser = req.body;
    //    if(newUser.hasOwnProperty("roles")){
    //        newUser.roles.push('student');
    //    }else{
    //        newUser.roles = ['student'];
    //    }
    //
    //
    //    userModel
    //        .FindUserByUsername(newUser.username)
    //        .then(
    //            function(user){
    //                if(user) {
    //                    res.json(null);
    //                } else {
    //                    return userModel.Create(newUser);
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(user){
    //                if(user){
    //                    req.login(user, function(err) {
    //                        if(err) {
    //                            res.status(400).send(err);
    //                        } else {
    //                            res.json(user);
    //                        }
    //                    });
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        );
    //}



    function FindAllUsers(req,res){

            asgmtuserModel
                .FindAll()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
    }


    function AdminFindById(req,res){
        asgmtuserModel
            .FindById(req.params.id)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function FindById(req,res){
        asgmtuserModel
            .FindById(req.params.id)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function DeleteUser(req, res) {

        asgmtuserModel
                .Delete(req.params.id)
                .then(
                    function(user){
                        return asgmtuserModel.FindAll();
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

    function UpdateUser(req, res) {

        var newUser = req.body;

        asgmtuserModel
            .Update(req.params.id, newUser)
                .then(function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function UpdateUserByAdmin(req, res) {

        var newUser = req.body;

        asgmtuserModel
            .Update(req.params.id, newUser)
            .then(
                function(user){
                        return asgmtuserModel.FindAll();
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

        if(!newUser.hasOwnProperty("roles")){
            newUser.roles = ['student'];
        }

        //else if(newUser.roles == null || newUser.roles.length < 1) {
        //    newUser.roles.push("student");
        //}

        // first check if a user already exists with the username
        asgmtuserModel
            .FindUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return asgmtuserModel.Create(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return asgmtuserModel.FindAll();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return  asgmtuserModel.FindAll();
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


    function isAdmin(req,res,next) {

        if(req.user.roles.indexOf("admin") > -1 && req.isAuthenticated() ) {
            next()
        }else{
            res.status(403).send("Authentication failed!");
        }
        //return false;
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Authentication failed!");
        } else {
            next();
        }
    }




}
