(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback){
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId,callback){
            var userforms = [];
            for(i=0;i<forms.length;i++) {
                if(forms[i].userId == userId){
                    userforms.push(forms[i]);
                }
            }
            callback(userforms);
        }

        function deleteFormById(formId,callback){
            for(i=0;i<forms.length;i++) {
                if(forms[i]._id == formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm,callback){
            temp = null;
            for (i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i] = newForm;
                    temp =  forms[i];
                }
            }
            callback(temp);
        }

    }

})();
