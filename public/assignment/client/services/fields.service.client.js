(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http,$q) {


        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm:getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            reorderFields: reorderFields
        };

        return service;

        function createFieldForForm(formId, field) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.post(url, field)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function getFieldsForForm(formId) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.get(url)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function getFieldForForm(formId,fieldId) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.get(url)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFieldFromForm(formId,fieldId) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.delete(url)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateField(formId, fieldId, field) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.put(url, field).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;

        }

        function reorderFields(formId,fields){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.put(url, fields).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;

        }
    }

})();
