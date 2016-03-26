(function()
{
    angular
        .module("CinephiliaApp")
        .controller("GenreController", GenreController)

    function GenreController($rootScope, $scope, $location, UserService) {


        $scope.genres = ["Action","Adventure","Comedy","Romance","Mystery","Thriller","Fantasy","Horror","Animation","Drama"];

        if($rootScope.currentusr.hasOwnProperty('genres')){
            $scope.selected = $rootScope.currentusr.genres;
        }else{
            $scope.selected = [];
        }


        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };



        $scope.update = function(userId,user) {

            user.genres = $scope.selected;

            UserService.updateUser(userId,user)
                .then(function(response){
                    $scope.selected = response.genres;
                    $location.path('/genres');
                });
        }

    }

})();