"use strict";

module.exports = function(app, model) {

    app.post("/api/assignment/user/:userId/form", CreateForm);
    app.get("/api/assignment/user/:userId/form", GetForms);
    app.get("/api/assignment/form/:formId", GetForm);
    app.get("/api/assignment/form?formTitle=formTitle", GetFormByTitle);
    app.put("/api/assignment/form/:formId",UpdateForm);
    app.delete("/api/assignment/form/:formId", DeleteForm);


    function CreateForm(req,res){

        model.Create(req.body, req.params.userId)
            .then(function(response){
               res.json(response);
            });
    }

    function GetForms(req, res){

        model.FindFormsByUserId(req.params.userId)
            .then(function(response){
                res.json(response);
            });
    }

    function GetForm(req, res){

        model.FindFormById(req.params.formId)
            .then(function(response){
                res.json(response);
            });

    }

    function GetFormByTitle(req, res){

        var formTitle = req.param("formTitle");
        model.FindFormByTitle(formTitle)
            .then(function(response){
                res.json(response);
            });
    }

    function UpdateForm(req, res){

        model.Update(req.params.formId, req.body)
            .then(function(response){
                res.json(response);
        });

    }

    function DeleteForm(req, res){

        model.Delete(req.params.formId)
            .then(function(response){
                res.json(response);
            });
    }


}