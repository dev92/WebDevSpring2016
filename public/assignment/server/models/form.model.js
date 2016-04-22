"use strict";

//var uuid = require('node-uuid');
var q = require("q");

module.exports = function(mongoose,db) {
    //var forms = require("./form.mock.json");
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel  = db.model("FormModel", FormSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindFormByTitle: FindFormByTitle,
        FindFormsByUserId: FindFormsByUserId,
        FindFormById: FindFormById,
        Update: Update,
        Delete: Delete

    };
    return api;

    function Create(form, userId){
        var deferred = q.defer();
        form.userId = userId;
        form.fields = [];
        form.created = Date.now();
        FormModel.create(form, function(err, createdForm) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdForm);
            }
        });
        return deferred.promise;
        //form.userId = userId;
        //form.fields = [];
        //forms.push(form);
        //return form;
    }

    function FindAll(){
        var deferred = q.defer();

        FormModel.find(function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function FindFormByTitle(title){

        var deferred = q.defer();

        FormModel.findOne({title: title}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
        //for(var f in forms){
        //    if(forms[f].title == title){
        //        return forms[f];
        //    }
        //}
        //return null;
    }

    function FindFormsByUserId(userId){

        var deferred = q.defer();

        FormModel.find({userId: userId}, function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
        //var userForms = [];
        //for(var f in forms){
        //    if(forms[f].userId == userId){
        //        userForms.push(forms[f]);
        //    }
        //}
        //return userForms;
    }

    function FindFormById(id){

        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
        //for(var f in forms){
        //    if(forms[f]._id == id){
        //        return forms[f];
        //    }
        //}
        //return null;
    }

    function Update(id, form){

        var deferred = q.defer();

        FormModel.findById(id, function(err, formToUpdate) {
            if(err) {
                deferred.reject(err);
            } else {
                formToUpdate.title = form.title;
                formToUpdate.updated = Date.now();
                formToUpdate.save(function(err, updatedForm) {
                    deferred.resolve(updatedForm);
                });
            }
        });
        return deferred.promise;
        //for(var f in forms){
        //    if(forms[f]._id == id){
        //        forms[f] = form;
        //        return form;
        //    }
        //}
    }

    function Delete(id) {

        var deferred = q.defer();
        FormModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //for (var f in forms) {
        //    if (forms[f]._id == id) {
        //        forms.splice(f, 1);
        //        return forms;
        //    }
        //}
    }
}
