"use strict";

module.exports = function() {

    var users = require("./user.mock.json");

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials,
        checkExistingUser:checkExistingUser
    };
    return api;

    function Create(user){
        var msg = checkExistingUser(user);
        if(msg == null){
            user._id = (new Date).getTime();
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
                return user;
            }
        }
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



}