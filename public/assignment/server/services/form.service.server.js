"use strict";

module.exports = function(app, model) {

    app.post("/api/assignment/user/:userId/form", CreateForm);
    app.get("/api/assignment/user/:userId/form", GetForms);
    app.get("/api/assignment/form/:formId", GetForm);
    app.get("/api/assignment/form?formTitle=formTitle", GetFormByTitle);
    app.put("/api/assignment/form/:formId",UpdateForm);
    app.delete("/api/assignment/form/:formId", DeleteForm);


    function CreateForm(req,res){

        res.json(model.Create(req.body, req.params.userId));
    }

    function GetForms(req, res){

        res.json(model.FindFormsByUserId(req.params.userId));
    }

    function GetForm(req, res){

        res.json(model.FindById(req.params.formId));

    }

    function GetFormByTitle(req, res){

        var formTitle = req.param("formTitle");
        res.json(model.FindFormByTitle(formTitle));
    }

    function UpdateForm(req, res){

        res.json(model.Update(req.params.formId, req.body));

    }

    function DeleteForm(req, res){

        res.json(model.Delete(req.params.formId));
    }


}