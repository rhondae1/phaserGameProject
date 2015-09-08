

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


var Bullet = function (game, key) {

  Phaser.Sprite.call(this, game, 0, 0, key);

  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;

  this.tracking = false;
  this.scaleSpeed = 0;

};

Weapon.SingleBullet = function (game) {

  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 100;

  for (var i = 0; i < 64; i++)
  {
      this.add(new Bullet(game, 'bullet5'), true);
  }

  return this;

};

Weapon.SingleBullet.prototype.fire = function (source) {

  if (this.game.time.time < this.nextFire) { return; }

  var x = source.x + 10;
  var y = source.y + 10;

  this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

  this.nextFire = this.game.time.time + this.fireRate;

};

function preload() {
    game.load.image('com', 'assets/computer_monitors.png');
    game.load.spritesheet('sun', 'assets/enemies/hot_sun.png', 32, 32);
    game.load.spritesheet('bug', 'assets/enemies/Bug.png', 32, 32);
    game.load.spritesheet('pop', 'assets/pop.png', 60, 60);
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

  // for (var i = 0; i < 8; i++) {
  //   var e = enemies.create(game.world.randomX, game.world.randomY, 'bug');
  //   e.animations.add('play', [0,1,2]);
  //   e.play('play', 20, true);
  //   e.scale.set(2);
    
  //   // game.physics.enable(e, Phaser.Physics.ARCADE);
  //   // e.body.velocity.x = game.rnd.integerInRange(-200, 200);
  //   // e.body.velocity.y = game.rnd.integerInRange(-200, 200);
  //       // createBugs();
  // }


  game.physics.arcade.enable(hotSun);
  hotSun.body.bounce.y = 0.2;
  hotSun.body.gravity.y = 300;
  hotSun.body.collideWorldBounds = true;

  hotSun.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
  hotSun.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);

  // hotSun.animations.add('play', [0, 1, 2, 3, 4, 5], 10, true);
  // hotSun.animations.play('play');
  
  // enemies.sortDirection = Phaser.Physics.Arcade.LEFT_RIGHT;

  //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 
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

  enemies.setAll('x', 2, true, true, 1);

  enemies.forEach(checkSprite, this, true);

  cursors = game.input.keyboard.createCursorKeys();

   //  Run collision
  game.physics.arcade.overlap(enemies, hotSun, collisionHandler, null, this);

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

}

function collisionHandler (bug, hotSun) {

    //  When hotSun hits a bug we kill them both
    bug.kill();
    hotSun.kill();


    //  And create an explosion :)
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





