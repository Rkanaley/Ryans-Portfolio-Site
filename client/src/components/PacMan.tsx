import { useEffect, useRef, useState } from 'react';

export default function PacMan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    // Pac-Man properties
    let pacX = 50;
    let pacY = canvas.height / (2 * dpr);
    const pacRadius = 30;
    const pacSpeed = 3;
    let pacMouthAngle = 0;
    let mouthDirection = 1;

    // White balls properties
    const balls: Array<{ x: number; y: number }> = [];
    const ballRadius = 5;
    const ballSpacing = 100;
    
    // Create balls in multiple rows
    for (let j = 1; j <= 3; j++) {
      for (let i = 1; i <= canvas.width / (ballSpacing * dpr); i++) {
        balls.push({ x: i * ballSpacing, y: j * 100 });
      }
    }

    // Draw functions
    const drawPacMan = () => {
      ctx.beginPath();
      ctx.arc(
        pacX,
        pacY,
        pacRadius,
        Math.PI * (0.2 + pacMouthAngle),
        Math.PI * (1.8 - pacMouthAngle)
      );
      ctx.lineTo(pacX, pacY);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      ctx.closePath();
    };

    const drawBalls = () => {
      ctx.fillStyle = 'white';
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        if (ball.x > pacX - pacRadius && ball.x < pacX + pacRadius &&
            Math.abs(ball.y - pacY) < pacRadius) {
          balls.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        pacY = Math.max(pacRadius, pacY - 20);
      }
      if (e.key === 'ArrowDown') {
        pacY = Math.min(canvas.height / dpr - pacRadius, pacY + 20);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Update Pac-Man position
      pacX += pacSpeed;
      if (pacX - pacRadius > canvas.width / dpr) {
        pacX = -pacRadius;
      }

      // Animate Pac-Man's mouth
      pacMouthAngle += 0.05 * mouthDirection;
      if (pacMouthAngle > 0.3 || pacMouthAngle < 0) {
        mouthDirection *= -1;
      }

      drawPacMan();
      drawBalls();

      requestIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      pacY = canvas.height / (2 * dpr);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown);
    animate();

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (error) return <div>Failed to load animation: {error}</div>;

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        style={{ 
          background: 'black',
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
