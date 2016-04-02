"use strict"

var q = require("q");

module.exports = function(mongoose) {
    //var forms = require("./form.mock.json");
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("FormModelForField", FormSchema);

    var api = {
        //CRUD for fields in a form

        AddFormField: AddFormField,
        FindAllFields: FindAllFields,
        FindFieldById: FindFieldById,
        UpdateFormField: UpdateFormField,
        DeleteFormField: DeleteFormField,
        ReorderFormFields: ReorderFormFields
    };
    return api;

    function AddFormField(formId,field){

        var deferred = q.defer();

        FormModel.findById({_id : formId}, function(err,form){
           if(err){
               deferred.reject(err);
           }else{

               if(field._id){
                delete field._id;
               }
               var fields = form.fields;
               fields.push(field);
               form.fields = fields;
               form.save(function(err,updatedForm){
                   if(err)
                   {
                       deferred.reject(err);
                   }
                   else
                   {
                       deferred.resolve(updatedForm);
                   }
               });
           }
        });
        return deferred.promise;
        //if(requiredForm!=null){
        //    field._id = uuid.v1();
        //    requiredForm.fields.push(field);
        //    return Update(requiredForm._id,requiredForm).fields;
        //}
        //return null;
    }

    function FindAllFields(formId) {
        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function FindFieldById(formId,fieldId){

        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = form.fields;
                for(var f in fields){
                    if(fields[f]._id == fieldId){
                        deferred.resolve(fields[f]);
                        break;
                    }
                }
            }
        });
        return deferred.promise;
    }

        //var requiredForm = FindFormById(formId);
        //if(requiredForm!=null){
        //    var formFields = requiredForm.fields
        //    for(var f in formFields){
        //        if(formFields[f]._id == fieldId){
        //            return formFields[f];
        //        }
        //    }
        //    return null;
        //}
        //return null;

    function UpdateFormField(formId,fieldId,field) {

        var deferred = q.defer();

        FormModel.findById({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = form.fields;
                for (var f in fields) {
                    if (fields[f]._id == fieldId) {
                        fields[f] = field;
                        break;
                    }
                }
                form.fields = fields;
                form.save(function(err,updatedForm){
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
    }


        //var requiredForm = FindFormById(formId);
        //if(requiredForm!=null){
        //    var formFields = requiredForm.fields;
        //    for(var f in formFields){
        //        if(formFields[f]._id == fieldId){
        //            formFields[f] = field;
        //            requiredForm.fields = formFields;
        //            return Update(requiredForm._id,requiredForm).fields;
        //
        //        }
        //    }
        //    return null;
        //}
        //return null;

    function DeleteFormField(formId,fieldId){

        var deferred = q.defer();

        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;

                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        formFields.splice(i,1);
                    }
                }
                form.fields = formFields;
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
    }
        //var requiredForm = FindFormById(formId);
        //if(requiredForm!=null){
        //    var formFields = requiredForm.fields;
        //    for(var f in formFields){
        //        if(formFields[f]._id == fieldId){
        //            formFields.splice(f,1);
        //            requiredForm.fields = formFields;
        //            return Update(requiredForm._id,requiredForm).fields;
        //
        //        }
        //    }
        //    return null;
        //}
        //return null;

    function ReorderFormFields(formId,fields){

        var deferred = q.defer();

        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields = fields;
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
    }
    //var requiredForm = FindFormById(formId);
    //if(requiredForm!=null){
    //    requiredForm.fields = fields;
    //    return Update(requiredForm._id,requiredForm).fields;
    //}
    //return null;

}