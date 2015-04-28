'use strict'

angular.module('cfm')
    .controller('ResultatsCtrl', function($rootScope, $scope, $http, $location, questService) {    	
		$scope.myQuest = questService.getMyQuest()
		$scope.offres = []
		$scope.formations = []
		$scope.wanted = ['personnalisee', 'accelere', 'validation', 'sport', 'maxi_scoot']
		$scope.startSpin = function() {			
			var opts = {
			  lines: 11, // The number of lines to draw
			  length: 0, // The length of each line
			  width: 8, // The line thickness
			  radius: 33, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 0, // The rotation offset
			  direction: 1, // 1: clockwise, -1: counterclockwise
			  color: '#000', // #rgb or #rrggbb or array of colors
			  speed: 0.7, // Rounds per second
			  trail: 60, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: '50%', // Top position relative to parent
			  left: '50%' // Left position relative to parent
			};
			var target = document.getElementById('content');
			$scope.spinner = new Spinner(opts).spin(target);
		}

		$scope.stopSpin = function() {
			$('.spinner').fadeOut(function() {
				var target = document.getElementById('content');
				$scope.spinner.stop()
			})
		}
		$scope.searchProducts = function() {
			$scope.startSpin();
			console.log($scope.myQuest);
			// Simple POST request example (passing data) :
			$http.get('json/offres.json').
			  success(function(data, status, headers, config) {
				$scope.stopSpin();
				for (var i = 0; i < data.length; i++) {
					if($scope.wanted.indexOf(data[i].alias) != -1) {
						$scope.offres.push(data[i]);
					}
				};

				$http.get('json/formations.json').
				  success(function(data2, status, headers, config) {
						for (var i = 0; i < data.length; i++) {
							if($scope.wanted.indexOf(data2[i].alias) != -1) {
								$scope.formations.push(data2[i]);
							}
						};
				  });
			  }).
			  error(function(data, status, headers, config) {
				$scope.stopSpin();
                $rootScope.addErrorMsg("Une erreur a empeché la récupération des offres. Merci de réessayer ou contacter un administrateur.");

			  });
		}

		$scope.clickBox = function(a) {
			var elem = $('#content-' + a);
			var parent = elem.parent();
			if(elem.hasClass('hide')) { 
				parent.find('.less').removeClass('hide');
				parent.find('.more').addClass('hide');
				elem.removeClass('hide'); 
			}
			else { 
				elem.addClass('hide'); 
				parent.find('.more').removeClass('hide');
				parent.find('.less').addClass('hide');
			}
		}

		$scope.result = function() {
			if($scope.myQuest.myType != '') {
				switch($scope.myQuest.myType.alias){
					case 'expert':
						/** Permis : Personnalisée, accéléré, validation A2 => A, Stage sport
							Stages : pass125, stage initiation, perfectionnement, Pilotage **/
						$scope.wanted = ['personnalisee', 'accelere', 'validation', 'sport', 'pass_125', 'initiation', 'perfectionnement', 'pilotage']
						$scope.searchProducts();
						break;
					case 'confirme':
						/** Permis : Personnalisée, accéléré, maxi scoot
							Stages : pass125, stage initiation, perfectionnement **/
						$scope.wanted = ['personnalisee', 'accelere', 'maxi_scoot', 'pass_125', 'initiation', 'perfectionnement']
						$scope.searchProducts();
						break;
					case 'initie':
						/** Permis : Personnalisée, accéléré, maxi scoot
							Stages : pass125, stage initiation, perfectionnement**/
						$scope.wanted = ['personnalisee', 'accelere', 'maxi_scoot', 'pass_125', 'initiation', 'perfectionnement']
						$scope.searchProducts();
						break;
					case 'debutant':
						/** Permis : Personnalisée, accéléré, maxi scoot
							Stages : pass125, stage initiation, perfectionnement **/
						$scope.wanted = ['personnalisee', 'accelere', 'maxi_scoot', 'pass_125', 'initiation', 'perfectionnement']
						$scope.searchProducts();
						break;
					case 'novice':
						/** Permis : Personnalisée, accéléré, maxi scoot
							Stages : pass125, stage initiation, perfectionnement **/
						$scope.wanted = ['personnalisee', 'accelere', 'maxi_scoot', 'pass_125', 'initiation']
						$scope.searchProducts();
						break;
					default:
						$scope.wanted = ['personnalisee', 'accelere', 'maxi_scoot', 'validation', 'sport', 'pass_125', 'initiation', 'perfectionnement', 'pilotage']
						$scope.searchProducts();
						break;
				}
			} else {
				$scope.wanted = ['personnalisee', 'accelere', 'maxi_scoot', 'validation', 'sport', 'pass_125', 'initiation', 'perfectionnement', 'pilotage']
				$scope.searchProducts();

			}
		}
		$scope.result()
    });