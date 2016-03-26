(function()
{
    angular
        .module("CinephiliaApp")
        .factory("UserService", UserService);

    function UserService($http,$q)
    {


        var service = {
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findUserFriends:findUserFriends,
            deleteUserFriend:deleteUserFriend
        };

        return service;


        function findUserByUsername(username) {
            var defer = $q.defer();
            var url = "/api/project/user?username=" + username;
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            var url = '/api/project/user';
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function findUserByCredentials(username, password) {
            var defer = $q.defer();
            var url = "/api/project/user?username=" + username + "&password=" + password;
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function createUser(user){
            var defer = $q.defer();
            var url = '/api/project/user';
            $http.post(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function deleteUserById(userId) {
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(userId, user) {
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId;
            $http.put(url, user)
                .success(function(response){
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserFriends(userId){
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId+"/friends";
            $http.get(url)
                .success(function(response){
                    //console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteUserFriend(userId,friend){
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId+"/friends";
            $http.delete(url,friend)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }



    }
})();