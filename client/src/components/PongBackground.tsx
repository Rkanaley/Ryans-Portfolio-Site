import { useEffect, useRef } from 'react';

export default function PongBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Game objects
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 8,
      dx: 4,
      dy: 4
    };

    const paddleHeight = 80;
    const paddleWidth = 10;
    const leftPaddle = {
      y: canvas.height / 2 - paddleHeight / 2,
      speed: 3,
      direction: 1
    };
    const rightPaddle = {
      y: canvas.height / 2 - paddleHeight / 2,
      speed: 3,
      direction: 1
    };

    // Animation
    function animate() {
      // Clear canvas
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(48, 102, 190, 0.2)';
      ctx.fill();
      ctx.closePath();

      // Draw paddles
      ctx.fillStyle = 'rgba(48, 102, 190, 0.15)';
      ctx.fillRect(0, leftPaddle.y, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, rightPaddle.y, paddleWidth, paddleHeight);

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Ball collision with top and bottom
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }

      // Ball collision with paddles
      if (
        (ball.x - ball.radius < paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x + ball.radius > canvas.width - paddleWidth && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
      ) {
        ball.dx = -ball.dx;
      }

      // Reset ball if it goes past paddles
      if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }

      // Move paddles
      leftPaddle.y += leftPaddle.speed * leftPaddle.direction;
      rightPaddle.y += rightPaddle.speed * rightPaddle.direction;

      // Paddle collision with top and bottom
      if (leftPaddle.y <= 0 || leftPaddle.y + paddleHeight >= canvas.height) {
        leftPaddle.direction *= -1;
      }
      if (rightPaddle.y <= 0 || rightPaddle.y + paddleHeight >= canvas.height) {
        rightPaddle.direction *= -1;
      }

      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ background: 'transparent' }} />;
}
