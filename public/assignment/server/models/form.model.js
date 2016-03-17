"use strict";

module.exports = function() {
    var forms = require("./form.mock.json");

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindFormByTitle: FindFormByTitle,
        FindFormsByUserId: FindFormsByUserId,
        FindById: FindById,
        Update: Update,
        Delete: Delete

        //AddFormField: AddFormField,
        //FindField: FindField,
        //UpdateFormField: UpdateFormField,
        //DeleteFormField: DeleteFormField
    };
    return api;

    function Create(form, userId){
        form.userId = userId;
        form._id = (new Date).getTime();
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

    function FindById(id){
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

}
