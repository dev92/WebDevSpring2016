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

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.message = null;

        $scope.user = $rootScope.currentusr;

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
                    $location.path('/profile');
                });
            }
        }

})();