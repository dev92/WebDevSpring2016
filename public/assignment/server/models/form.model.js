"use strict";

//var uuid = require('node-uuid');
var q = require("q");

module.exports = function() {
    //var forms = require("./form.mock.json");
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindFormByTitle: FindFormByTitle,
        FindFormsByUserId: FindFormsByUserId,
        FindFormById: FindFormById,
        Update: Update,
        Delete: Delete,

        //CRUD for fields in a form

        AddFormField: AddFormField,
        FindField: FindField,
        UpdateFormField: UpdateFormField,
        DeleteFormField: DeleteFormField,
        ReorderFormFields:ReorderFormFields
    };
    return api;

    function Create(form, userId){
        form.userId = userId;
        form.fields = [];
        forms.push(form);
        return form;
    }

    function FindAll(){
       return forms;
    }

    function FindFormByTitle(title){
        for(var f in forms){
            if(forms[f].title == title){
                return forms[f];
            }
        }
        return null;
    }

    function FindFormsByUserId(userId){
        var userForms = [];
        for(var f in forms){
            if(forms[f].userId == userId){
                userForms.push(forms[f]);
            }
        }
        return userForms;
    }

    function FindFormById(id){
        for(var f in forms){
            if(forms[f]._id == id){
                return forms[f];
            }
        }
        return null;
    }

    function Update(id, form){
        for(var f in forms){
            if(forms[f]._id == id){
                forms[f] = form;
                return form;
            }
        }
    }

    function Delete(id) {
        for (var f in forms) {
            if (forms[f]._id == id) {
                forms.splice(f, 1);
                return forms;
            }
        }
    }

    function AddFormField(formId,field){
        var requiredForm = FindFormById(formId);
        if(requiredForm!=null){
            field._id = uuid.v1();
            requiredForm.fields.push(field);
            return Update(requiredForm._id,requiredForm).fields;
        }
        return null;
    }

    function FindField(formId,fieldId){
        var requiredForm = FindFormById(formId);
        if(requiredForm!=null){
            var formFields = requiredForm.fields
            for(var f in formFields){
                if(formFields[f]._id == fieldId){
                    return formFields[f];
                }
            }
            return null;
        }
        return null;
    }

    function UpdateFormField(formId,fieldId,field){
        var requiredForm = FindFormById(formId);
        if(requiredForm!=null){
            var formFields = requiredForm.fields;
            for(var f in formFields){
                if(formFields[f]._id == fieldId){
                    formFields[f] = field;
                    requiredForm.fields = formFields;
                    return Update(requiredForm._id,requiredForm).fields;

                }
            }
            return null;
        }
        return null;
    }

    function DeleteFormField(formId,fieldId){
        var requiredForm = FindFormById(formId);
        if(requiredForm!=null){
            var formFields = requiredForm.fields;
            for(var f in formFields){
                if(formFields[f]._id == fieldId){
                    formFields.splice(f,1);
                    requiredForm.fields = formFields;
                    return Update(requiredForm._id,requiredForm).fields;

                }
            }
            return null;
        }
        return null;
    }

    function ReorderFormFields(formId,fields){
        var requiredForm = FindFormById(formId);
        if(requiredForm!=null){
            requiredForm.fields = fields;
            return Update(requiredForm._id,requiredForm).fields;
        }
        return null;
    }

}
