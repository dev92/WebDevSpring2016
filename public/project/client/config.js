(function(){
    angular
        .module("CinephiliaApp")
        .config(function($routeProvider,$httpProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller:"HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })

                .when("/profile/:userId", {
                    templateUrl: "views/users/profile.view.html",
                    controller:"ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/genres", {
                    templateUrl: "views/users/genres.view.html",
                    controller:"GenreController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller:"SearchController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/friends/:userId", {
                    templateUrl: "views/users/friends.view.html",
                    controller:"FriendsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/currentEvents", {
                    templateUrl: "views/events/events.view.html",
                    controller:"EventsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/newEvent", {
                    templateUrl: "views/events/newevent.view.html",
                    controller:"NewEventController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/reviewed", {
                    templateUrl: "views/myspace/reviews.view.html",
                    controller:"ReviewsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller:"AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })

                .when("/favorites/:userId", {
                    templateUrl: "views/myspace/favorites.view.html",
                    controller:"FavoritesController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/eventDetails/:eventId", {
                    templateUrl: "views/events/eventdetails.view.html",
                    controller:"EventDetailController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })

                .when("/search/:movietitle", {
                    templateUrl: "views/search/search.view.html",
                    controller:"SearchController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/detail/:tmdbID", {
                    templateUrl: "views/search/details.view.html",
                    controller:"DetailController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.role =='admin')
            {
                $rootScope.currentusr = user;
                deferred.resolve();
            }else{
                $rootScope.errorMessage = "You do not have admin rights!";
                deferred.reject();
                $location.url('/home');

            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentusr = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentusr = user;

            }
            deferred.resolve();

        });

        return deferred.promise;
    };

})();