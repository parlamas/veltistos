// src/app/game/Game.tsx
import { useEffect } from 'react';
import * as Phaser from 'phaser';

const Game = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
          preload: function () {
            // Load assets here
          },
          create: function () {
            // Create game objects here
          },
          update: function () {
            // Update game loop
          },
        },
      };

      // Create a new Phaser game instance
      new Phaser.Game(config);
    }
  }, []);

  return <div id="phaser-game"></div>;
};

export default Game;
