(function(){
    angular
        .module("CinephiliaApp")
        .controller("FriendsController", FriendsController);

    function FriendsController($scope, $routeParams, $rootScope, UserService) {


        var profileId = $routeParams.userId;
        $scope.friends = [];
        $scope.requests = [];
        $scope.otherUser = profileId;


        UserService.findUserFriends(profileId)
            .then(function (response) {
                $scope.friends = response;
            });


        if($rootScope.currentusr._id == profileId){

            UserService.FindUserRequests($rootScope.currentusr._id)
                .then(function (response) {
                    $scope.requests = response;
                });
        }


        $scope.removeFriend = function(userId,friend){
            UserService.deleteUserFriend(userId,friend._id)
                .then(function(response){
                    $scope.friends = response;
                });

        };

        $scope.removeRequest = function(userId,friend){
            UserService.DeleteUserRequest(userId,friend._id)
                .then(function(response){
                    $scope.requests = response;
                });

        };

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
        };

    }
})();