'use strict'

angular.module('cfm', ['ngRoute'])

    .config(function($routeProvider) {

        $routeProvider
            .when('/', { templateUrl: 'views/index.html', controller: 'IndexCtrl' })
            .otherwise({ redirectTo: '/' })
    })

    .run(function($rootScope){
		$rootScope.addErrorMsg = function(msg) {
            $rootScope.errorMsg = msg
            setTimeout(function() {
                $rootScope.$apply(function(){
                    $rootScope.errorMsg = null;
                })
            }, 2000);
        }
    });
