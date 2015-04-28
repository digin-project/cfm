'use strict'

angular.module('cfm')
    .controller('ProductsCtrl', function($rootScope, $scope, $http, $location, questService) {
		$scope.myQuest = questService.getMyQuest()
		$scope.spinner = null;
		$scope.offres = []
		$scope.wanted = ['personnalisee', 'accelere', 'validation', 'sport', 'maxi_scoot']
/**
		$scope.offres.accelere
		$scope.offres.maxi_scoot
		$scope.offres.pass_125
		$scope.offres.initiation
		$scope.offres.perfectionnement
		$scope.offres.validation
		$scope.offres.sport
		$scope.offres.pilotage
**/
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
			console.log($scope.myQuest)
			// Simple POST request example (passing data) :
			$http.get('json/offres.json').
			  success(function(data, status, headers, config) {
				$scope.stopSpin();
				for (var i = 0; i < data.length; i++) {
					console.log(data[i].alias)
					if($scope.wanted.indexOf(data[i].alias) != -1) {
						$scope.offres.push(data[i]);
					}
				};
				console.log($scope.offres)
			  }).
			  error(function(data, status, headers, config) {
				$scope.stopSpin();
			  	console.log('status', status)
			  	console.log('data', data)

			  });
		}

		$scope.clickBox = function(a) {
			var elem = $('#' + a);
			if(elem.hasClass('hide')) { elem.removeClass('hide'); }
			else { elem.addClass('hide'); }
		}
		$scope.searchProducts();
    });