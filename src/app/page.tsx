//src/app/page.tsx
//import Image from "next/image";

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Centers horizontally
      alignItems: 'center',     // Centers vertically
      height: '100vh',          // Full viewport height
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the Knowledge Marketplace!</h1>
        <p>Buy and sell knowledge with your points.</p>
      </div>
    </div>
      );
    }

