'use strict'

angular.module('cfm')
    .controller('IndexCtrl', function($scope, $http) {
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
                    $scope.addErrorMsg("Vous devez choisir une option.");
                }
    		}
    		if($scope.step == 2) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "") {
                    if(!isNaN(parseInt($scope.myQuest.mySector, 10)) && $scope.myQuest.mySector.length == 5){
                        $scope.step = 3
                    } else {
                        $scope.addErrorMsg("Le code postal n\'est pas valide.");
                    }
                }
    		}
            if($scope.step == 3) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "" && $scope.myQuest.myImportant != "") {
                    $scope.step = 4
                }
            }
            if($scope.step == 4) {
                if($scope.myQuest.myType != "" && $scope.myQuest.mySector != "" && $scope.myQuest.myImportant != "" && $scope.myQuest.myChoices != "") {
                    //On traite le résultat du formulaire
                }
            }
    	}
        $scope.resetStep = function() {

        }

        $scope.addErrorMsg = function(msg) {
            $scope.errorMsg = msg
            setTimeout(function() {
                $scope.$apply(function(){
                    $scope.errorMsg = null;
                })
            }, 2000);
        }
    });
