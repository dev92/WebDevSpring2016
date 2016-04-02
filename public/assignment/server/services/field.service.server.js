"use strict";

module.exports = function(app,FieldModel) {

    app.post("/api/assignment/form/:formId/field", CreateFormField);
    app.put("/api/assignment/form/:formId/field", ReorderFormFields);
    app.get("/api/assignment/form/:formId/field", FindFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", FindFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteFormField);


    function CreateFormField(req,res){

        var formId = req.params.formId;

        FieldModel.AddFormField(formId,req.body)
            .then(function (response) {
               res.json(response.fields);
            });
    }

    function FindFormFields(req,res){
        FieldModel.FindAllFields(req.params.formId)
            .then(function(response){
                res.json(response.fields);
            });


    }

    function FindFormField(req, res){
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];

        FieldModel.FindFieldById(formId,fieldId)
            .then(function(response){
                res.json(response);
            });
    }

    function UpdateFormField(req, res){

        FieldModel.UpdateFormField(req.params["formId"], req.params["fieldId"], req.body)
            .then(function(response){
                res.json(response.fields);
            });

    }

    function DeleteFormField(req, res){
        FieldModel.DeleteFormField(req.params["formId"], req.params["fieldId"])
            .then(function(response){
                res.json(response.fields);
            });

    }

    function ReorderFormFields(req,res){
        FieldModel.ReorderFormFields(req.params["formId"],req.body)
            .then(function(response){
                res.json(response);
            });
    }


}