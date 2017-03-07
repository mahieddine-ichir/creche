var app = angular.module('myApp', ['ngMaterial', 'ngRoute', 'app-services']);
app.config(function($mdThemingProvider) {

  // Extend the red theme with a different color and make the contrast color black instead of white.
  // For example: raised button text will be black instead of white.
  // var neonRedMap = $mdThemingProvider.extendPalette('red', {
  //   '500': '#ff0000',
  //   'contrastDefaultColor': 'dark'
  // });

  // Register the new color palette map with the name <code>neonRed</code>
  // $mdThemingProvider.definePalette('neonRed', neonRedMap);

  // Use that theme for the primary intentions
  //$mdThemingProvider.theme('default').primaryPalette('neonRed');

});
app.config(function($routeProvider) {

	$routeProvider
	.when('/deposer', {
		controller: 'DeposerController',
		templateUrl: 'views/deposer.html'
	})
	.when('/recuperer', {
		templateUrl: 'views/recuperer.html'
	})
	.when('/admin', {
		templateUrl: 'views/admin.html'
	})
	.when('/add', {
		templateUrl: 'views/add.html',
		controller: 'AjouterEnfantController'
	})
	.otherwise({
		redirectTo: '/deposer'
	});

});

app.directive('micAddress', function() {
	return {
		restrict : 'E',
		templateUrl: 'views/address.html' 
	};
});

app.directive('micContact', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/contact.html'
	};
});

app.directive('micEnfant', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/enfant.html',
		scope: {
			enfant: '='
		},
		controller: function($scope, $mdDialog) {

			$scope.contactInfo = function(ev) {
				// var dlg = $mdDialog
			 //      			.alert()
			 //        		.parent(angular.element(document.querySelector('#popupContainer')))
			 //        		.clickOutsideToClose(true)
			 //        		.title(e.name)
			 //        		.templateUrl("templates/contact-info.html")
			        		//.textContent('<mic-contact-info contact="e.contacts"></mic-contact-info>')
			        		//.ariaLabel('Alert Dialog Demo')			        		
			        		// .ok('Fermer')
			        		// .targetEvent(ev);

			    var dlg = {
			    	multiple: true,
     				controller: 'DialogController',
      				templateUrl: 'views/templates/contact-info.html',
      				locals: {
      					enfant: $scope.enfant
      				},
      				parent: angular.element(document.body),
      				targetEvent: ev,
      				clickOutsideToClose:true
      				//fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    			};

				$mdDialog.show(dlg)
					.then(function(answer) {
						console.log('Dialog closed '+answer);
      					//$scope.status = 'You said the information was "' + answer + '".';
    				}, function() {
    					console.log('Dialog canceled ');
      					//$scope.status = 'You cancelled the dialog.';
    				});
			 };
		}
	};
});

app.controller('DialogController', function($scope, $mdDialog, enfant) {
	$scope.enfant = enfant;
	$scope.close = function() {			
		$mdDialog.hide();		
	};
});

app.directive('micContactInfo', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/contact-info.html',
		scope: {
			contact: '='
		}
	}
});

app.filter('age', function() {
	return function(enfant) {
		if (!enfant.naissance) {
			return '?';
		}
		return new Date().getFullYear() - enfant.naissance.annee;
	};
});

app.controller('DeposerController', function($scope, BackendService) {
	BackendService.all(function(resp) {
		$scope.enfants = resp.data;
	}, function(resp) {
		console.log(resp);
	});

	$scope.absent = function(enfant) {
		return !enfant.status || enfant.status != 'depose';
	};	
});

app.controller('AjouterEnfantController', function($scope, BackendService, $location) {

	var d = new Date();
	$scope.e = {
		'date_of_birth' : d,
		contacts: []
	}

	$scope.addContact = function(e) {
		e.contacts.push(
			{
				index: 1
			}
		);
	}

	$scope.add = function(enfant) {

		enfant.naissance = {
			annee : enfant.date_of_birth.getFullYear(),
			mois : enfant.date_of_birth.getMonth() + 1,
			jour : enfant.date_of_birth.getDate()
		};

		BackendService.ajouterEnfant(enfant, function(resp) {
			$location.path("/");
		}, function(resp) {
			console.error(resp);
		});
	}

	// var el = document.getElementById('menuAdd');
	// var elTop = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top;

	// window.addEventListener('scroll', function() {
	// 	console.log('scrol >>');
 //    if (document.documentElement.scrollTop > elTop){
 //        el.style.position = 'fixed';
 //        el.style.top = '0px';
 //    }
 //    else
 //    {
 //        el.style.position = 'static';
 //        el.style.top = 'auto';
 //    }
// });

});

/*
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
*/