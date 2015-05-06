var myApp = angular.module('starter.controllers', ['ngCordova', 'ionic' ]);

myApp.controller('StartController', function($scope, $cordovaBarcodeScanner) {
	$scope.scanBarcode = function() {
		alert("geklikt");
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
});