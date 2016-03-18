"use strict";

module.exports = function(app,model) {

    app.post("/api/assignment/form/:formId/field", CreateFormField);
    app.put("/api/assignment/form/:formId/field", ReorderFormFields);
    app.get("/api/assignment/form/:formId/field", FindFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", FindFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteFormField);

    function CreateFormField(req,res){
        var formId = req.params.formId;
        res.json(model.AddFormField(formId,req.body));
    }

    function FindFormFields(req,res){
        var form = model.FindFormById(req.params.formId);
        res.json(form.fields);

    }

    function FindFormField(req, res){
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];

        res.json(model.FindField(formId,fieldId));
    }

    function UpdateFormField(req, res){

        res.json(model.UpdateFormField(req.params["formId"], req.params["fieldId"], req.body));

    }

    function DeleteFormField(req, res){
        res.json(model.DeleteFormField(req.params["formId"], req.params["fieldId"]))

    }

    function ReorderFormFields(req,res){
        res.json(model.ReorderFormFields(req.params["formId"],req.body));
    }


}