import { io } from "socket.io-client";
import Ball from "./ball.js";
import Player from "./player.js";
import { useEffect, useRef, useState } from "react";


function App() {

    
const startBtn = useRef();
const canvas = useRef();
const [message,setmessage] = useState();
const [showModal,setShowModal] = useState(true);
const [showButton,setShowButton] = useState(true);
const [ws,setws] = useState();

// const WS_URL = 'http://localhost:3330'
const WS_URL = 'https://d2qj5dvu6ct4if.cloudfront.net'


useEffect(() => {


let ctx = canvas.current.getContext('2d');


let player1;
let player2;
let ball;

let isGameStarted = false;
let playerNo = 0;
let roomID;


const socket = io(WS_URL, {
    transports: ['websocket']
});

setws(socket)

socket.on("playerNo", (newPlayerNo) => {
    console.log(newPlayerNo);
    playerNo = newPlayerNo;
});

socket.on("startingGame", () => {
    isGameStarted = true;
    setmessage("We are going to start the game...");
});

socket.on("startedGame", (room) => {
    console.log(room);
    setShowModal(false)

    roomID = room.id;
    setmessage("");

    player1 = new Player(room.players[0].x, room.players[0].y, 20, 60, 'red');
    player2 = new Player(room.players[1].x, room.players[1].y, 20, 60, 'blue');

    player1.score = room.players[0].score;
    player2.score = room.players[1].score;


    ball = new Ball(room.ball.x, room.ball.y, 10, 'white');

    window.addEventListener('keydown', (e) => {
        if (isGameStarted) {
            if (e.keyCode === 38) {
                console.log("player move 1 up")
                socket.emit("move", {
                    roomID: roomID,
                    playerNo: playerNo,
                    direction: 'up'
                })
            } else if (e.keyCode === 40) {
                console.log("player move 1 down")
                socket.emit("move", {
                    roomID: roomID,
                    playerNo: playerNo,
                    direction: 'down'
                })
            }
        }
    });

    draw();
});

socket.on("updateGame", (room) => {
    player1.y = room.players[0].y;
    player2.y = room.players[1].y;

    player1.score = room.players[0].score;
    player2.score = room.players[1].score;

    ball.x = room.ball.x;
    ball.y = room.ball.y;

    draw();
});

socket.on("endGame", (room) => {
    isGameStarted = false;
    setShowModal(true)

    setmessage(`${room.winner === playerNo ? "You are Winner!" : "You are Loser!"}`);

    socket.emit("leave", roomID);


    setTimeout(() => {
        ctx.clearRect(0, 0, 800, 500);
        startBtn.style.display = 'block';
    }, 2000);
});



function draw() {
    ctx.clearRect(0, 0, 800, 500);


    player1.draw(ctx);
    player2.draw(ctx);
    ball.draw(ctx);

    // center line
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.setLineDash([10, 10])
    ctx.moveTo(400, 5);
    ctx.lineTo(400, 495);
    ctx.stroke();
}
},[])

function startGame() {
    // startBtn.style.display = 'none';
    setShowButton(false)
    console.log(ws)
    if (ws.connected) {
        ws.emit('join');
        setmessage("Waiting for other player...")
    }
    else {
        setmessage("Refresh the page and try again...")
    }
}


return (
    <div class="container">
    
    <div class="game" style={{position: "relative"}}>
        <canvas id="canvas" ref={canvas} width="800"  style={{ background: "black" }} height="500"></canvas>
        {
            showModal &&
            <div  style={{background: "#fff" , padding: "10px" , width: "500px" , height: "auto" , minHeight: "20%" ,  maxHeight: "50%" , position: "absolute", top: "25%" , left: "30%"}}>
            {message != "" && <p id="message" style={{textAlign: "center", paddingTop: "10%", fontSize: "25px"}}>{message}</p> }
            {
                showButton &&
            <button style={{width: "100%" , margin: "10% auto" }}  onClick={() => startGame()}>
                START GAME
            </button>    
            }
            </div>    
        }
    </div>
</div>
)
}
export default App;