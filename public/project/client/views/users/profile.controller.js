(function()
{
    angular
        .module("CinephiliaApp")
        .controller("ProfileController", ProfileController)
        .config(function($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
        });

    function ProfileController($rootScope, $routeParams, $scope, $location, UserService, $mdToast) {


        var profileId = $routeParams.userId;
        $scope.message = null;
        $scope.disableFields = true;
        $scope.buttonType = "update";

        //console.log("In profile Controller!");


        if($rootScope.currentusr){

            $scope.user = $rootScope.currentusr;

            if(!$scope.user.hasOwnProperty("avatar")){
                $scope.user.avatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
            }

            if($scope.user._id == profileId){

                $scope.disableFields = false;

            }else if($scope.user.requests.indexOf(profileId)!=-1){

                $scope.buttonType = 'pending';

            }else if($scope.user.friends.indexOf(profileId)!=-1){

                $scope.buttonType = "none";

            }else{
                UserService.findUserById(profileId)
                    .then(function(response){
                        $scope.user = response;
                        $scope.buttonType = "friend";
                    });
            }
        }


        $scope.addFriend = function(user) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Friend Request Sent!')
                    .position('top')
                    .theme('success-toast')
                    .hideDelay(3000)
            );
            $scope.buttonType = 'pending';
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