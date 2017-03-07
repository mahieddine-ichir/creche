angular.module('app-services', [])
.service('BackendService', function($http) {

	return {
		all: function(sfn, efn) {
			$http({
  				method: 'GET',
  				url: '/enfants'
			}).then(function(resp) {
				sfn(resp);
			}, function(resp) {
				efn(resp);
			});
		}, 
		ajouterEnfant: function (enfant, sfn, efn) {
				$http({
  				method: 'POST',
  				url: '/enfants',
  				data: enfant
			}).then(function(resp) {
				sfn(resp);
			}, function(resp) {
				efn(resp);
			});
		}
	};

});