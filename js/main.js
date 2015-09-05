

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var GameState = function(game) {
    this.MAX_MISSILES = 3; // number of missiles
};

function preload() {
    game.load.image('com', 'assets/computer_monitors.png');
    game.load.spritesheet('sun', 'assets/enemies/hot_sun.png', 32, 32);
    game.load.spritesheet('bug', 'assets/enemies/Bug.png', 32, 32);

}

var enemies;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // game.add.sprite(68, 100, 'com');
  enemies = game.add.group();

  hotSun = game.add.sprite(0, 0, 'sun');

  for (var i = 0; i < 8; i++)
    {
        createBugs();
    }

  game.input.onTap.add(createBugs, this);

  function createBugs() {

    enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200,'bug');
    enemies.callAll('animations.add', 'animations', 'bug', [0,1,2], 10, true);
    enemies.callAll('play', null, 'bug');
}



  game.physics.arcade.enable(hotSun);
  hotSun.body.bounce.y = 0.2;
  hotSun.body.gravity.y = 300;
  hotSun.body.collideWorldBounds = true;

  hotSun.animations.add('play', [0, 1, 2, 3, 4, 5], 10, true);
  hotSun.animations.play('play');
  


  
}

function update() {

  game.physics.arcade.collide(hotSun);



}