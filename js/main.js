

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('com', 'assets/computer_monitors.png');
    game.load.image('pop', 'assets/pop.png', 60, 60);
    game.load.spritesheet('sun', 'assets/enemies/hot_sun.png', 32, 32);
    game.load.spritesheet('bug', 'assets/enemies/Bug.png', 32, 32);
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);

}

var enemies;
var explosions;
var pops;




function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //scoreboard
   count = 0;
   text = game.add.text(25, 25, "Your Score: 0", {
       font: "16px Arial",
       fill: "#fff",
       align: "left"
   });

  
  // game.add.sprite(68, 100, 'com');
  enemies = game.add.group();
  enemies.enableBody = true;
  game.time.events.loop(550, createSprite, this);

  hotSun = game.add.sprite(700, 200, 'sun');
  hotSun.scale.set(2);

  game.physics.arcade.enable(hotSun);
  hotSun.body.bounce.y = 0.2;
  hotSun.body.gravity.y = 300;
  hotSun.body.collideWorldBounds = true;

  hotSun.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
  hotSun.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);


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

    var pop;
    if ('right') {
      pop = pops.create(hotSun.body.x + hotSun.body.width / 2 + 20, hotSun.body.y + hotSun.body.height / 2 - 4, 'pop');
    } 

    game.physics.enable(pop, Phaser.Physics.ARCADE);
    pop.outOfBoundsKill = true;
    pop.anchor.setTo(0.5, 0.5);
    pop.body.velocity.y = 0;

    if ('right') {
      pop.body.velocity.x = -400;
    }
  }
}



function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function createSprite() {

   var e = enemies.create(0, game.world.randomY, 'bug');
    e.animations.add('play', [0,1,2]);
    e.play('play', 3, true);

}

function update() {


  enemies.setAll('x', 2, true, true, 1);

  enemies.forEach(checkSprite, this, true);

  cursors = game.input.keyboard.createCursorKeys();

   //  Run collision
  game.physics.arcade.overlap(enemies, hotSun, collisionHandler, null, this);
  game.physics.arcade.overlap(enemies, pops, popHandler, null, this);

  //  Reset the players velocity (movement)
  hotSun.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      hotSun.body.velocity.x = -150;

      hotSun.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      hotSun.body.velocity.x = 150;

      hotSun.animations.play('right');
  }
  else
  {
      //  Stand still
      hotSun.animations.stop();

      hotSun.frame = 5;
  }

  //  Allow the hotSun to jump around
  if (cursors.up.isDown)
  {
      hotSun.body.velocity.y = -150;
  }

  
  if (hotSun.alive){
    updateText();
    
  } 

  if(fireButton.isDown) {
    shoot();
  }
}

function collisionHandler (bug, hotSun) {

    //  When hotSun hits a bug we kill them both
    bug.kill();
    hotSun.kill();


    //  And create an explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bug.body.x, bug.body.y);
    explosion.play('kaboom', 30, false, true);

}

function popHandler (bug, pops) {

    //  When pop hits a bug we kill them both
    bug.kill();
    pops.kill();


    //  And create an explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bug.body.x, bug.body.y);
    explosion.play('kaboom', 30, false, true);

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

    count++;

    text.setText("Your Score: " + count);

} 





