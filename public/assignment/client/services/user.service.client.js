"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http,$q)
    {


        var service = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers : findAllUsers,
            //findUserByCredentials:findUserByCredentials,
            //findUserByUsername : findUserByUsername,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return service;


        function logout() {
            var defer = $q.defer();
            var url = "/api/assignment/logout";
            $http.post(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function login(user) {
            var defer = $q.defer();
            var url = "/api/assignment/login";
            $http.post(url,user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function register(user) {
            var defer = $q.defer();
            var url = "/api/assignment/register";
            $http.post(url,user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        //function findUserByUsername(username) {
        //    var defer = $q.defer();
        //    var url = "/api/assignment/user?username=" + username;
        //    $http.get(url)
        //        .success(function(response){
        //            defer.resolve(response);
        //        });
        //    return defer.promise;
        //}

        function findAllUsers() {
            var defer = $q.defer();
            var url = '/api/assignment/admin/user';
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        //function findUserByCredentials(username, password) {
        //    var defer = $q.defer();
        //    var url = "/api/assignment/user?username=" + username + "&password=" + password;
        //    $http.get(url)
        //        .success(function(response){
        //            defer.resolve(response);
        //        });
        //    return defer.promise;
        //}

        function createUser(user){
            var defer = $q.defer();
            var url = '/api/assignment/admin/user';
            $http.post(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function deleteUserById(userId) {
            var defer = $q.defer();
            var url = '/api/assignment/admin/user/'+ userId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(userId, user) {
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userId;
            $http.put(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


    }
})();