import React, { useRef, useEffect } from 'react';
 

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Game variables
    const paddleWidth = 10;
    const paddleHeight = 60;
    const ballSize = 10;
    
    let player1 = {
      x: 50,
      y: canvas.height/2 - paddleHeight/2,
      dy: 5,
      score: 0
    };
    
    let player2 = {
      x: canvas.width - 50 - paddleWidth,
      y: canvas.height/2 - paddleHeight/2,
      dy: 5,
      score: 0
    };
    
    let ball = {
      x: canvas.width/2,
      y: canvas.height/2,
      dx: 4,
      dy: 4
    };

    // Keyboard controls
    const keysPressed = {};
    document.addEventListener('keydown', (e) => keysPressed[e.key] = true);
    document.addEventListener('keyup', (e) => keysPressed[e.key] = false);

    function movePaddles() {
      // Player 1 (W and S)
      if (keysPressed['w'] && player1.y > 0) player1.y -= player1.dy;
      if (keysPressed['s'] && player1.y < canvas.height - paddleHeight) player1.y += player1.dy;
      
      // Player 2 (ArrowUp and ArrowDown)
      if (keysPressed['ArrowUp'] && player2.y > 0) player2.y -= player2.dy;
      if (keysPressed['ArrowDown'] && player2.y < canvas.height - paddleHeight) player2.y += player2.dy;
    }

    function moveBall() {
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision
      if (ball.y <= 0 || ball.y >= canvas.height - ballSize) {
        ball.dy *= -1;
      }

      // Paddle collision
      if (
        (ball.x <= player1.x + paddleWidth && ball.y + ballSize >= player1.y && ball.y <= player1.y + paddleHeight) ||
        (ball.x + ballSize >= player2.x && ball.y + ballSize >= player2.y && ball.y <= player2.y + paddleHeight)
      ) {
        ball.dx *= -1;
      }

      // Scoring
      if (ball.x <= 0) {
        player2.score++;
        resetBall();
      }
      if (ball.x >= canvas.width) {
        player1.score++;
        resetBall();
      }
    }

    function resetBall() {
      ball.x = canvas.width/2;
      ball.y = canvas.height/2;
      ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
      ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
    }

    function draw() {
      // Clear canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, 0);
      ctx.lineTo(canvas.width/2, canvas.height);
      ctx.stroke();

      // Draw paddles
      ctx.fillStyle = 'white';
      ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
      ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ballSize/2, 0, Math.PI*2);
      ctx.fill();

      // Draw scores
      ctx.font = '20px Arial';
      ctx.fillText(player1.score, canvas.width/4, 30);
      ctx.fillText(player2.score, 3*canvas.width/4, 30);
    }

    function gameLoop() {
      movePaddles();
      moveBall();
      draw();
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('keyup', () => {});
    };
  }, []);

  return (
    <div className="App">
     
      <canvas 
        ref={canvasRef} 
        width={"700px"} 
        height={"300px"}
        style={{border: '1px solid white'}}
      />
     
    </div>
  );
}

export default App;