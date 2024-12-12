import { useRef, useEffect } from "react";

export default function PongAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ball properties
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballRadius = 10;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

    // Paddle properties
    const paddleWidth = 10;
    const paddleHeight = 100;
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

    // Mouse control
    canvas.addEventListener("mousemove", (e) => {
      leftPaddleY = e.clientY - paddleHeight / 2;
      // Keep paddle within canvas bounds
      leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
    });

    const render = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();

      // Draw paddles
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(20, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
      ctx.fillRect(
        canvas.width - 30,
        rightPaddleY,
        paddleWidth,
        paddleHeight
      ); // Right paddle

      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with top and bottom walls
      if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY *= -1;
      }

      // Ball collision with paddles
      if (
        ballX - ballRadius < 30 && // Left paddle
        ballY > leftPaddleY &&
        ballY < leftPaddleY + paddleHeight
      ) {
        ballSpeedX *= -1;
      }

      if (
        ballX + ballRadius > canvas.width - 30 && // Right paddle
        ballY > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
      ) {
        ballSpeedX *= -1;
      }

      // Ball goes off the screen (reset position)
      if (ballX + ballRadius < 0 || ballX - ballRadius > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 2 * (Math.random() > 0.5 ? 1 : -1); // Randomize direction
        ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
      }

      // AI for right paddle
      const paddleSpeed = 2;
      const paddleCenter = rightPaddleY + paddleHeight / 2;
      if (paddleCenter < ballY - 35) {
        rightPaddleY += paddleSpeed;
      }
      if (paddleCenter > ballY + 35) {
        rightPaddleY -= paddleSpeed;
      }

      requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
