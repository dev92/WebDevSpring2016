"use strict";

module.exports = function(app, model) {

    app.get("/api/assignment/user",FindUser);
    app.get("/api/assignment/user/:id",FindById);
    app.put("/api/assignment/user/:id",UpdateUser);
    app.delete("/api/assignment/user/:id", DeleteUser);
    app.post("/api/assignment/user",CreateUser);


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




}
