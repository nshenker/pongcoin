"use client";
import Header from "@/components/Header";
import { Box, Button, Typography } from "@mui/material";
import { IBM_Plex_Mono, Press_Start_2P, VT323 } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png";
import BottomSection from "@/pages/LandingPage/BottomSection";
import dynamic from 'next/dynamic'
import Information from "./Information";
import { useParams } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/utils/config";

const PongComponent = dynamic(
  () => import('./PongComponent'),
  { ssr: false }
)

const PongMultiplayer = dynamic(
  () => import('./PongMultiplayer'),
  { ssr: false }
)

const vt323Font = VT323({
  variable: "--font-VT323-sans",
  subsets: ["latin"],
  weight: "400",
});

const Press_Start_2P_font = Press_Start_2P({
  variable: "--font-Press_Start_2P-sans",
  subsets: ["latin"],
  weight: "400",
});
const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});
const page = () => {
  const [showGame, setShowGame] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Explicitly set ref type
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && showGame) {
      // setIsPlaying(true);
      const handleKeyDown = (event: { preventDefault: () => void }) => {
        event.preventDefault();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showGame]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const goBack = () => {
    setShowGame(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    togglePlay();
  }, [isPlaying]);
  const params = useParams<{ id?: string }>();
  const id = params?.id; // U
  const [data,setData] = useState<any>({});
  
  const getPoolData = async () => {
  
    
    try {
      const res = await axios.get(`${API_URL}/get/pool`,{
        headers: {
          "x-access-token": id,
        },
      });
  
      if (res.status === 200) {       
           
        const fetchedData = res.data.data;
  
        setData(fetchedData);
      }
  
    } catch (err) {
       
    }
  }
  useEffect(()=>{
      getPoolData()
  },[id])
  return (
    <Box>
      <Box textAlign={"center"}>
        <Typography component={"img"} src={logo.src} width={"300px"} />
        <Typography
          sx={{
            fontSize: "24px",
            fontFamily: vt323Font.style.fontFamily,
            textAlign: "center",
          }}
        >
          Serve, Smash, and Score with Pong!
        </Typography>
      </Box>
      <Header />
      {
        data?._id &&
      <Box textAlign={"center"} >
        <Typography sx={{width: "auto", background: "white",p: "10px"}}>
       <strong>Pool ID:</strong> {data?._id}
        </Typography>
      </Box>
      }

      {!showGame ? (
        <Information setShowGame={setShowGame} />
      ) : (
        <Box
          sx={{
            width: "80%",
            margin: "0rem auto 3rem",
            position: "relative",
            "& canvas": {
              width: "100% !important",
              height: { sm: "auto !important", xs: "100% !important" },
            },
            "& p": {
              fontFamily: `${Press_Start_2P_font.style.fontFamily}`,
            },
            "& button": {
              fontFamily: `${Press_Start_2P_font.style.fontFamily}`,
              color: "#fff",
              background: "#E25822",
              textTransform: "capitalize",
              fontSize: "16px",
              border: "1px solid #000",
              height: "38px",
              width: "150px",
              fontWeight: "400",
              px: "1rem",
              borderRadius: "0",
              position: "relative",
              top: "-3px",
              right: "-3px",
              transition: "0.5s all",
            },
            "& .btn_wrap": {
              background: "#000",
              transition: "0.5s all",
              "&:hover": {
                "& button": {
                  top: "0",
                  right: "0",
                  background: "#E25822",
                },
              },
            },
          }}
        >
          <Box display={"flex"} my={"1rem"}>
            <Box className="btn_wrap">
              <Button onClick={() => goBack()}>Back</Button>
            </Box>

            <Box
              sx={{ ml: "10px" }}
              className="btn_wrap"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Button sx={{ width: "50px" }}>
                {isPlaying ? <>Mute </> : <> Unmute </>}
              </Button>
            </Box>
          </Box>
          {/* <PongComponent cpuMode={true} /> */}
          <PongMultiplayer data={data}/>
        </Box>
      )}
      <audio ref={audioRef} src={"/game-sound.mp3"} />

      <BottomSection />
    </Box>
  );
};

export default page;
