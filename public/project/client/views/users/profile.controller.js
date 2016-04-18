(function()
{
    angular
        .module("CinephiliaApp")
        .controller("ProfileController", ProfileController)
        .config(function($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .backgroundPalette('blue')
                .dark();
        });

    function ProfileController($rootScope, $routeParams, $scope, $location, UserService, $mdToast) {


        var profileId = $routeParams.userId;
        $scope.message = null;
        $scope.disableFields = true;
        $scope.buttonType = "update";
        $scope.user = {};



        if($rootScope.currentusr){

            if($rootScope.currentusr._id == profileId){

                $scope.user = $rootScope.currentusr;
                $scope.disableFields = false;

            }else {
                UserService.findUserById(profileId)
                    .then(function (response) {

                        $scope.user = response;

                        //console.log($scope.user);

                        if($rootScope.currentusr.requests.indexOf(profileId)!=-1){
                            $scope.buttonType = "requested";

                        }else if($scope.user.requests.indexOf($rootScope.currentusr._id)!=-1){

                            $scope.buttonType = 'pending';

                        }else if($scope.user.friends.indexOf($rootScope.currentusr._id)!=-1){

                            $scope.buttonType = "none";

                        }else{
                            $scope.buttonType = "friend";
                        }

                    });
            }

        }


        if(!$scope.user.hasOwnProperty("avatar")){
            $scope.user.avatar = 'http://all4ed.org/wp-content/themes/all4ed/assets/images/avatar-placeholder-generic.png';
                //'../project/client/media/765-default-avatar.png';

        }

        $scope.addFriend = function(user) {

            UserService.UserSendsFriendRequest($rootScope.currentusr._id,user._id)
                .then(function(response){

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Friend Request Sent!')
                            .position('top')
                            .theme('success-toast')
                            .hideDelay(3000)
                    );
                    $scope.buttonType = 'pending';

                },
                function(err){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error sending friend request!')
                            .position('top')
                            .theme('error-toast')
                            .hideDelay(3000)
                    );
                });

        };


        $scope.states = ('SELECT AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
        });


        $scope.update = function(user,vpassword) {

            if (user.password != vpassword) {
                console.log("Password dont match!");
                $scope.message = "Passwords must match";
                return;
            }

            UserService.updateUser(user._id,user)
                .then(function(response){
                    $rootScope.currentusr = response;
                    $location.path('/profile/'+user._id);
                });
            }
        }

})();