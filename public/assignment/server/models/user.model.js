"use strict";

//var uuid = require('node-uuid');
var q = require("q");


module.exports = function(mongoose,db) {

    //var users = require("./user.mock.json");
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials
        //checkExistingUser:checkExistingUser
    };
    return api;

    function Create(user){

        var deferred = q.defer();

        UserModel.create(user, function(err, document) {
            if (err) {
                // reject promise if error
                deferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(document);
            }

        });
        return deferred.promise;
        //var msg = checkExistingUser(user);
        //if(msg == null){
        //    user._id = uuid.v1();
        //    users.push(user);
        //    return user;
        //}
        //return msg;

    }

    function FindAll(){
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
        //return users;
    }

    function FindById(id){
        var deferred = q.defer();
        UserModel.findById(id, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u]._id == id ){
        //        return users[u];
        //    }
        //}
        //return null;
    }

    function Update(id,user){
        var deferred = q.defer();
        UserModel.update({_id:id},user,function(err,response){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(response)
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u]._id == id ){
        //        users[u] = user;
        //        return user;
        //    }
        //}
    }

    function Delete(id){
        var deferred = q.defer();
        UserModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u]._id == id ){
        //        users.splice(u,1);
        //    }
        //}
        //return users;
    }

    function FindUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u].username == username){
        //        return users[u];
        //    }
        //}
        //return null;
    }

    function FindUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u].username == credentials.username && users[u].password == credentials.password ){
        //        return users[u];
        //    }
        //}
        //return null;
    }

    //function checkExistingUser(user) {
    //    var msg = null;
    //    for (var i in users) {
    //        if (users[i].username == user.username){
    //            msg = "Username already exists!";
    //            break;
    //        }
    //        else if(users[i].email == user.email && user.email!=null) {
    //            msg = "Email already exists!";
    //            break;
    //        }
    //    }
    //    return msg;
    //}



}