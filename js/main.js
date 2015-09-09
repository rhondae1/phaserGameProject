var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('popp', 'assets/popp.png', 60, 60);
    game.load.image('code', 'assets/declare.png', 60, 60);
    game.load.image('brackets', 'assets/brackets.png', 60, 60);
    game.load.spritesheet('steve', 'assets/super-steve.png', 49, 37);
    game.load.spritesheet('bug', 'assets/enemies/Bug.png', 32, 32);
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio('super', ['assets/audio/supermanTheme.ogg']);

}

var enemies;
<<<<<<< HEAD
var count;
var text;
var timer;
=======
var code;
var brackets;
var explosions;
var pops;
var music;



>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

<<<<<<< HEAD
  //scoreboard
    count = 0;
    text = game.add.text(25, 25, "Your Score: 0", {
        font: "16px Arial",
        fill: "#fff",
        align: "left"
    });
=======
  music = game.add.audio('super');

  music.play();


  // background filter
  var fragmentSrc = [

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
  ];

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

>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd
  
  code = game.add.group();
  code.enableBody = true;
  brackets = game.add.group();
  brackets.enableBody = true;
  game.time.events.loop(550, createCode, this);
  enemies = game.add.group();
  enemies.enableBody = true;
  game.time.events.loop(300, createSprite, this);
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
    explosions.forEach(setupInvader, this);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    pops = game.add.group();
    game.physics.enable(pops, Phaser.Physics.ARCADE);
 
}

var shotTimer = 0;
function shoot() {

  if (shotTimer < game.time.now) {

    shotTimer = game.time.now + 275;

    var popp;
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
}



function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

<<<<<<< HEAD
//Scoreboard

  
=======
>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd
}

function createSprite() {

   var e = enemies.create(0, game.world.randomY, 'bug');
    e.animations.add('play', [0,1,2]);
    e.play('play', 3, true);

}

function createCode() {

   var c = code.create(0, game.world.randomY, 'code');
   var b = brackets.create(0, game.world.randomY, 'brackets');
   

}

function update() {

<<<<<<< HEAD
 
  // game.physics.arcade.collide(hotSun);
  
  // game.physics.arcade.collide(enemies);

  // if (game.input.mousePointer.isDown)
  //   {
  //       //  First is the callback
  //       //  Second is the context in which the callback runs, in this case game.physics.arcade
  //       //  Third is the parameter the callback expects - it is always sent the Group child as the first parameter
  //       enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
  //   }
  //   else
  //   {
  //       enemies.setAll('body.velocity.x', 0);
  //       enemies.setAll('body.velocity.y', 0);
  //   }
=======
>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd

  enemies.setAll('x', 2, true, true, 1);
  code.setAll('x', 2, true, true, 1);
  brackets.setAll('x', 2, true, true, 1);

  enemies.forEach(checkSprite, this, true);

  cursors = game.input.keyboard.createCursorKeys();

   //  Run collision
  game.physics.arcade.overlap(enemies, steve, collisionHandler, null, this);
  game.physics.arcade.overlap(enemies, pops, popHandler, null, this);

  //  Reset the players velocity (movement)
  steve.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      steve.body.velocity.x = -150;

<<<<<<< HEAD
      hotSun.animations.play('left');

=======
      steve.frame = 0;
>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd
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
    updateText();
    
  } 

  else {
    music.stop(); 
  }

  if(fireButton.isDown && steve.alive) {
    shoot();
  }

<<<<<<< HEAD
    updateText();
=======
  filter.update(game.input.keyboard);
}

function collisionHandler (bug, steve) {

    //  When steve hits a bug we kill them both
    bug.kill();
    steve.kill();
    

    //  And create an explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bug.body.x, bug.body.y);
    explosion.play('kaboom', 30, false, true);

}

function popHandler (bug, pops) {

    //  When popp hits a bug we kill them both
    bug.kill();
    pops.kill();


    //  And create an explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bug.body.x, bug.body.y);
    explosion.play('kaboom', 30, false, true);
>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd

}

function checkSprite(sprite) {

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

}

function updateText() {
<<<<<<< HEAD
=======

    count++;

    text.setText("Your Score: " + count);

} 



>>>>>>> ae8abcd1d08268355005ab3b19d90dd197c69bbd

    count++;

    text.setText("- Your Score: " + count);

}
