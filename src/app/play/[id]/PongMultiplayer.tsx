import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


const WIDTH = 800;
const HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;

const PongMultiplayer = () => {
  const [players, setPlayers] = useState({});
  const [ball, setBall] = useState({ x: WIDTH / 2, y: HEIGHT / 2 });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [playerNumber, setPlayerNumber] = useState(null);
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef(null);
  const paddleY = useRef(250);
// const socket = io("http://localhost:3004");
// const WS_URL = 'http://localhost:3330'
const WS_URL = 'wss://d2qj5dvu6ct4if.cloudfront.net'
 
const access_token = localStorage.getItem("gameToken")
const [connection,setConnection] = useState(null) 

// useEffect(() => {
//     const ws = new WebSocket(WS_URL);   
//     if(ws.readyState === WebSocket.OPEN){
         

//     }
// },[])
  

let ws = new WebSocket(WS_URL); 

ws.onopen  = () => {
    ws.send(`{"e": "init" ,  "token" : "${access_token}"}`);  
    setConnection(ws)
} 
    // useEffect(() => {
    //     console.log("mov",ws.readyState)
    // if(ws.readyState === 1){
    //     setConnection(ws)
    // }
    // },[ws])

  useEffect(() => {
  
    if(connection){
        console.log("connection.readyState",connection.readyState)
      

       
        connection.onmessage = (event) => {
        // console.log("event",event)

        const data = JSON.parse(event.data);

        if(data.event == "player-assigned"){
            setPlayerNumber(data.data)
        }

        if(data.event == "room-full"){
            alert("Room is full!")
        }

        if(data.event == "update-players"){
            setPlayers(data.data)
        }

        if(data.event == "update-ball"){
            console.log("update-ball",data.data)
            setBall(data.data)
        }

        if(data.event == "update-scores"){
            setScores(data.data)
        }

        if(data.event == "reset-game"){
            setBall(data.data)
        }


    }
    }

    // socket.onmessage((event) => {
    //     console.log(event)
    // })

    // socket.on("player-assigned", (number) => setPlayerNumber(number));

    // ws.on("room-full", () => alert("Room is full!"));

    // socket.on("update-players", (players) => setPlayers(players));

    // socket.on("update-ball", (newBall) => setBall(newBall));

    // socket.on("update-scores", (newScores) => setScores(newScores));

    // socket.on("reset-game", (newBall) => setBall(newBall));

    return () => {
        // ws.close();
    //   socket.off("player-assigned");
    //   socket.off("update-players");
    //   socket.off("update-ball");
    //   socket.off("update-scores");
    //   socket.off("reset-game");
    //   socket.off("room-full");
    };
  }, [connection]);

  const movePaddle = (event) => {
    const y = Math.min(Math.max(event.clientY - PADDLE_HEIGHT / 2, 0), HEIGHT - PADDLE_HEIGHT);
    paddleY.current = y;
    console.log("mov")
    if(connection){
    console.log("mov-conn")
        connection.send(`{"e": "move-paddle", "y" : ${y} ,  "token" : "${access_token}"}`);
    }
   
  };

  // Handle touch controls for mobile
  const handleTouchMove = (event) => {
    const touchY = event.touches[0].clientY - PADDLE_HEIGHT / 2;
    const y = Math.min(Math.max(touchY, 0), HEIGHT - PADDLE_HEIGHT);
    paddleY.current = y;
    if(connection){
        connection.send(`{"e": "move-paddle", "y" : ${y} ,  "token" : "${access_token}"}`);
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    socket.emit("change-speed", newSpeed);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateGame = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "white";

      Object.values(players).forEach((player, index) => {
        ctx.fillRect(index === 0 ? 20 : WIDTH - 30, player.y, PADDLE_WIDTH, PADDLE_HEIGHT);
      });

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.font = "24px Arial";
      ctx.fillText(`Player 1: ${scores.player1 || 0}`, 50, 30);
      ctx.fillText(`Player 2: ${scores.player2 || 0}`, WIDTH - 150, 30);

      requestAnimationFrame(updateGame);
    };

    updateGame();
  }, [players, ball, scores]); 

  return (
    <div onMouseMove={movePaddle} onTouchMove={handleTouchMove} style={{ textAlign: "center", color: "white" }}>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} style={{ background: "black" }} />
      <input type="range" min="1" max="10" step="0.1" value={speed} onChange={handleSpeedChange} />
      <p>Ball Speed: {speed}x</p>
    </div>
  );
};

export default PongMultiplayer;
