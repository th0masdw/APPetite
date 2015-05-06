var myApp = angular.module('starter.controllers', ['ngCordova', 'ionic' ]);

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
    var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');

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

myApp.controller('MapController', function($scope, $location) {
    alert('in map controller');
});