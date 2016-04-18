( function(){

    angular
        .module('CinephiliaApp')
        .controller('MainController',MainController);

    function MainController($scope,$location,$rootScope,MovieApiService) {

        $scope.$location = $location;

        $scope.init = function(){
            MovieApiService.findBasePath()
                .then(function(response){
                console.log(response.images.base_url);
                $rootScope.basepath =  response.images.base_url
            });
        }

    }

})();

