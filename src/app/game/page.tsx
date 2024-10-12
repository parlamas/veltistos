//src/app/page.tsx

"use client";   // Required for client-side rendering
import { useEffect } from "react";
import * as Phaser from 'phaser'; // Use the named import
//import { clearScreenDown } from "readline";

const Game = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
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

      new Phaser.Game(config);  // Initialize Phaser only on client
    }
  }, []);

  return <div id="phaser-game"></div>;
};

export default Game;