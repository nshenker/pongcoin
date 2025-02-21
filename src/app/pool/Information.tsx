"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import { IBM_Plex_Mono, Press_Start_2P, VT323 } from "next/font/google";
import React, { useState } from "react";
import play_icon from "../../assets/play_icon.svg";
import obj from "../../assets/obj.svg";
import control from "../../assets/control.svg";
import info_bg from "../../assets/info_bg.png";
import info_icon from "../../assets/info_icon.svg";
import left_arrow from "../../assets/left_arrow.svg";
import right_arrow from "../../assets/right_arrow.svg";
import NorthIcon from '@mui/icons-material/North';
import CreatePoolDialog from "@/components/CreatePool";
// import PoolComponent from "./PoolComponent";
import dynamic from 'next/dynamic'



const PoolComponent = dynamic(
  () => import('./PoolComponent'),
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
interface InformationProps {
    setShowGame: (show: boolean) => void;
  }

  const Information: React.FC<InformationProps> = ({ setShowGame }) => {
  const [isDialogOpen,setIsDialogOpen] = useState(false);

  return (
    <Box
      sx={{
        // position:"absolute",
        width: { sm: "80%", xs: "90%" },
        m: "0 auto 2rem",
        // height:"100%",
        // background:"black",
        // top:"0",
        // left:"0"
      }}
    >
      <Box
        sx={{
          py: { sm: "4rem", xs: "4rem" },
          "& .text_1": {
            fontSize: { sm: "22px", xs: "22px" },
            fontFamily: vt323Font.style.fontFamily,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
          },
          "& li": {
            pl: "0.5rem",
            fontSize: "16px",
            fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
          },
        }}
      >
        <Box>
          <Typography className="text_1">
            <Typography component={"img"} src={play_icon.src} /> Welcome to the
            Ultimate $PONG Challenge!
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
            }}
          >
            Get ready to experience the classic arcade ping pong game,
            reimagined for the crypto era! Inspired by the legendary 80s retro
            games, $PONG brings a fast-paced, skill-based challenge where
            precision and strategy lead to victory.
          </Typography>
        </Box>
         
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${info_bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "100% 100%",
          height:{lg:"550px",xs:"480px"},
          // height: "100%",
          width: { sm: "80%", xs: "100%" },
          m: "0 auto",
          px: { sm: "3rem", xs: "1rem" },
          pt: { sm: "2.2rem", xs: "2.5rem" },
          "& .text_1": {
            fontSize: { sm: "22px", xs: "22px" },
            fontFamily: vt323Font.style.fontFamily,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
          },
          "& li": {
            pl: "0.5rem",
            fontSize: { sm: "16px", xs: "14px" },
            fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
          },
          "& img": {
            verticalAlign: "middle",
          },
          "& button": {
            fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
            color: "#fff",
            background: "#000",
            textTransform: "capitalize",
            fontSize: "16px",
            border: "1px solid #000",
            height: "38px",
            width: "38px",
            fontWeight: "400",
            px: "1rem",
            borderRadius: "0",
            position: "relative",
            top: "-3px",
            right: "-3px",
            transition: "0.5s all",
          },
          "& .btn_wrap": {
            background: "#E25822",
            transition: "0.5s all",
            "&:hover": {
              "& button": {
                top: "0",
                right: "0",
                background: "#000",
              },
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { sm: "49px", xs: "35px" },
            fontFamily: vt323Font.style.fontFamily,
            display: "flex",
            lineHeight: "10px",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
            color: "#fff",
          }}
        >
          PONG POOLS{" "}
          <Typography
            component={"img"}
            src={info_icon.src}
            sx={{
              width: { sm: "auto", xs: "25px" },
            }}
          />
        </Typography>
        
        <Box
          sx={{
            mt: { sm: "4rem", xs: "3rem" },
          }}
          textAlign={"center"}
        >
          <Typography
            sx={{
              pt: { sm: "1rem" },
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
            }}
          >
            GET READY TO PLAY!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "1rem",
              pb: "3rem",
              "& .btn_wrap": {
                background: "#000 !important",
                "&:hover": {
                  "& button": {
                    background: "#E25822 !important",
                  },
                },
              },
            }}
          >
            <Box className="btn_wrap">
              <Button
              onClick={()=>setIsDialogOpen(true)}
              // onClick={()=>setShowGame(true)}
                sx={{
                  width: "auto !important",
                  background: "#E25822 !important",
                  fontFamily: `${Press_Start_2P_font.style.fontFamily} !important`,
                }}
              >
                Create Pool
              </Button>
              <CreatePoolDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </Box>
          </Box>
        </Box>
        <Box>
          <PoolComponent/>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
