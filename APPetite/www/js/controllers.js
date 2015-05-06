var myApp = angular.module('starter.controllers', ['leaflet-directive', 'ngCordova', 'ionic' ]);

myApp.controller('MenuController', function($scope, $location) {
    $scope.play = function(path) {
        $location.path( path );
    };
    $scope.map = function(path) {
        $location.path( path );
    };
});

myApp.controller('PlayController', function($scope, $cordovaBarcodeScanner,$location) {
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
    var game = new Phaser.Game(400, 500, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('bird', 'assets/frie.png');
        game.load.image('pipe', 'assets/fork.png');

        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');

        game.load.image('jumpbutton', 'assets/jump.png');


    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        this.bird = this.game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5);

        var jumpbutton = game.add.button(game.world.centerX - 40, 420, 'jumpbutton', this.jump, this, 2, 1, 0);

        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');


        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.minWidth = this.game.width / 2;
        this.scale.minHeight = this.game.height / 2;
        this.scale.pageAlignHorizontally = false;
        this.scale.pageAlignVertically = true;
        if (this.game.device.desktop)
        {
            this.scale.maxWidth = this.game.width;
            this.scale.maxHeight = this.game.height;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.maxWidth = this.game.width * 2.5;
            this.scale.maxHeight = this.game.height * 2.5;
            this.scale.forceOrientation(false, true);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
        this.scale.refresh();

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';
        this.scale.setScreenSize(true);

    },


    update: function() {
        if (this.bird.inWorld == false)
            this.restartGame();

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        // Slowly rotate the bird downward, up to a certain point.
        if (this.bird.angle < 20)
            this.bird.angle += 1;
    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1)
                this.addOnePipe(400, i*60+10);

        this.score += 1;
        this.labelScore.text = this.score;
    },
};
game.state.add('main', mainState);
game.state.start('main');
});

myApp.controller('MapController', function($scope) {
    // Give the map the height of the window without the overlay bars
    $('#map').height($( window ).height());

    var center = {}; 
    center.lat = 51.22894;     //MAS Museum
    center.lng = 4.405197;
    zoom = 15;
    
    //$scope.map = new L.Map('map');
    $scope.map = new L.map('map', {
        center: center,
        zoom: zoom,
        maxZoom: 20,
        zoomControl: false,
        doubleClickZoom: false,
        scrollWheelZoom: true,
        touchZoom: true,
        /*path: {
            weight: 10,
            color: '#800000',
            opacity: 1
        }*/
    });
    L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {}).addTo($scope.map);
    $scope.map.attributionControl.setPrefix('');

    var marker = L.marker([51.22894, 4.405197]).addTo($scope.map);
    marker.bindPopup("<b>MAS Museum</b>").openPopup();

    // double click
    // $scope.map.on('dblclick', function(event, locationEvent){ });

    // right-click
    //$scope.map.on('contextmenu', function(e){ });

    $scope.map.on('zoomstart', function(e) {
    });
    $scope.map.on('zoomend', function(e) {
    });
})