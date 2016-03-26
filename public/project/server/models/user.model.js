"use strict";

var uuid = require('node-uuid');

module.exports = function() {

    var users = require("./users.mock.json");


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials,
        findFriendsById: findFriendsById,
        findUsersByIds: findUsersByIds,
        userLikesMovie: userLikesMovie,
        deleteUserFriend:deleteUserFriend,
        checkExistingUser:checkExistingUser
    };
    return api;

    function Create(user){
        var msg = checkExistingUser(user);
        if(msg == null){
            user._id = uuid.v1();
            users.push(user);
            return user;
        }
        return msg;

    }

    function FindAll(){
        return users;
    }

    function FindById(id){
        for(var u in users){
            if(users[u]._id == id ){
                return users[u];
            }
        }
        return null;
    }

    function Update(id,user){

        for(var u in users){
            if(users[u]._id == id ){
                users[u] = user;
            }
        }
        return user;
    }

    function Delete(id){
        for(var u in users){
            if(users[u]._id == id ){
                users.splice(u,1);
            }
        }
        return users;
    }

    function FindUserByUsername(username){
        for(var u in users){
            if(users[u].username == username){
                return users[u];
            }
        }
        return null;
    }

    function FindUserByCredentials(credentials){
        for(var u in users){
            if(users[u].username == credentials.username && users[u].password == credentials.password ){
                return users[u];
            }
        }
        return null;
    }

    function checkExistingUser(user) {
        var msg = null;
        for (var i in users) {
            if (users[i].username == user.username){
                msg = "Username already exists!";
                break;
            }
            else if(users[i].email == user.email && user.email!=null) {
                msg = "Email already exists!";
                break;
            }
        }
        return msg;
    }

    function findFriendsById(userId){
        var friends = [];
        for(var i in users){
            if(users[i]._id == userId){
                for(var u in users[i].friends){
                    friends.push(FindById(users[i].friends[u]))
                }
                break;
            }
        }

        return friends;
    }

    function deleteUserFriend(userId,friendId) {
        var friends = [];
        console.log(friendId);
        for (var i in users) {
            if (users[i]._id == userId) {
                for (var u in users[i].friends) {
                    if (users[i].friends[u] == friendId) {
                        users[i].friends.splice(u, 1);
                        return findUsersByIds(Update(userId, users[i])._id)
                    }
                }
            }
        }
    }

    function findUsersByIds(userIds){
        var matchedUsers = []
        for(var u in userIds){
            matchedUsers.push(FindById(userIds[u]));
        }
        return matchedUsers;
    }


    function userLikesMovie(userId,movie){
        var user = FindById(userId);
        if(user){
            user.favorites.push(movie.imdbID);
            return Update(userId,user);
        }
    }

}