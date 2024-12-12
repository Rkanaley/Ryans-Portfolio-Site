import { useEffect, useRef, useState } from 'react';

export default function PacMan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error('Canvas element not found');
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Pac-Man properties
      let pacX = 50;
      let pacY = canvas.height / 2;
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
        for (let i = 1; i <= canvas.width / ballSpacing; i++) {
          balls.push({ x: i * ballSpacing, y: j * 100 });
        }
      }

      // Draw Pac-Man
      function drawPacMan() {
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
      }

      // Draw balls
      function drawBalls() {
        ctx.fillStyle = 'white';
        for (let i = balls.length - 1; i >= 0; i--) {
          const ball = balls[i];
          if (ball.x > pacX - pacRadius && ball.x < pacX + pacRadius &&
              Math.abs(ball.y - pacY) < pacRadius) {
            // Pac-Man "eats" the ball
            balls.splice(i, 1);
          } else {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
          }
        }
      }

      // Handle keyboard input
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') pacY = Math.max(pacRadius, pacY - 20);
        if (e.key === 'ArrowDown') pacY = Math.min(canvas.height - pacRadius, pacY + 20);
      };

      document.addEventListener('keydown', handleKeyDown);

      // Animation loop
      let animationFrameId: number;

      function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update Pac-Man position
        pacX += pacSpeed;
        if (pacX - pacRadius > canvas.width) {
          pacX = -pacRadius;
        }

        // Animate Pac-Man's mouth
        pacMouthAngle += 0.05 * mouthDirection;
        if (pacMouthAngle > 0.3 || pacMouthAngle < 0) {
          mouthDirection *= -1;
        }

        drawPacMan();
        drawBalls();

        animationFrameId = requestAnimationFrame(update);
      }

      // Handle window resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      // Start animation
      update();

      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
      };
    } catch (err) {
      console.error('Error in PacMan component:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  if (error) {
    return <div className="fixed inset-0 -z-10 flex items-center justify-center">Failed to load animation: {error}</div>;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'black' }}
    />
  );
}
