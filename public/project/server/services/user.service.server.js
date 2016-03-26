"use strict";

module.exports = function(app, model) {

    app.get("/api/project/user",FindUser);
    app.get("/api/project/user/:id",FindById);
    app.get("/api/project/user/:id/friends",findUsersByIds);
    app.delete("/api/project/user/:id/friends",DeleteUserFriend);
    app.put("/api/project/user/:id",UpdateUser);
    app.delete("/api/project/user/:id", DeleteUser);
    app.post("/api/project/user",CreateUser);


    function CreateUser(req,res){
        res.send(model.Create(req.body));

    }

    function FindUser(req,res){


        var username = req.param("username");
        var password = req.param("password");

        if(typeof username === 'undefined' && typeof password === 'undefined'){

            res.json(model.FindAll())

        }
        else if(username != null && password != null){
            var credentials = {
                username : username,
                password : password
            };
            var user = model.FindUserByCredentials(credentials);
            res.json(user);
        }
        else if(username != null){
            var user = model.FindUserByUsername(username);
            res.json(user);
        }
    }

    function FindById(req,res){

        res.json(model.FindById(req.params.id));

    }

    function UpdateUser(req,res){

        res.json(model.Update(req.params.id, req.body));

    }

    function DeleteUser(req, res){

        res.json(model.Delete(req.params.id));

    }

    function findUsersByIds(req, res){

        res.json(model.findUsersByIds(req.params.id));
    }

    function DeleteUserFriend(req, res){
        console.log("In delete service for friend");
        console.log(req.body);
        res.json(model.deleteUserFriend(req.params.id,req.body));
    }




}
