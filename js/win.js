var winState = {
  
  create: function() {

    var winLabel = game.add.text(80, 80, 'You Won!', {
                                  font: '50px, Arial', fill: '#00FF00' });

    var startLabel = game.add.text(80, game.world.height-80, 'Press the "W" key to restart', {
                                  font: '22px, Arial', fill: '#ffffff' });


        var wKey = game.input.keyboard.addKey(Phaser, Keyboard.W);

        wkey.onDown.addOnce(this.restart, this);
  },

  restart: function() {
    game.state.start('menu');
  },

}