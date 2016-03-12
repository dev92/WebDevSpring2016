(function(){
    angular
        .module("CinephiliaApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($scope) {

        $scope.movies = [{Title:"Batman",imdbID:"tt0096895",poster:"https://i.ytimg.com/vi/A0f3vH3BNvc/maxresdefault.jpg",
            favorite:true,review:"Movie is Awesome!"},{Title:"Avatar",imdbID:"tt0499549",poster:"http://t0.gstatic.com/images?q=tbn:ANd9GcQCfmvrE4fMo2cd8esc7mDZPtFSJThAujddMPkRtti1_ij6u-jp",
            favorite:true,review:"Its just awesome!"},{Title:"12 Angry men",imdbID:"tt0050083",poster:"http://t0.gstatic.com/images?q=tbn:ANd9GcTDnld_1CpP-iESMfN_iAF0yEOYAhv0gX7F3RKIf47oQIua_vAS",
            favorite:true,review:"Best Movie ever!!!"}]
    }
})();