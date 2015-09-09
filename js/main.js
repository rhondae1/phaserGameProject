var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var enemies;
var code;
var brackets;
var explosions;
var pops;
var music;
var fragmentSrc;
var count;
var shotTimer = 0;
var popp;
var e;
var c;
var b;
var cursors;
var fireButton;

var menu = {
  preload: function() {
    game.load.image("menu", "assets/menu.png", 800, 600);
    game.load.image("mute", "assets/mute.png");
  },

  create: function() {
  // Name of the game
    game.add.sprite(0, 0, 'menu');
    music = game.add.audio('super');

    music.play();


   var nameLabel = game.add.text(game.world.centerX, game.world.height-130, 'SuperSteve', { font: '80px Arial', fill: '#ff0000 ' });
   nameLabel.anchor.setTo(0.5, 0.5);
   // How to start the game
   var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'Press the up arrow key to start', { font: '25px Arial', fill: '#ffffff ' });
   startLabel.anchor.setTo(0.5, 0.5);  
   game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start(); 
   // Add a mute button
   this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);

   this.muteButton.input.useHandCursor = true;
   if (game.sound.mute) {
     this.muteButton.frame = 1;
   }
   // Start the game when the up arrow key is pressed
   var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   upKey.onDown.addOnce(this.start, this);
 },

 toggleSound: function() {
   game.sound.mute = ! game.sound.mute;
   this.muteButton.frame = game.sound.mute ? 1 : 0;  
 },

 start: function() {
   game.state.start('play'); 
 }
};

var play = {

  preload: function() {
    game.load.image('popp', 'assets/popp.png', 60, 60);
    game.load.image('code', 'assets/declare.png', 60, 60);
    game.load.image('brackets', 'assets/brackets.png', 60, 60);
    game.load.spritesheet('steve', 'assets/super-steve.png', 49, 37);
    game.load.spritesheet('bug', 'assets/enemies/Bug.png', 32, 32);
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio('super', ['assets/audio/supermanTheme.ogg']);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    music = game.add.audio('super');
    music.play();
    // background filter
    fragmentSrc = [

    "precision mediump float;",

    "uniform float     time;",
    "uniform vec2      resolution;",
    "uniform vec2      mouse;",

    "float noise(vec2 pos) {",
        "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
    "}",

    "void main( void ) {",

        "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
        "float pos = (gl_FragCoord.y / resolution.y);",
        "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
        "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

        "pos -= (distortion * distortion) * 0.1;",

        "float c = sin(pos * 400.0) * 0.4 + 0.4;",
        "c = pow(c, 0.2);",
        "c *= 0.2;",

        "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
        "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

        "c += distortion * 0.08;",
        "// noise",
        "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


        "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
    "}"
  ],

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];


    //scoreboard
     count = 0;
     text = game.add.text(25, 25, "Your Score: 0", {
         font: "16px Arial",
         fill: "#fff",
         align: "left"
     });

  
    code = game.add.group();
    code.enableBody = true;
    brackets = game.add.group();
    brackets.enableBody = true;
    game.time.events.loop(550, this.createCode, this);
    enemies = game.add.group();
    enemies.enableBody = true;
    game.time.events.loop(300, this.createSprite, this);
    enemies.scale.set(1.5);

    steve = game.add.sprite(700, 200, 'steve');
    steve.scale.set(2);

    game.physics.arcade.enable(steve);
    steve.body.bounce.y = 0.2;
    steve.body.gravity.y = 300;
    steve.body.collideWorldBounds = true;

    // steve.animations.add('left', [0], true);
    // steve.animations.add('right', [1], true);


    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    pops = game.add.group();
    game.physics.enable(pops, Phaser.Physics.ARCADE);
 
  },

  shoot: function() {

  if (shotTimer < game.time.now) {

    shotTimer = game.time.now + 275;

    if ('right') {
      popp = pops.create(steve.body.x + steve.body.width / 2 + 20, steve.body.y + steve.body.height / 2 - 4, 'popp');
    } 

    game.physics.enable(popp, Phaser.Physics.ARCADE);
    popp.outOfBoundsKill = true;
    popp.anchor.setTo(1.5, 0.5);
    popp.body.velocity.y = 0;

    if ('right') {
      popp.body.velocity.x = -400;
    }
  }
  },

  setupInvader: function (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
  },

  createSprite: function() {

    e = enemies.create(0, game.world.randomY, 'bug');
    e.animations.add('play', [0,1,2]);
    e.play('play', 3, true);
  },

  createCode: function() {

   c = code.create(0, game.world.randomY, 'code');
   b = brackets.create(0, game.world.randomY, 'brackets');
    
  },

  update: function() {


  enemies.setAll('x', 2, true, true, 1);
  code.setAll('x', 2, true, true, 1);
  brackets.setAll('x', 2, true, true, 1);

  enemies.forEach(this.checkSprite, this, true);

  cursors = game.input.keyboard.createCursorKeys();

   //  Run collision
  game.physics.arcade.overlap(enemies, steve, this.collisionHandler, null, this);
  game.physics.arcade.overlap(enemies, pops, this.popHandler, null, this);

  //  Reset the players velocity (movement)
  steve.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      steve.body.velocity.x = -150;

      steve.frame = 0;
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      steve.body.velocity.x = 150;

      steve.frame = 1;
  }
  else
  {
      //  Stand still
      steve.animations.stop();

      steve.frame = 0;
  }

  //  Allow the steve to jump around
  if (cursors.up.isDown)
  {
      steve.body.velocity.y = -150;
  }

  
  if (steve.alive){
    this.updateText();
    
  } 

  else {
    music.stop(); 
  }

  if(fireButton.isDown && steve.alive) {
    this.shoot();
  }

  filter.update(game.input.keyboard);
  },

  collisionHandler: function(bug, steve) {

    //  When steve hits a bug we kill them both
    bug.kill();
    steve.kill();
    

    //  And create an explosion
    explosion = explosions.getFirstExists(false);
    explosion.reset(bug.body.x, bug.body.y);
    explosion.play('kaboom', 30, false, true);

  },

  popHandler: function (bug, pops) {

    //  When popp hits a bug we kill them both
    bug.kill();
    pops.kill();


    //  And create an explosion
    explosion = explosions.getFirstExists(false);
    explosion.reset(bug.body.x, bug.body.y);
    explosion.play('kaboom', 30, false, true);

  },

  checkSprite: function(sprite) {

    try {
        if (sprite.x > game.width)
        {
            rip++;
            enemies.remove(sprite, true);
        }
    }
    catch (e)
    {
        // console.log(sprite);
    }

  },

  updateText: function () {

    count++;

    text.setText("Your Score: " + count);

  },
};

game.state.add("menu", menu);
game.state.add("play", play);
game.state.start("menu"); 