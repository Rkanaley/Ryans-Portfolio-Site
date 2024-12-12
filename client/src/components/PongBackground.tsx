import { useEffect, useRef } from 'react';

export default function PongBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with proper device pixel ratio
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    // Game objects
    const gameState = {
      ball: {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 8,
        dx: 4,
        dy: 4
      },
      paddleHeight: 80,
      paddleWidth: 10,
      leftPaddle: {
        y: canvas.height / 2 - 40,
        speed: 3,
        direction: 1
      },
      rightPaddle: {
        y: canvas.height / 2 - 40,
        speed: 3,
        direction: 1
      }
    };

    // Animation
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ball
      ctx.beginPath();
      ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(48, 102, 190, 0.2)';
      ctx.fill();
      ctx.closePath();

      // Draw paddles
      ctx.fillStyle = 'rgba(48, 102, 190, 0.15)';
      ctx.fillRect(0, gameState.leftPaddle.y, gameState.paddleWidth, gameState.paddleHeight);
      ctx.fillRect(
        canvas.width - gameState.paddleWidth,
        gameState.rightPaddle.y,
        gameState.paddleWidth,
        gameState.paddleHeight
      );

      // Move ball
      gameState.ball.x += gameState.ball.dx;
      gameState.ball.y += gameState.ball.dy;

      // Ball collision with top and bottom
      if (
        gameState.ball.y + gameState.ball.radius > canvas.height ||
        gameState.ball.y - gameState.ball.radius < 0
      ) {
        gameState.ball.dy = -gameState.ball.dy;
      }

      // Ball collision with paddles
      if (
        (gameState.ball.x - gameState.ball.radius < gameState.paddleWidth &&
          gameState.ball.y > gameState.leftPaddle.y &&
          gameState.ball.y < gameState.leftPaddle.y + gameState.paddleHeight) ||
        (gameState.ball.x + gameState.ball.radius > canvas.width - gameState.paddleWidth &&
          gameState.ball.y > gameState.rightPaddle.y &&
          gameState.ball.y < gameState.rightPaddle.y + gameState.paddleHeight)
      ) {
        gameState.ball.dx = -gameState.ball.dx;
      }

      // Reset ball if it goes past paddles
      if (gameState.ball.x < 0 || gameState.ball.x > canvas.width) {
        gameState.ball.x = canvas.width / 2;
        gameState.ball.y = canvas.height / 2;
      }

      // Move paddles
      gameState.leftPaddle.y += gameState.leftPaddle.speed * gameState.leftPaddle.direction;
      gameState.rightPaddle.y += gameState.rightPaddle.speed * gameState.rightPaddle.direction;

      // Paddle collision with top and bottom
      if (
        gameState.leftPaddle.y <= 0 ||
        gameState.leftPaddle.y + gameState.paddleHeight >= canvas.height
      ) {
        gameState.leftPaddle.direction *= -1;
      }
      if (
        gameState.rightPaddle.y <= 0 ||
        gameState.rightPaddle.y + gameState.paddleHeight >= canvas.height
      ) {
        gameState.rightPaddle.direction *= -1;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ background: 'transparent' }} />;
}
