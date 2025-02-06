"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import { Box, Typography } from '@mui/material'
import { IBM_Plex_Mono, Press_Start_2P , VT323} from 'next/font/google';
import launch from "../../assets/launch.gif"
import React from 'react'
import logo from "../../assets/logo.png";
import BottomSection from '@/pages/LandingPage/BottomSection';
 
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
      <Box sx={{
        py:{sm:"8rem",xs:"4rem"}
      }}>
      <Typography
              sx={{
                fontSize: {sm:"34px",xs:"28px"},
                fontFamily: Press_Start_2P_font.style.fontFamily,
                display:"flex",
                alignItems:"center",
                gap:"5px",
                justifyContent:"center",
                flexWrap:"wrap",
                textAlign: "center",
              }}
            >
              The game is loading...    <Typography
            component={"img"}
            src={launch.src}
            sx={{
              width:{sm:"88px",xs:"60px"},
            }}
          />
            </Typography>
        <Typography
              sx={{
                p:"15px",
                fontSize: "16px",
                fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                textAlign: "center",
              }}
            >
              {"We're building something fun! Stay tuned for the ultimate $PONG experience."}
            </Typography>
      </Box>
        <BottomSection />
    </Box>
  )
}

export default page