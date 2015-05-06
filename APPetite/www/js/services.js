angular.module('starter.services', [])

.factory('AddressService', ['$http', '$q', function($http, $q) {
	return {
		getCoordinates: function(address) {
			var q = $q.defer();
			$http.get('http://nominatim.openstreetmap.org/search?q=' + address + '&format=json').
				success(function(data, status, headers, config) {
					q.resolve(data);
				});
			return q.promise;
		},
		getAddress: function(lat, lng) {
			var q = $q.defer();
			$http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1').
			success(function(data, status, headers, config) {
					q.resolve(data);
				});
			return q.promise;
		}
	}
}])