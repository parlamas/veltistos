//src/app/page.tsx

"use client";   // Ensures client-side rendering
import { useEffect } from "react";
import Phaser from "phaser"; // Import Phaser

const Game = () => {
  useEffect(() => {
    // Phaser Game Config
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: function () {
          // Load assets
        },
        create: function () {
          // Initialize game objects
        },
        update: function () {
          // Game loop logic
        },
      },
    };

    // Initialize Phaser Game
    const game = new Phaser.Game(config);

    // Clean up Phaser instance on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-game"></div>; // Placeholder for the Phaser canvas
};

export default Game;

