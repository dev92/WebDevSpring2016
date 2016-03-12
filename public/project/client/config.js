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

                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller:"SearchController"
                })

                .when("/friends", {
                    templateUrl: "views/users/friends.view.html",
                    controller:"FriendsController"
                })

                .when("/currentEvents", {
                    templateUrl: "views/events/events.view.html",
                })

                .when("/newEvent", {
                    templateUrl: "views/events/newevent.view.html",
                    controller:"NewEventsController"
                })

                .when("/reviewed", {
                    templateUrl: "views/myspace/reviews.view.html",
                    controller:"ReviewsController"
                })

                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                })

                .when("/favorites", {
                    templateUrl: "views/myspace/favorites.view.html",
                    controller:"FavoritesController"
                })

                .when("/events/:eventID", {
                    templateUrl: "views/events/eventdetails.view.html",
                    controller:"EventsController"
                })

                .when("/eventDetails", {
                    templateUrl: "views/events/eventdetails.view.html",
                    controller:"EventsController"

                })

                .when("/search/:movietitle", {
                    templateUrl: "views/search/search.view.html",
                    controller:"SearchController"
                })
                .when("/detail/:imdbID", {
                    templateUrl: "views/search/details.view.html",
                    controller:"DetailController"
                })

                .otherwise({
                    redirectTo: "/home"
                });
        });
})();