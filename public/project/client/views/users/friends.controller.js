(function(){
    angular
        .module("CinephiliaApp")
        .controller("FriendsController", FriendsController);

    function FriendsController($scope, $rootScope,UserService) {

        $scope.imagePath = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
        $scope.friends = [];

        if($rootScope.currentusr){
            UserService.findUserFriends($rootScope.currentusr._id)
                .then(function (response) {
                   $scope.friends = response;
                });
        }

        $scope.removeFriend = function(userId,friend){
            console.log(friend._id);
            UserService.deleteUserFriend(userId,friend)
                .then(function(response){
                    $scope.friends = response;
                })

        }

    }
})();