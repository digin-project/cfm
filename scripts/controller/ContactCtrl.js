'use strict'

angular.module('cfm')
    .controller('ContactCtrl', function($http, $scope) {

        $scope.contact = {};
        $scope.days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        $scope.message = false;
        $scope.success = false;
        $scope.captcha = "";

        function generateCaptcha() {
            return $scope.captcha = Math.random().toString(36).substr(2, 5);
        }

        generateCaptcha();

        $scope.send = function(contact) {
            var _date = Date.parse(contact.birthday);

            if(contact.captcha != $scope.captcha) {
                $scope.message = "Veuillez recopier la clé de validation.";
                $scope.success = false;

                return;
            }

            // check if is a valid date !isNaN(_date)
            $http.post('backend/mail.php', contact)
                .success(function(data){
                    if(data.success) {
                        $scope.message = "Mail envoyé";
                        $scope.success = true;
                    } else {
                        $scope.message = "Mail non envoyé";
                        $scope.success = false;
                    }
                })
                .error(function(data){
                    $scope.success = false;
                });
        }

    });
