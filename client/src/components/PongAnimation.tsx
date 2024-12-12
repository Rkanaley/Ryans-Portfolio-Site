import { useRef, useEffect } from "react";

export default function PongAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with proper device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    // Ball properties
    let ballX = window.innerWidth / 2;
    let ballY = window.innerHeight / 2;
    const ballRadius = 10;
    let ballSpeedX = 4;
    let ballSpeedY = 4;

    // Paddle properties
    const paddleWidth = 10;
    const paddleHeight = 100;
    let leftPaddleY = window.innerHeight / 2 - paddleHeight / 2;
    let rightPaddleY = window.innerHeight / 2 - paddleHeight / 2;

    // Mouse control for left paddle
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      leftPaddleY = Math.max(0, Math.min(window.innerHeight - paddleHeight, mouseY));
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

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
        window.innerWidth - 30,
        rightPaddleY,
        paddleWidth,
        paddleHeight
      ); // Right paddle

      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with top and bottom walls
      if (ballY + ballRadius > window.innerHeight || ballY - ballRadius < 0) {
        ballSpeedY *= -1;
      }

      // Ball collision with paddles
      if (
        ballX - ballRadius < 30 && // Left paddle
        ballY > leftPaddleY &&
        ballY < leftPaddleY + paddleHeight
      ) {
        ballSpeedX = Math.abs(ballSpeedX); // Make sure it goes right
      }

      if (
        ballX + ballRadius > window.innerWidth - 30 && // Right paddle
        ballY > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
      ) {
        ballSpeedX = -Math.abs(ballSpeedX); // Make sure it goes left
      }

      // Ball goes off the screen (reset position)
      if (ballX + ballRadius < 0 || ballX - ballRadius > window.innerWidth) {
        ballX = window.innerWidth / 2;
        ballY = window.innerHeight / 2;
        ballSpeedX = 4 * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
      }

      // Simple AI for right paddle
      const paddleCenter = rightPaddleY + paddleHeight / 2;
      if (paddleCenter < ballY - 35) {
        rightPaddleY += 3;
      }
      if (paddleCenter > ballY + 35) {
        rightPaddleY -= 3;
      }

      requestAnimationFrame(render);
    };

    render();

    // Handle window resize
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "#000"
      }} 
    />
  );
}
