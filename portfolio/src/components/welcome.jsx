import { useEffect, useState } from "react";
import Squares from "./Squares"; // Make sure this component exists

export default function Welcome() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateRotation = (clientX, clientY) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateY = ((clientX - centerX) / centerX) * 15;
      const rotateX = -((clientY - centerY) / centerY) * 15;
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseMove = (e) => {
      updateRotation(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      updateRotation(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* 🟣 Animated Squares Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor="#444"
          hoverFillColor="#555"
        />
      </div>

      {/* 🟡 Foreground Content */}
      <div
        className="relative z-10 flex justify-center items-center h-full p-4"
        style={{ perspective: "1000px" }}
      >
        <h1
          className="text-5xl sm:text-7xl font-extrabold tracking-wider select-none"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.1s ease-out",
            background: "linear-gradient(135deg, #e6e6e6, #aaaaaa, #f5f5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 8px rgba(255,255,255,0.05), 0 0 16px rgba(255,255,255,0.08)",
            cursor: "default",
          }}
        >
          WELCOME
        </h1>
      </div>
    </div>
  );
}
