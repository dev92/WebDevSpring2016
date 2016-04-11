"use strict";

module.exports = function(app, model) {

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../uploads' });

    app.get("/api/project/user",FindUser);
    app.get("/api/project/user/:id",FindById);
    app.get("/api/project/user/:id/friends",FindFriendsById);
    app.delete("/api/project/user/:id/friend/:friendId",DeleteUserFriend);
    app.put("/api/project/user/:id",UpdateUser);
    app.delete("/api/project/user/:id", DeleteUser);
    app.post("/api/project/user",CreateUser);
    app.post("/api/project/upload", upload.single('myAvatar'), uploadImage);


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

        var user = model.FindById(userId);
        user.avatar = "/project/uploads/"+filename;
        model.Update(userId,user);
        res.redirect("/project/client/#/profile");
    }


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

    function FindFriendsById(req, res){

        res.json(model.findFriendsById(req.params.id));
    }

    function DeleteUserFriend(req, res){
        res.json(model.deleteUserFriend(req.params.id,req.params.friendId));
    }




}
