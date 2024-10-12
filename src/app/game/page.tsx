// src/app/game/page.tsx

"use client";
import dynamic from 'next/dynamic';

// Dynamically import the Game component, disabling SSR
const GameComponent = dynamic(() => import('./Game'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Page() {
  return <GameComponent />;
}
