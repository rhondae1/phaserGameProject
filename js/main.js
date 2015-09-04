var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;
var space;
var student;

function preload() {

    game.load.image('student', 'assets/student/student.png');

}



function create() {

cursors = game.input.keyboard.createCursorKeys();
space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

//Sets the boundaries of the game world
    game.world.setBounds(0, 0, 800, 600);
//Assigns steve's image to the variable card    
    student = game.add.sprite(200, 200, 'student');
//Follows steve's image
    game.camera.follow(student);
//Assigns keyboard input for controls to the variable cursors
    cursors = game.input.keyboard.createCursorKeys();
//Assigns spacebar input to the variable space
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//Enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
//Give physics to sprite
    game.physics.arcade.enable(student);

}




function update() {

if (cursors.up.isDown) {
    console.log("pushed up");
    card.y += -10;
}

if (cursors.left.isDown) {
    console.log("pushed left");
    card.x += -10;
}

if (cursors.right.isDown) {
    console.log("pushed right");
    card.x += 10;
}

if (cursors.down.isDown) {
    console.log("pushed down");
    card.y += 10;
}

if (space.isDown) {
    // card.body.bounce.y = 70;
    console.log("bitches!")
}


}

function render() {

    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(card, 32, 32);

}