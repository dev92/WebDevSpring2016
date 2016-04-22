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
                delete $scope.user.password;
                $scope.disableFields = false;

            }else {
                UserService.findUserById(profileId)
                    .then(function (response) {

                        $scope.user = response;


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

            if (user.password != vpassword && user.password!='' && vpassword!=null) {
                $scope.message = "Passwords must match";
                return;
            }else if(user.password!='' && vpassword==null && user.password){
                $scope.message = "Enter verify password!";
                return
            }

            if(user.password == ""){
                delete user.password;
            }

            UserService.updateUser(user._id,user)
                .then(function(response){
                    $rootScope.currentusr = response;
                    //$scope.user = $rootScope.currentusr;
                    //delete $scope.user.password;
                    $location.url('/profile/'+user._id);
                });
            }
        }

})();