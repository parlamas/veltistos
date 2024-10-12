//src/app/page.tsx

"use client"; // Ensures the component is client-side only
import { useEffect } from 'react';
import * as Phaser from 'phaser'; // Correct Phaser import

const Game = () => {
  useEffect(() => {
    // Ensure this runs only on the client-side (browser)
    if (typeof window !== 'undefined') {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
          preload: function () {
            // Load assets
          },
          create: function () {
            // Create game objects
          },
          update: function () {
            // Update game objects
          },
        },
      };

      // Create the Phaser game instance
      new Phaser.Game(config);
    }
  }, []);

  return <div id="phaser-game"></div>;
};

export default Game;
