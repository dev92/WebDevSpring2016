(function () {
    'use strict';
    angular
        .module('CinephiliaApp')
        .controller('EventsController', EventsController);


    function EventsController ($mdConstant,$scope) {
        // Use common key codes found in $mdConstant.KEY_CODE...
        this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        this.tags = ["Alice","Carter","John"];

        $scope.event = {movie:"Avatar",
            address: '1600 Amphitheatre Pkwy',
            city: 'Mountain View',
            state: 'CA',
            host:"Bob",
            postalCode:91950,
            Date:new Date()

        }

        $scope.states = ('SELECT AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
        });
    }
})();