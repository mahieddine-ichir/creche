var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);
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
	.otherwise({
		redirectTo: '/deposer'
	});

});

app.controller('DeposerController', function($scope) {
	$scope.eleves = [{
		name: 'Mouloud Ben Messaoud',
		age: '3',
		image: 'jenkins.jpg'
	}, {
		name: 'Mederreg Adil',
		age: '1',
		image: 'mic.jpg'
	}];
});

/*
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
*/