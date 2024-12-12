import { useRef, useEffect } from "react";

const PongAnimation = () => {
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
    const paddleSpeed = 4;
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
    
    // Add smooth paddle movement
    const movePaddle = (currentY: number, targetY: number, speed: number) => {
      if (Math.abs(currentY - targetY) < speed) return currentY;
      return currentY + (targetY > currentY ? speed : -speed);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(48, 102, 190, 0.3)";
      ctx.fill();
      ctx.closePath();

      // Draw paddles
      ctx.fillStyle = "rgba(48, 102, 190, 0.2)";
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

      // Move paddles to follow the ball
      const paddleTargetY = Math.min(
        Math.max(ballY - paddleHeight / 2, 0),
        canvas.height - paddleHeight
      );
      
      leftPaddleY = movePaddle(leftPaddleY, paddleTargetY, paddleSpeed);
      rightPaddleY = movePaddle(rightPaddleY, paddleTargetY, paddleSpeed);

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

      requestAnimationFrame(render);
    };

    render();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      leftPaddleY = canvas.height / 2 - paddleHeight / 2;
      rightPaddleY = canvas.height / 2 - paddleHeight / 2;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default PongAnimation;
