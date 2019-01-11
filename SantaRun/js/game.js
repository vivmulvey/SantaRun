// Creating the game scenes 
let gameScene = new Phaser.Scene('Game');
let menuScene = new Phaser.Scene('Menu');
let gameOverScene = new Phaser.Scene("GameOver");



//Creating the game over scene
gameOverScene.preload = function () {

    //Loading in my images
    this.load.image('background1', 'assets/Menu.jpg');
    this.load.image('reloadButton', 'assets/reload.png');
    this.load.image('homeButton', 'assets/home.png');

}

gameOverScene.create = function () {

    //creating the game over scene
    let background1 = this.add.sprite(0, 0, 'background1');
    let reloadButton = this.add.sprite(395, 85, 'reloadButton');
    let homeButton = this.add.sprite(390, 200, 'homeButton');
    this.replayText = this.add.text(60, 90, 'RESTART', {
        fontSize: '80px',
        fill: '#ffffff',
        fontFamily: 'Stylus BT'
    });
    this.homeText = this.add.text(130, 190, 'HOME', {
        fontSize: '80px',
        fill: '#ffffff',
        fontFamily: 'Stylus BT'
    });



    //setting origins
    background1.setOrigin(0, 0);
    reloadButton.setOrigin(0, 0);
    homeButton.setOrigin(0, 0);

    /*console.log("I have loaded");*/

    //Creating interactive buttons
    reloadButton.setInteractive();
    reloadButton.on('pointerdown', function () {

        this.scene.start(gameScene);
    }, this);

    homeButton.setInteractive();
    homeButton.on('pointerdown', function () {

        this.scene.start(menuScene);
    }, this);

}


//Creating the menu scene
menuScene.preload = function () {

    //Loading my images
    this.load.image('backgroundMenu', 'assets/Menu.jpg');
    this.load.image('playButton', 'assets/play.png');

}

menuScene.create = function () {

    //Creating the menu scene
    let backgroundMenu = this.add.sprite(0, 0, 'backgroundMenu');
    let playButton = this.add.sprite(390, 120, 'playButton');
    this.playText = this.add.text(200, 115, 'PLAY', {
        fontSize: '80px',
        fill: '#ffffff',
        fontFamily: 'Stylus BT'
    });


    //Setting origins
    backgroundMenu.setOrigin(0, 0);
    playButton.setOrigin(0, 0);

    //Creating interactive buttons
    playButton.setInteractive();
    playButton.on('pointerdown', function () {

        this.scene.start(gameScene);
    }, this);

}



// Creating the game scene
gameScene.preload = function () {

    //Loading my images
    this.load.image('background', 'assets/bg4.png');
    this.load.image('background1', 'assets/bg3.png');
    this.load.image('chimney', 'assets/Chimney.png');
    this.load.image('santa', 'assets/Santa.png');
    this.load.audio('Music', 'assets/Music.mp3');
    this.load.image('soundOffButton', 'assets/soundOff.png');
    this.load.image('soundOnButton', 'assets/soundOn.png');




    //Creating the loading time bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xa01323, 0.8);
    progressBox.fillRect(150, 150, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px Stylus BT',
            fill: '#03460b'
        }
    });

    //Creating the loading text
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px Stylus BT',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);


    //Creating the load animation
    this.load.on('progress', function (value) {
        console.log(value);
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(160, 160, 300 * value, 30);
    });


    this.load.on('progress', function (value) {
        console.log(value);
    });

    this.load.on('fileprogress', function (file) {
        console.log(file.src);
    });

    this.load.on('complete', function () {
        console.log('complete');
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
    });
};



// called once after the preload ends
gameScene.create = function () {

    //Setting score to 0
    score = 0;

    //Create hill background
    let bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0.0);

    //chimney configuration details
    this.chimneyMinX = 0;
    this.chimneyXorig = 1200;

    this.gameSpeed = 3;

    //adding the chimneys
    this.chimneys = this.add.group({
        key: 'chimney',
        repeat: 3,
        setXY: {
            x: 800,
            y: 235,
            stepX: 300,
            stepY: 0
        }
    });

    //The scrolling roof background
    gameScene.roof = gameScene.add.tileSprite(320, 320, 636, 110, 'background1');
    this.physics.add.existing(gameScene.roof);
    gameScene.roof.visible = true;

    //console.log(gameScene.roof);
    gameScene.roof.body.setCollideWorldBounds(true);

    console.log(gameScene.roof);


    //Adding physics to the chimneys
    this.physics.add.collider(this.chimneys, gameScene.roof);

    //Adding physics to santa
    this.santa = this.physics.add.sprite(55, 205, 'santa');

    this.santa.setCollideWorldBounds(true);

    this.physics.add.collider(this.santa, gameScene.roof);

    //Score box 
    this.scoreText = this.add.text(555, 8, 'SCORE: 0', {
        fontSize: '16px',
        fill: '#ffffff',
        fontFamily: 'Stylus BT'
    });



    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    //Interactive pointer
    this.pointer = this.input.activePointer;

    //Loading in the music
    this.music = this.sound.add("Music");
    this.music.play();

    //Creating sound off button
    let soundOffButton = this.add.sprite(510, 20, 'soundOffButton');
    soundOffButton.setScale(0.5);
    bg.setOrigin(0.0);

    //Interactive sound off button
    soundOffButton.setInteractive();
    soundOffButton.on('pointerdown', function () {
        this.music.pause();
    }, this);

    //Creating sound on button
    let soundOnButton = this.add.sprite(458, 20, 'soundOnButton');
    soundOnButton.setScale(0.5);
    bg.setOrigin(0.0);

    //Interactive sound on button
    soundOnButton.setInteractive();
    soundOnButton.off('pointerdown', function () {
        this.music.play();
    }, this);


};


gameScene.update = function () {

    //Scrolling roof 
    gameScene.roof.tilePositionX += this.gameSpeed;



    //Making santa jump with mouse click
    if (this.pointer.isDown == true && this.santa.body.touching.down) {
        console.log("Mouse Clicked");
        this.santa.setVelocityY(-250);
    }

    //Creating a group of chimneys
    let chimneys = this.chimneys.getChildren();
    let numChimneys = chimneys.length;

    for (let i = 0; i < numChimneys; i++) {

        // move chimneys
        chimneys[i].x -= this.gameSpeed;

        // if chimneys reach left side move them back offscreen to the right
        if (chimneys[i].x <= this.chimneyMinX) {
            chimneys[i].x = this.chimneyXorig;

            //Incrementing the score 
            score += 10;
            this.scoreText.setText('Score: ' + score);

        }

        // Collision detector
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.santa.getBounds(), chimneys[i].getBounds())) {
            this.gameOver();
            break;
        }

    }
};

//Game over function
gameScene.gameOver = function () {
    //Stopping the music
    this.music.stop();
    this.scene.start(gameOverScene);

    // restart game
    this.time.delayedCall(500, function () {}, [], this);

}


// set the configuration of the game
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 400
            },
            debug: false
        }
    },
    scene: [menuScene, gameScene, gameOverScene],
    pixelArt: true

};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
