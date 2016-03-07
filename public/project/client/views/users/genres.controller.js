(function()
{
    angular
        .module("CinephiliaApp")
        .controller("GenreController", GenreController)
        .config(function($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
        });

    function GenreController($rootScope, $scope, $location, UserService) {

        $scope.message = null;

        $scope.genres = ["Action","Adventure","Comedy","Romance","Mystery","Thriller","Fantasy","Horror","Animation","Drama"];
        $scope.selected = [];


        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.user = {
            title: 'Developer',
            email: 'ipsum@lorem.com',
            firstName: '',
            lastName: '',
            company: 'Google',
            address: '1600 Amphitheatre Pkwy',
            city: 'Mountain View',
            state: 'CA',
            postalCode: '94043'
        };

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
        });



        $scope.update = function(user) {

            $scope.update = function(user) {
                UserService.updateUser(user._id,user,
                    function(response){
                        $rootScope.currentusr = response;
                    });
                $location.path('/profile');
            }
        }

    }

})();