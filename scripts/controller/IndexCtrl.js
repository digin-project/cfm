'use strict'

angular.module('cfm')
    .controller('IndexCtrl', function($rootScope, $scope, $http) {
    	$scope.hideQuestions = true;
    	$scope.step = 1;
    	$scope.myTypeChoices = ['1', '2', '3', '4', '5']
        $scope.myImportantChoices = ['1', '2', '3', '4', '5']
        $scope.myChoicesChoices = ['1', '2', '3', '4', '5']
    	$scope.myQuest = {
    		myType : "",
    		mySector : "",
    		myImportant : "",
    		myChoices : ""
    	}
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
    				$scope.step = 2
    			} else {
                    $rootScope.addErrorMsg("Vous devez choisir une option.");
                }
    		}
    		if($scope.step == 2) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "") {
                    if(!isNaN(parseInt($scope.myQuest.mySector, 10)) && $scope.myQuest.mySector.length == 5){
                        $scope.step = 3
                    } else {
                        $rootScope.addErrorMsg("Le code postal n\'est pas valide.");
                    }
                } else {
                    $rootScope.addErrorMsg("Vous devez entrer un code postal.");
                }
    		}
            if($scope.step == 3) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "" && $scope.myQuest.myImportant != "") {
                    $scope.step = 4
                } else {
                    $rootScope.addErrorMsg("Vous devez choisir une option.");
                }
            }
            if($scope.step == 4) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "" && $scope.myQuest.myImportant != "" && $scope.myQuest.myChoices != "") {
                    //On traite le résultat du formulaire
                } else {
                    $rootScope.addErrorMsg("Vous devez choisir une option.");
                }
            }
    	}
        $scope.resetStep = function() {
            if($scope.step > 1) $scope.step--
        }

        
    });
