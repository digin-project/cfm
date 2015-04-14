'use strict'

angular.module('cfm')
    .controller('ContactCtrl', function($http, $scope) {

        $scope.contact = {};
        $scope.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        $scope.message = false;
        $scope.success = undefined;
        $scope.captcha = "";

        function generateCaptcha() {
            return $scope.captcha = Math.random().toString(36).substr(2, 5);
        }

        generateCaptcha();

        $scope.send = function(contact) {
            $scope.message = [];
            var _date = Date.parse(contact.birthday);

            if(contact.firstname == undefined || contact.firstname == "") {
                $scope.message.push("Désolé, mais le champ Prénom est obligatoire.");
            }

            if(contact.lastname == undefined || contact.lastname == "") {
                $scope.message.push("Désolé, mais le champ Nom est obligatoire.");
            }

            if(contact.mail == undefined || contact.mail == "") {
                $scope.message.push("Désolé, mais le champ E.mail est obligatoire.");
            }

            if(contact.mobile == undefined || contact.mobile == "") {
                $scope.message.push("Désolé, mais le champ Mobile est obligatoire.");
            }

            if(contact.captcha == undefined || contact.captcha.toUpperCase() != $scope.captcha.toUpperCase()) {
                $scope.message.push("Vous avez saisie une clé erronée, le formulaire n'est pas validé.");
            }

            $http.post('backend/mail.php', contact).success(function(data){
                if(data.success) {
                    $scope.message.push("Mail envoyé");
                    $scope.success = true;
                }
            }).error(function(data){
                $scope.success = false;
            });
        }

    });
