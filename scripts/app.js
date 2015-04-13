'use strict'

angular.module('cfm', ['ngRoute'])

    .config(function($routeProvider) {

        $routeProvider
            .when('/', { templateUrl: 'views/index.html', controller: 'IndexCtrl' })
            .when('/contact', { templateUrl: 'views/contact.html', controller: 'ContactCtrl' })
            .otherwise({ redirectTo: '/' })
    })

    .run(function(){

    });
