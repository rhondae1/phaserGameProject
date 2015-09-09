var loadState = {
  
  preload: function() {

    var loadingLabel = game.add.text(80, 150, 'loading....', 
                                    {font: '30px Courier', fill: '#ffffff'});

        game.load.image('menu', 'assets/menu.png');
        game.load.audio('theme', 'Superman_Theme.mp3')
        game.load.image('mute', 'assets/mute.png');
        game.load.image('player', 'assets/player/player.png');
        game.load.image('com', 'assets/computer_monitors.png');
        game.load.spritesheet('sun', 'assets/enemies/hot_sun.png', 32, 32);
        game.load.spritesheet('bug', 'assets/enemies/Bug.png', 32, 32);

  },

  create: function() {

        game.state.start('menu'); 
  },

};