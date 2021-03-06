(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($rootScope,$scope,FieldService,$routeParams) {

        $scope.formId = $routeParams.formId;

        $scope.formTitle = $rootScope.formTitle;

        $scope.modalField = {};

        $scope.formFields = {};


        if($rootScope.currentusr){
            FieldService.getFieldsForForm($scope.formId)
                .then(function(fields){
                    $scope.formFields = fields;
                });
        }

        $scope.addField = function(fieldType){

            if(fieldType) {


                var newField = {};

                console.log(fieldType);

                if (fieldType == "Single Line Text Field") {
                    newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

                } else if (fieldType == "Multi Line Text Field") {
                    newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

                } else if (fieldType == "Date Field") {
                    newField = {"label": "New Date Field", "type": "DATE"};

                } else if (fieldType == "Dropdown Field") {
                    newField = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };

                } else if (fieldType == "CheckBoxes Field") {
                    newField = {
                        "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };

                } else if (fieldType == "Radio Buttons Field") {
                    newField = {
                            "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                }

                FieldService.createFieldForForm($scope.formId, newField)
                    .then(function (response) {
                        $scope.formFields = response;
                    });
            }
        }


        $scope.deleteField = function(fieldId){
            FieldService.deleteFieldFromForm($scope.formId,fieldId)
                .then(function(response){
                   $scope.formFields = response;
                });
        }


        $scope.cloneField = function(field){
            FieldService.createFieldForForm($scope.formId,field)
                .then(function (response) {
                    $scope.formFields = response;
                });
        }

        $scope.editField = function(fieldId){
            FieldService.getFieldForForm($scope.formId,fieldId)
                .then(function(response){
                    $scope.modalField = response;
                    if(response.hasOwnProperty("options")) {
                        $scope.modalField.options = JSON.stringify($scope.modalField.options);
                    }
                });
        }

        $scope.parseField = function(newfield){
            if(newfield.hasOwnProperty("options")){
                newfield.options = JSON.parse(newfield.options);
            }
            FieldService.updateField($scope.formId,newfield._id,newfield)
                .then(function(response){
                   $scope.formFields = response;
                });
        }


        $scope.$watch('formFields', function (newValue, oldValue) {

            if(Object.keys(newValue).length !== 0 && Object.keys(oldValue).length !== 0 ){
                //console.log("New Value:")
                //console.log(newValue);
                //console.log("Old Value:");
                //console.log(oldValue);
                FieldService.reorderFields($scope.formId,newValue)
                    .then(function (response) {
                        $scope.formFields = response;
                    });
            }

        }, true);



        $scope.fieldOptions = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "CheckBoxes Field",
            "Radio Buttons Field"
        ];


    }

})();