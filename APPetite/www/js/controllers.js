var myApp = angular.module('starter.controllers', ['ngCordova', 'ionic' ]);

myApp.controller('StartController', function($scope, $cordovaBarcodeScanner,$location) {
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            switch(imageData.text)
            {
                case "level1" : document.getElementById("button1").disabled=false;
                                document.getElementById("button2").disabled=true;
                                document.getElementById("button3").disabled=true;
                                document.getElementById("button4").disabled=true;
                                document.getElementById("button5").disabled=true; 
                                break;
                case "level2" : document.getElementById("button1").disabled=true;
                                document.getElementById("button2").disabled=false;
                                document.getElementById("button3").disabled=true;
                                document.getElementById("button4").disabled=true;
                                document.getElementById("button5").disabled=true; 
                                break;
                case "level3" : document.getElementById("button1").disabled=true;
                                document.getElementById("button2").disabled=true;
                                document.getElementById("button3").disabled=false;
                                document.getElementById("button4").disabled=true;
                                document.getElementById("button5").disabled=true; 
                                break;
                case "level4" : document.getElementById("button1").disabled=true;
                                document.getElementById("button2").disabled=true;
                                document.getElementById("button3").disabled=true;
                                document.getElementById("button4").disabled=false;
                                document.getElementById("button5").disabled=true; 
                                break;
                case "level5" : document.getElementById("button1").disabled=true;
                                document.getElementById("button2").disabled=true;
                                document.getElementById("button3").disabled=true;
                                document.getElementById("button4").disabled=true;
                                document.getElementById("button5").disabled=false; 
                                break;
                default : alert("you have scanned the wrong code");
                          document.getElementById("button1").disabled=true;
                          document.getElementById("button2").disabled=true;
                          document.getElementById("button3").disabled=true;
                          document.getElementById("button4").disabled=true;
                          document.getElementById("button5").disabled=true; 
                          break;
            }
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

    $scope.go = function ( path ) {
        alert(path);
        $location.path( path );
    };
});

myApp.controller('Level3Controller', function($scope, $cordovaBarcodeScanner,$location) {
    $scope.good = function(path)
    {
        alert("Succes you're a genius!!");
        $location.path( path );
    };
    $scope.wrong = function()
    {
        alert("please,try again");
    };
    
});
myApp.controller('game3Controller', function($scope, $cordovaBarcodeScanner,$location) {

});