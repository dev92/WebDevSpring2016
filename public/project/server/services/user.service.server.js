"use strict";

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");
//var fs = require("fs");

module.exports = function(app, userModel, movieModel,eventModel) {

    var auth = authorized;

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../uploads' });

    app.post  ('/api/project/login', passport.authenticate('local'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.get   ('/api/project/loggedin',  loggedin);

    app.get("/api/project/admin/user",auth,FindAll);
    app.get("/api/project/user/:id",auth,FindById);
    app.get("/api/project/user/:id/movie",auth,FindUserLikedMovies);
    app.get("/api/project/user/:id/review",auth,FindUserReviewedMovies);
    app.get("/api/project/user/:id/friends",auth,FindFriendsByIds);
    app.get("/api/project/user/:id/requests",auth,FindRequestsByIds);
    app.post("/api/project/user/:id/friend/:friendId",auth,UserAddsFriend);
    app.post("/api/project/user/:id/request/:friendId",auth,UserGetsFriendRequest);
    app.delete("/api/project/user/:id/friend/:friendId",auth,DeleteFriend);
    app.delete("/api/project/user/:id/request/:friendId",auth,DeleteFriendRequest);
    app.put("/api/project/user/:id",auth,UpdateUser);
    //app.post("/api/project/user/:id/likes/:imdbId",auth,UserLikesMovie);
    app.post("/api/project/user/:id/rates",auth,UserRatesMovie);
    //app.post("/api/project/user/:id/review",auth,UserReviewsMovie);
    //app.delete("/api/project/user/:id/dislikes/:imdbId", auth, userDislikesMovie);
    app.delete("/api/project/admin/user/:id", auth, DeleteUser);
    app.post("/api/project/admin/user",auth,CreateUser);
    app.post("/api/project/upload", upload.single('myAvatar'), auth, uploadImage);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        //console.log(username,password);
        userModel
            .FindUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        bcrypt.compare(password, user.password, function (err, res) {
                            if (res) {
                                return done(null, user);
                            }
                        });
                    }
                    //if (user && bcrypt.compareSync(password, user.password)) {
                    else{
                        return done(null, false);
                    }

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

        newUser.role = 'general';



        userModel
            .FindUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        bcrypt.hash(newUser.password,null,null, function(err, hash) {
                            // Store hash in your password DB.
                            newUser.password = hash;
                        },function(err){
                            console.log(err);
                        });
                        //newUser.password = bcrypt.hashSync(newUser.password);
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




    function uploadImage(req, res){


        var userId = req.body.userId;
        var myAvatar = req.file;

        //console.log(myAvatar);

        var destination   = myAvatar.destination;
        var path          = myAvatar.path;
        var originalname  = myAvatar.originalname;
        var size          = myAvatar.size;
        var mimetype      = myAvatar.mimetype;
        var filename      = myAvatar.filename;

        userModel.FindById(userId)
            .then(function(user){

                user.avatar = "/project/uploads/"+filename;
                return userModel.Update(userId,user);
            },function(err){
                res.status(400).send(err);
            })
            .then(function(response){
                res.redirect("/project/client/#/profile/"+userId);
            },function(err){
                res.status(400).send(err);
            });

    }



    function FindAll(req,res){


        if(isAdmin(req.user)) {

            userModel
                .FindAll()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403).send("Unautorized access!");
        }
    }

    function FindById(req,res){

        userModel
            .FindById(req.params.id)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function UpdateUser(req,res){

        var newUser = req.body;

        userModel
            .Update(req.params.id, newUser)
            .then(
                function(user){
                    if(!isAdmin(req.user) && req.session.passport.user._id == req.params.id){
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

    function DeleteUser(req, res){

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

    function CreateUser(req, res) {

        var newUser = req.body;

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
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function FindFriendsByIds(req, res){

        var userId = req.params.id;

        userModel.FindById(userId)
            .then(function(user){
                return userModel.FindUsersByIds(user.friends);
            },
            function(err){
                res.status(400).send(err);
            })
            .then(function (response) {
                res.json(response);
            },function (err){
                res.status(400).send(err);
            });
    }

    function FindRequestsByIds(req, res){

        var userId = req.params.id;

        userModel.FindById(userId)
            .then(function(user){
                    return userModel.FindUsersByIds(user.requests);
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(function (response) {
                res.json(response);
            },function (err){
                res.status(400).send(err);
            });
    }


    function UserAddsFriend(req,res){


        userModel.userAddsFriend(req.params.friendId,req.params.id)
            .then(function(user){

                return userModel.userAddsFriend(req.params.id,req.params.friendId)

            },function(err){
                res.status(400).send(err);
            }
            )
            .then(function(user){
                    return userModel.userDeletsRequest(req.params.id,req.params.friendId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(function(response){
                return userModel.FindUsersByIds(response.friends);
            })

            .then(function(friends){

                res.json(friends);

            },function(err){

                res.status(400).send(err);
            });
    }

    function DeleteFriendRequest(req,res){
        userModel.userDeletsRequest(req.params.id,req.params.friendId)
            .then(function(user){
                return userModel.FindUsersByIds(user.requests)
            },function(err){
                res.status(400).send(err);
            })
            .then(function(requests){
                res.json(requests);
            },function(err){
                res.status(400).send(err);
            });
    }

    function DeleteFriend(req,res){

        userModel.deleteUserFriend(req.params.friendId,req.params.id)
            .then(function(user){
                return userModel.deleteUserFriend(req.params.id,req.params.friendId);
            },function(err){
                res.status(400).send(err);
            })
            .then(function(user){
                return userModel.FindUsersByIds(user.friends)
            },function(err){
                res.status(400).send(err);
            })
            .then(function(friends){
                res.json(friends);
            },function(err){
                res.status(400).send(err);
            });
    }

    function UserGetsFriendRequest(req,res){
        userModel.userGetsFriendRequest(req.params.friendId,req.params.id)
            .then(function(user){
                    res.status(200).send("Friend Request sent!");
                },function(err){
                    res.status(400).send(err);
                });
    }


    function FindUserLikedMovies(req,res){
        userModel.FindById(req.params.id)
            .then(function (user) {
                return movieModel.findMoviesByImdbIDs(user.moviesLiked)
            },function(err){
                res.status(400).send(err);
            })
            .then(function(movies){
               res.json(movies);
            },function(err){
                res.status(400).send(err);
            });
    }


    function FindUserReviewedMovies(req,res){
        userModel.FindById(req.params.id)
            .then(function (user) {
                res.json(user.moviesReviewed);
            },function(err){
                res.status(400).send(err);
            });
    }

    function UserRatesMovie(req,res){

        userModel.userRatesMovie(req.params.id,req.body)
            .then(function(user){
                res.json(user.moviesRated);
            },function(err){
                res.status(400).send(err);
            });
    }



    function isAdmin(user) {

        if(user.role == "admin") {
            return true;
        }
        return false;
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Authentication failed!");
        } else {
            next();
        }
    }



}
