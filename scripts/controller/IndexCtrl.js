'use strict'

angular.module('cfm')
    .controller('IndexCtrl', function($rootScope, $scope, $http, $location, questService) {
    	$scope.hideQuestions = true;
    	$scope.step = 1;
    	$scope.myTypeChoices = [
            {alias : 'novice', title : 'Je n\'ai jamais pratiqué la moto', image : '', color : ''},
            {alias : 'debutant', title : 'Je pratique la moto légère occasionnellement', image : '', color : ''},
            {alias : 'confirme', title : 'Je suis confirmé', image : '', color : ''},
            {alias : 'initie', title : 'Je suis expert', image : '', color : ''},
            {alias : 'expert', title : 'Je suis un pilote !', image : '', color : ''}]
        $scope.myChoicesChoices = [
            {alias : '1', title : 'Passer le permis le plus rapidement possible'},
            {alias : '2', title : 'Pouvoir prendre le temps d\'apprendre sans pression et à mon rythme'},
            {alias : '3', title : 'Maîtriser les bases de la moto sportive'}
            ]
        $scope.myImportantChoices = [
            {alias : '1', title : 'Etre entouré par des moniteurs expérimentés et à l\'écoute'},
            {alias : '2', title : 'Les avis des anciens élèves'},
            {alias : '3', title : 'L\'existence d\'une vraie communauté autour de la marque de laquelle vous pourriez faire partie'},
            {alias : '4', title : 'a proximité de mon domicile ou la possibilité de me loger'}
            ]
    	$scope.myQuest = questService.getMyQuest()

    	$scope.scrollQuestions = function() {

    	}
    	$scope.changeMyType = function(type) {
			$scope.myQuest.myType = type;
    	}
    	$scope.changeMySector = function() {
            console.log(this)
			//$scope.myQuest.mySector = loc;
    	}    	
    	$scope.changeMyImportant = function(imp) {
			$scope.myQuest.myImportant = imp;
    	}
    	$scope.changeMyChoices = function(c) {
			$scope.myQuest.myChoices = c;
    	}
    	$scope.changeStep = function() {
    		if($scope.step == 1) {
    			if($scope.myQuest.myType != "") {
    				return $scope.step = 2
    			} else {
                    $rootScope.addErrorMsg("Vous devez choisir une option.");
                }
    		}
    		if($scope.step == 2) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "") {
                    if(!isNaN(parseInt($scope.myQuest.mySector, 10)) && $scope.myQuest.mySector.length == 5){
                       return $scope.step = 3
                    } else {
                        $rootScope.addErrorMsg("Le code postal n\'est pas valide.");
                    }
                } else {
                    $rootScope.addErrorMsg("Vous devez entrer un code postal.");
                }
    		}
            if($scope.step == 3) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "" && $scope.myQuest.myImportant != "") {
                    return $scope.step = 4
                } else {
                    $rootScope.addErrorMsg("Vous devez choisir une option.");
                }
            }
            if($scope.step == 4) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "" && $scope.myQuest.myImportant != "" && $scope.myQuest.myChoices != "") {
                    //On traite le résultat du formulaire
                    questService.setMyQuest($scope.myQuest)
                    $location.path('/offres')
                } else {
                    $rootScope.addErrorMsg("Vous devez choisir une option.");
                }
            }
    	}
        $scope.resetStep = function() {
            if($scope.step > 1) $scope.step--
        }

        
    });
