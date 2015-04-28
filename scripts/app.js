'use strict'

angular.module('cfm', ['ngRoute'])

    .config(function($routeProvider) {

        $routeProvider
            .when('/', { templateUrl: 'views/index.html', controller: 'IndexCtrl' })

            .when('/ecole/presentation', { templateUrl: 'views/ecole/presentation.html' })
            .when('/ecole/tarifs', { templateUrl: 'views/ecole/tarifs.html' })
            .when('/ecole/privilege', { templateUrl: 'views/ecole/privilege.html' })
            .when('/ecole/hebergement', { templateUrl: 'views/ecole/hebergement.html' })
            .when('/ecole/offre', { templateUrl: 'views/ecole/offre.html' })

            .when('/permis', { templateUrl: 'views/permis.html' })
            .when('/formations', { templateUrl: 'views/formations.html' })
            .when('/offres', { templateUrl: 'views/offres.html', controller: 'ProductsCtrl' })
            .when('/contact', { templateUrl: 'views/contact.html', controller: 'ContactCtrl' })
            .when('/cgv', { templateUrl: 'views/cgv.html' })
            .when('/mentions', { templateUrl: 'views/mentions.html' })
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

    })
    /**
     * @directive includeReplace
     *
     * Replace html into DOM
     * Delete webcomponent ng-include, better for SEO
     * @return {Object} includeReplace
     */
    .directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    })

    .service('questService', function() {
        var myQuest = {
            myType : "",
            mySector : "",
            myImportant : "",
            myChoices : ""
        }

        var setMyQuest = function(q) {
            myQuest = q
        }

        var getMyQuest = function(){
            return myQuest;
        }

        return {
            setMyQuest: setMyQuest,
            getMyQuest: getMyQuest
        };

    });
