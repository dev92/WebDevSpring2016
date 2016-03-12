(function () {
    'use strict';
    angular
        .module('CinephiliaApp')
        .controller('NewEventsController', NewEventsController);


    function NewEventsController ($mdConstant,$scope) {
        // Use common key codes found in $mdConstant.KEY_CODE...
        this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        this.tags = [];

        $scope.event = {}

        $scope.states = ('SELECT AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
        });
    }
})();