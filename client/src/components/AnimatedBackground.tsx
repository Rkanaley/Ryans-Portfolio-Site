import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background/95 min-h-screen">
      <div className="northern-lights">
        <div className="aurora"></div>
        <div className="aurora"></div>
        <div className="aurora"></div>
      </div>
      
      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${i % 5}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Responsive gradient that follows mouse */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(72,61,255,0.15),transparent)]" 
        style={{
          backgroundImage: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(72,61,255,0.15), transparent)`
        }}
      />
      
      {/* Additional background effects */}
      <div className="glass-effect"></div>
    </div>
  );
}