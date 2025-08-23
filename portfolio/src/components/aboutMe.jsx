import { useRef, useState, useEffect } from "react";

const techCategories = [
  { title: "Languages", items: ["C", "C++", "Java", "Python", "HTML", "CSS", "JavaScript", "SQL"] },
  { title: "Frontend", items: ["React.js", "Tailwind", "Material UI", "Radix UI", "Tkinter"] },
  { title: "Backend", items: ["Express.js", "Flask", "REST APIs", "Node.js", "JWT"] },
  { title: "Databases", items: ["PostgreSQL"] },
  { title: "Tools", items: ["Git", "Figma", "Postman", "Babel", "Docker"] },
  { title: "Other", items: ["CLI Tools", "Linux", "VS Code"] },
];

export default function TechCarousel3D() {
  const [currDeg, setCurrDeg] = useState(0);
  const requestRef = useRef(null);

  // Dragging refs
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  // Auto-spin control
  const autoSpin = useRef(true);
  const resumeTimeout = useRef(null);

  const step = 360 / techCategories.length;
  const radius = 280;

  const normalizeAngle = (angle) => {
    let a = angle % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  };

  // Animation loop
  useEffect(() => {
    let lastTime = null;
    const spinSpeed = 0.007; // base auto-spin speed

    const animate = (time) => {
      if (lastTime !== null) {
        const delta = time - lastTime;

        if (isDragging.current) {
          // Dragging, no auto-spin
        } else if (autoSpin.current) {
          // Auto-spin mode
          setCurrDeg((deg) => deg - spinSpeed * delta);
        } else if (Math.abs(velocity.current) > 0.01) {
          // Inertia after drag
          setCurrDeg((deg) => deg + velocity.current);
          velocity.current *= 0.95;
        }
      }
      lastTime = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Handle drag start
  const handlePointerDown = (e) => {
    isDragging.current = true;
    autoSpin.current = false; // stop auto-spin immediately
    clearTimeout(resumeTimeout.current);

    lastX.current = e.clientX || e.touches[0].clientX;
  };

  // Handle drag move
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const deltaX = clientX - lastX.current;

    setCurrDeg((deg) => deg + deltaX * 0.5);
    velocity.current = deltaX * 0.2;

    lastX.current = clientX;
  };

  // Handle drag end
  const handlePointerUp = () => {
    isDragging.current = false;
    // Wait 2 seconds, then resume auto-spin
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      autoSpin.current = true;
      velocity.current = 0;
    }, 500);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 relative overflow-hidden select-none"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* About Me */}
      <div className="mb-20 max-w-[750px] text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-3">Hi, I'm Ayush 👋</h2>
        <p className="text-gray-300 leading-relaxed max-w-[600px] mx-auto">
          Full-stack developer passionate about creating fast, accessible, and elegant solutions.
          Skilled in crafting modern UIs with React, robust backends with Node.js, and data handling with PostgreSQL.
        </p>
      </div>

      {/* 3D Carousel */}
      <div className="relative w-[300px] h-[300px]" style={{ perspective: "1000px" }}>
        <div
          className="w-full h-full absolute transition-transform duration-75 ease-linear"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${currDeg}deg)`,
          }}
        >
          {techCategories.map((cat, i) => {
            const cardAngle = i * step;
            const angleDiff = normalizeAngle(currDeg * -1 - cardAngle);
            const distFactor = Math.min(Math.abs(angleDiff) / (step / 2), 1);

            const scale = 1.1 - distFactor * 0.2;
            const opacity = 1 - distFactor * 0.6;
            const borderOpacity = 0.4 - distFactor * 0.3;
            const bgOpacity = 0.15 - distFactor * 0.09;

            return (
              <div
                key={i}
                className="absolute w-[240px] h-[260px] rounded-lg p-4 flex flex-col items-center justify-start gap-3 shadow-xl"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  background: `rgba(255,255,255,${bgOpacity})`,
                  border: `1px solid rgba(255,255,255,${borderOpacity})`,
                  opacity: opacity,
                }}
              >
                <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                <div className="flex flex-wrap justify-center gap-1.5 text-xs text-gray-200">
                  {cat.items.map((it, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-full transition-all ${
                        distFactor < 0.3
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-white/[0.08] hover:bg-white/[0.15]"
                      }`}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
