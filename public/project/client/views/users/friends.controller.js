(function(){
    angular
        .module("CinephiliaApp")
        .controller("FriendsController", FriendsController);

    function FriendsController($scope, $location) {

        var imagePath = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
        $scope.messages = [{
            face : imagePath,
            status: 'I love the new Deadpool movie',
            who: 'Alice',
            reviewed: 'Reviewed 10 movies',

        }, {
            face : imagePath,
            status: 'On a movie Marathon!',
            who: 'Carter',
            reviewed: 'Reviewed 20 movies',
        }, {
            face : imagePath,
            status: "Movie Buff? connect with me",
            who: 'Dev',
            reviewed: 'Reviewed 3 movies',
        }, {
            face : imagePath,
            status: 'Movie this weekend?',
            who: 'Bob',
            reviewed: 'Reviewed 1 movies',
        }];
    }
})();