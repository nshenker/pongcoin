import { io } from "socket.io-client";
import Ball from "./ball.js";
import Player from "./player.js";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import ConfirmationPopup from "@/components/ConfirmationPopup";


function App({data}) {

    
const startBtn = useRef();
const canvas = useRef();
const [message,setmessage] = useState();
const [showModal,setShowModal] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const [showButton,setShowButton] = useState(true);
const [showLink,setShowLink] = useState(false);
const [ws,setws] = useState();
const [hideLeavegame,setHideLeavegame] = useState(false);

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
    // console.log(newPlayerNo);
    playerNo = newPlayerNo;

    setInterval(() => {
        const access_token = localStorage.getItem("gameToken")
            socket.emit("online", { 
            token: access_token
        }) 
        },1000)
    
});

socket.on("over", (data) => {
    // alert("over")
    setHideLeavegame(true)

    if(data.winnner){
        setmessage("You have Won!");
    }
    else{
        setmessage("You have Lost!");

    }

    setShowLink(data.hash)


})


socket.on("startingGame", () => {
    isGameStarted = true;
    setmessage("We are going to start the game...");
});

socket.on("startedGame", (room) => {
    console.log(room);
    setShowModal(false)
    setHideLeavegame(true)

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
                // if(playerNo == 1){
                //     player1.y -= 10;
                //     player1.y -= 10;
                // }
                // else{
                //     player2.y -= 10;
                //     player2.y -= 10;
                // }
                // draw();

            } else if (e.keyCode === 40) {
                console.log("player move 1 down")
                socket.emit("move", {
                    roomID: roomID,
                    playerNo: playerNo,
                    direction: 'down'
                })
                // if(playerNo == 1){
                //     player1.y += 10;
                //     player1.y += 10;
                // }
                // else{
                //     player2.y += 10;
                //     player2.y += 10;
                // }
                // draw();

            }
        }
    });

    draw();
});

socket.on("updateGame", (room) => {
    // if(playerNo == 1){
    //     player2.y = room.players[1].y;
    // }
    // else{
    //     player1.y = room.players[0].y;
    // }
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
    setHideLeavegame(true)
    setmessage(`${room.winner === playerNo ? "You have Won!" : "You have Lost!"}`);

    socket.emit("leave", roomID);


    setTimeout(() => {
        ctx.clearRect(0, 0, 800, 500);
       
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

// return () => {
//     if(isGameStarted){
//         const access_token = localStorage.getItem("gameToken")
//         socket.emit("exit", {
//             roomID : roomID,
//             playerNo: playerNo,
//             token: access_token
//         });
//     }
  
//   };

},[])

function startGame() {
    // startBtn.style.display = 'none';
    setShowButton(false)
    console.log(ws)
    const access_token = localStorage.getItem("gameToken")
    if (ws.connected) {
        ws.emit('join', {
            token: access_token
        });
        setmessage("Waiting for other player...")
    }
    else {
        setmessage("Refresh the page and try again...")
    }
}

// console.log(data);

return (
    <Box class="container">
    
    <div class="game" style={{position: "relative"}}>
        <canvas id="canvas" ref={canvas} width="800"  style={{ background: "black" }} height="500"></canvas>
        {
            showModal &&
            <Box  sx={{background: "#fff" , padding: "10px" , width: {sm:"500px",xs:"90%"} , height: "auto", position: "absolute", top: "25%" , left: "50%",transform:"translateX(-50%)",textAlign:"center"}}>
            {message && 
            <>            
            <p id="message" style={{textAlign: "center", paddingTop: "10%",paddingBottom: "20%", fontSize: "16px"}}>{message}</p> 
            {
                showLink &&
                
                <a  style={{textAlign: "center", color: "blue", fontSize: "14px"}} target="_blank" href={`https://solscan.io/tx/${showLink}`}>View Transaction</a> 
            }
            </>
            }
            {
                showButton &&
                   <Box className="btn_wrap" sx={{margin: "10% 1% 10% 0%",width:"auto",display:"inline-block"}}>
            <button style={{width: "auto"}}  onClick={() => startGame()}>
                START GAME
            </button>    
            </Box>
            }
            {
                !hideLeavegame && data?.status < 1 && !data?.gameStarted &&
                   <Box className="btn_wrap" sx={{margin: "10% auto",width:"auto",display:"inline-block"}}>
            <button style={{width: "auto"}}  onClick={() => setIsDialogOpen(true)}>
               LEAVE GAME
            </button>    
            </Box>
            }
            </Box>    
        }
    </div>
        {isDialogOpen && (
          <ConfirmationPopup
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            poolId={data?._id}
          />
        )}
</Box>
)
}
export default App;