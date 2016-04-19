(function()
{
    angular
        .module("CinephiliaApp")
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
            findUserById : findUserById,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findUserFriends:findUserFriends,
            deleteUserFriend:deleteUserFriend,
            UserSendsFriendRequest:UserSendsFriendRequest,
            FindUserRequests: FindUserRequests ,
            DeleteUserRequest:DeleteUserRequest,
            UserAddsFriend : UserAddsFriend
        };

        return service;


        function findUserById(userId) {
            var defer = $q.defer();
            var url = "/api/project/user/"+userId;
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function logout() {
            var defer = $q.defer();
            var url = "/api/project/logout";
            $http.post(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function login(user) {
            var defer = $q.defer();
            var url = "/api/project/login";
            $http.post(url,user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function register(user) {
            var defer = $q.defer();
            var url = "/api/project/register";
            $http.post(url,user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function findAllUsers() {
            var defer = $q.defer();
            var url = "/api/project/admin/user";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        //function findUserByCredentials(username, password) {
        //    var defer = $q.defer();
        //    var url = "/api/project/user?username=" + username + "&password=" + password;
        //    $http.get(url)
        //        .success(function(response){
        //            defer.resolve(response);
        //        });
        //    return defer.promise;
        //}

        function createUser(user){
            var defer = $q.defer();
            var url = '/api/project/admin/user';
            $http.post(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function deleteUserById(userId) {
            var defer = $q.defer();
            var url = '/api/project/admin/user/'+ userId;
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

        function deleteUserFriend(userId,friendId){
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId+'/friend/'+friendId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function UserSendsFriendRequest(userId,friendId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/request/"+friendId;
            $http.post(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function FindUserRequests (userId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/requests";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function DeleteUserRequest (userId,friendId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/request/"+friendId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function UserAddsFriend(userId,friendId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/friend/"+friendId;
            $http.post(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }



    }
})();