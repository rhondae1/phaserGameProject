

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('sun', 'assets/enemies/hot_sun.png', 32, 32);

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  hotSun = game.add.sprite(0, 0, 'sun');

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