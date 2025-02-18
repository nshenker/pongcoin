'use client'
import React, { useRef, useEffect, useState } from "react";

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerY, setPlayerY] = useState(150);
  const [ball, setBall] = useState({ x: 300, y: 200, dx: 3, dy: 3 });
  const [computerY, setComputerY] = useState(150);
  
  const paddleHeight = 80;
  const paddleWidth = 10;
  const canvasWidth = 600;
  const canvasHeight = 400;
    
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is not null
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Ensure ctx is not null
  
    const updateGame = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
      // Intelligent AI movement
      const computerSpeed = 4;
      if (computerY + paddleHeight / 2 < ball.y - 10) {
        setComputerY((prev) => Math.min(prev + computerSpeed, canvasHeight - paddleHeight));
      } else if (computerY + paddleHeight / 2 > ball.y + 10) {
        setComputerY((prev) => Math.max(prev - computerSpeed, 0));
      }
  
      // Move ball
      setBall((prev) => {
        let newX = prev.x + prev.dx;
        let newY = prev.y + prev.dy;
        let newDx = prev.dx;
        let newDy = prev.dy;
  
        // Ball collision with top and bottom
        if (newY <= 0 || newY >= canvasHeight) newDy = -newDy;
  
        // Ball collision with paddles
        if (
          (newX <= paddleWidth && newY > playerY && newY < playerY + paddleHeight) ||
          (newX >= canvasWidth - paddleWidth - 10 && newY > computerY && newY < computerY + paddleHeight)
        ) {
          newDx = -newDx;
        }
  
        return { x: newX, y: newY, dx: newDx, dy: newDy };
      });
  
      // Draw paddles
      ctx.fillStyle = "white";
      ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
      ctx.fillRect(canvasWidth - paddleWidth - 10, computerY, paddleWidth, paddleHeight);
  
      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 8, 0, Math.PI * 2);
      ctx.fill();
    };
  
    const gameLoop = setInterval(updateGame, 16);
    return () => clearInterval(gameLoop);
  }, [ball, playerY, computerY]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setPlayerY((prev) => Math.max(prev - 20, 0));
      } else if (event.key === "ArrowDown") {
        setPlayerY((prev) => Math.min(prev + 20, canvasHeight - paddleHeight));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "2px solid white" }}
      />
    </div>
  );
};

export default PongGame;
