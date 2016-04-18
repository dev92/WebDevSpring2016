(function(){
    angular
        .module("CinephiliaApp")
        .controller("FriendsController", FriendsController);

    function FriendsController($scope, $rootScope,UserService) {


        $scope.friends = [];
        $scope.requests = [];

        if($rootScope.currentusr){
            UserService.findUserFriends($rootScope.currentusr._id)
                .then(function (response) {
                   $scope.friends = response;
                });

            UserService.FindUserRequests($rootScope.currentusr._id)
                .then(function (response) {
                    $scope.requests = response;
                });
        }

        $scope.removeFriend = function(userId,friend){
            console.log(friend._id);
            UserService.deleteUserFriend(userId,friend._id)
                .then(function(response){
                    $scope.friends = response;
                });

        }

        $scope.removeRequest = function(userId,friend){
            UserService.DeleteUserRequest(userId,friend._id)
                .then(function(response){
                    $scope.requests = response;
                });

        }

        $scope.addRequest = function(userId,friend) {
            UserService.UserAddsFriend(userId, friend._id)
                .then(function(response){
                    console.log(response);
                    $scope.friends = response;
                    return UserService.FindUserRequests(userId);
                })
                .then(function (response) {
                    $scope.requests = response;
                });
        }

    }
})();