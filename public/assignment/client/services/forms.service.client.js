(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http,$q) {


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form) {
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId + "/form";
            $http.post(url, form)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllFormsForUser(userId) {
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId + "/form";
            $http.get(url)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFormById(formId) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId;
            $http.delete(url)
                .success(function (response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateFormById(formId, newForm) {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId;
            $http.put(url, newForm).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;

        }
    }

})();
