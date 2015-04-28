'use strict'

angular.module('cfm')
    .controller('IndexCtrl', function($rootScope, $scope, $http, $location, questService) {
        $scope.step = 1;
        $scope.myTypeChoices = [
            {alias : 'novice', title : 'Je n\'ai jamais pratiqué la moto.', image : '', color : ''},
            {alias : 'debutant', title : 'Je pratique occasionnelement sur deux roues léger.', image : '', color : ''},
            {alias : 'initie', title : 'Je pratique régulièrement sur deux roues léger.', image : '', color : ''},
            {alias : 'confirme', title : 'Je pratique très régulièrement la moto loisir (cross, enduro, circuit).', image : '', color : ''},
            {alias : 'expert', title : 'Je pratique quotidiennement la moto (titulaire du permis A1/A2).', image : '', color : ''}]
        $scope.myQuest = questService.getMyQuest()
        $scope.slider = {};

        $scope.initSlider = function() {
            $http.get('backend/slider.php').success(function(data){
                $scope.slider = data;
            });
        }
        
        $scope.changeMyType = function(type) {
            $scope.myQuest.myType = type;
        }

        $scope.changeStep = function() {
            if($scope.myQuest.myType != "") {
                //On traite le résultat du formulaire
                questService.setMyQuest($scope.myQuest)
                $location.path('/offres')
            } else {
                $rootScope.addErrorMsg("Vous devez choisir une option.");
            }
        }

        $scope.initSlider();


    });
