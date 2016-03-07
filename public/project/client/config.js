(function(){
    angular
        .module("CinephiliaApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })

                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller:"ProfileController"
                })
                .when("/genres", {
                    templateUrl: "views/users/genres.view.html",
                    controller:"GenreController"
                })

                .otherwise({
                    redirectTo: "/home"
                });
        });
})();