import React, { useRef, useEffect, useState } from 'react';
 

function App() {
  const canvasRef = useRef(null);


  const access_token = localStorage.getItem("gameToken")
  const [connection, setConnection] = useState(null);
  const [playerNum,setPlayerNum] = useState(null)
  const [playerM,setPlayer] = useState(null) 
  const [opponentM,setOpponent] = useState(null) 


  const WS_URL = "ws://localhost:3001"

  // var player = false;
  // var opponent = false;
  const connectWebSocket = () => {
    // Initialize WebSocket
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      // console.log("WebSocket connected");
      ws.send(
        `{"event" : "init", "token" : "${access_token}" }`
      );
  
      setConnection(ws);
      // fetchPrices();
    };

    ws.onmessage = (event) => {
      if (event.data == "connected") {        
        return false;
      }
      const response = JSON.parse(event.data);

      if(response.event == 'init'){
          setPlayerNum(response.playerNum);    
        if(response.playerNum == 1){
          setPlayer(response.player)
        }
        else{
          setOpponent(response.player)
        }

        setInterval(() => {
          ws.send(
            `{"event" : "fetch", "token" : "${access_token}" }`
          );
        }, 500);
      }

      if(response.event == 'fetch'){
        setPlayerNum(response.playerNum);    
      if(response.playerNum == 1){
        setOpponent(response.opponent)
      }
      else{
         
        setPlayer(response.opponent)
      }
    }

    //   if(response.event == 'ball-update'){
    //     // setBall(response.ball);      
        
    //     if(playerNum == 1){
    //       setOpponent(response.player_2)
    //       // opponent = response.player_2        }
    //     }else{
    //       setPlayer(response.player_1)
    //       // player = response.player_1
    //     }
    // }

   

    
     
    };

    ws.onerror = (error) => {
      setConnection(null);

      // console.error("WebSocket error:", error);
      connectWeb3();
    };

    ws.onclose = () => {
      setConnection(null);
      // console.log("WebSocket disconnected");
      // connectWeb3();
    };

    return ws;
  };

  useEffect(() => {
    if(!connection){
      connectWebSocket();
    }
  },[connection])

const [firstTime,seeFirstTime] = useState(true);
const [ballM,setball] = useState({
  x: 350,
  y: 150,
  dx: 4,
  dy: 4
});
 // Game variables
 const paddleWidth = 10;
 const paddleHeight = 60;
 const ballSize = 10;

  useEffect(() => {
    if(connection){
      connection.send( `{"event" : "set", "position" : ${JSON.stringify(playerNum == 1 ? playerM : opponentM)} ,  "token" : "${access_token}" }`)
    }
    if(!playerM || !opponentM){
      return;
    }
     
    if(playerM && opponentM && !firstTime){
      return;
    }
    seeFirstTime(false);
 
    const canvas = canvasRef.current;
    
   
    
    let player1 =  playerM ; 
    // {
    //   x: 50,
    //   y: canvas.height/2 - paddleHeight/2,
    //   dy: 5,
    //   score: 0
    // };
    
    let player2 = opponentM; 
    // {
    //   x: canvas.width - 50 - paddleWidth,
    //   y: canvas.height/2 - paddleHeight/2,
    //   dy: 5,
    //   score: 0
    // };

    // console.log(playerM)
    // console.log(opponentM)

    
let ball = {
  x: 350,
  y: 150,
  dx: 4,
  dy: 4
};


    // Keyboard controls
    const keysPressed = {};
    document.addEventListener('keydown', (e) => keysPressed[e.key] = true);
    document.addEventListener('keyup', (e) => keysPressed[e.key] = false);

    function movePaddles() {
      // Player 1 (W and S)
      // if (keysPressed['w'] && player1.y > 0) player1.y -= player1.dy;
      // if (keysPressed['s'] && player1.y < canvas.height - paddleHeight) player1.y += player1.dy;
      
      // Player 2 (ArrowUp and ArrowDown)
      let playerSide  = (playerNum == 1 ? playerM : opponentM);
      // console.log(playerNum)
      // console.log(player2)
      // console.log(playerSide)

      if (keysPressed['ArrowUp'] &&  playerSide.y > 0  ) playerSide.y -= playerSide.dy;
      if (keysPressed['ArrowDown'] && playerSide.y < canvas.height - paddleHeight) playerSide.y += playerSide.dy;
      if(playerNum == 1){
        // player1 = playerSide ;
        setPlayer(playerSide)
      }
      if(playerNum == 2) {
        setOpponent(playerSide)
     
        // player2 = playerSide
      } 
    

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
        (ball.x <= playerM.x + paddleWidth && ball.y + ballSize >= playerM.y && ball.y <= playerM.y + paddleHeight) ||
        (ball.x + ballSize >= opponentM.x && ball.y + ballSize >= opponentM.y && ball.y <= opponentM.y + paddleHeight)
      ) {
        ball.dx *= -1;
      }

      // Scoring
      if (ball.x <= 0) {
        opponentM.score++;
        resetBall();
      }
      if (ball.x >= canvas.width) {
        playerM.score++;
        resetBall();
      }
      setball(ball)

    }

    function resetBall() {
      ball.x = canvas.width/2;
      ball.y = canvas.height/2;
      ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
      ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
      setball(ball)
    }

  

    function gameLoop() {
      movePaddles();
      moveBall();
      draw();
      requestAnimationFrame(gameLoop);
     
    }

    if(opponentM && playerM){
      gameLoop();
    }

    // Cleanup
    return () => {
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('keyup', () => {});
    };
  }, [playerM,opponentM]);

  const draw = () => {
    console.log("drawn",playerM)

    const ball = ballM ; 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
    if(playerM && opponentM){
      ctx.fillRect(playerM.x, playerM.y, paddleWidth, paddleHeight);
      ctx.fillRect(opponentM.x, opponentM.y, paddleWidth, paddleHeight);  
    }

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballSize/2, 0, Math.PI*2);
    ctx.fill();

    // Draw scores
    ctx.font = '20px Arial';
    ctx.fillText(playerM.score, canvas.width/4, 30);
    ctx.fillText(opponentM.score, 3*canvas.width/4, 30);
    console.log("played")

    // requestAnimationFrame(gameLoop);
  }

  return (
    <div className="App">
      
      <canvas 
        ref={canvasRef} 
        width={700} 
        height={300}
        style={{border: '1px solid white'}}
      />
      
    </div>
  );
}

export default App;