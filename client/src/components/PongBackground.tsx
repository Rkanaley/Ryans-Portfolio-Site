import { useEffect, useRef } from 'react';

export default function PongBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Initialize game state first
      const gameState = {
        ball: {
          x: 0,
          y: 0,
          radius: 8,
          dx: 4,
          dy: 4
        },
        paddleHeight: 80,
        paddleWidth: 10,
        leftPaddle: {
          y: 0,
          speed: 3,
          direction: 1
        },
        rightPaddle: {
          y: 0,
          speed: 3,
          direction: 1
        }
      };

      // Function to update positions
      const updatePositions = (width: number, height: number) => {
        gameState.ball.x = width / 2;
        gameState.ball.y = height / 2;
        gameState.leftPaddle.y = height / 2 - gameState.paddleHeight / 2;
        gameState.rightPaddle.y = height / 2 - gameState.paddleHeight / 2;
      };

      // Set canvas size with proper device pixel ratio
      const resize = () => {
        const container = canvas.parentElement;
        if (!container) return;
        
        const dpr = window.devicePixelRatio || 1;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        ctx.scale(dpr, dpr);
        
        // Update game object positions
        updatePositions(width, height);
      };

      // Initial resize
      resize();
      window.addEventListener('resize', resize);

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
    } catch (err) {
      console.error('Error in PongBackground component:', err);
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
