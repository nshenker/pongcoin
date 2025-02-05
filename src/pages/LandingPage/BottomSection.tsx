import { Box, Button, Typography } from "@mui/material";
import {
  IBM_Plex_Mono,
  Press_Start_2P,
  VT323,
} from "next/font/google";
import React from "react";
import grp_1 from "../../assets/grp_1.svg";
import grp_2 from "../../assets/grp_2.svg";

const vt323Font = VT323({
  variable: "--font-VT323-sans",
  subsets: ["latin"],
  weight: "400",
});
const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});
const Press_Start_2P_font = Press_Start_2P({
  variable: "--font-Press_Start_2P-sans",
  subsets: ["latin"],
  weight: "400",
});

const BottomSection = () => {
  return (
    <>
      <Box
        sx={{
          px: { lg: "5rem", xs: "1.5rem" },
          py: "1rem",
          border: "solid #000",
          borderWidth: "2px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "space-between", xs: "center" },
            flexWrap: "wrap",
            gap: "1rem",
            p: {sm:"2rem"},
          }}
        >
          <Typography
            component={"img"}
            src={grp_1.src}
            sx={{
              alignSelf: "flex-start",
              width:{sm:"auto",xs:"100px"}
            }}
          />
          <Box
            sx={{
              "& a": {
                fontFamily: `${Press_Start_2P_font.style.fontFamily}`,
                color: "#fff",
                background: "#E25822",
                textTransform: "capitalize",
                fontSize: "16px",
                border: "1px solid #000",
                height: "36px",
                width: "152px",
                fontWeight: "400",
                px: "1rem",
                borderRadius: "0",
                position: "relative",
                top: "-5px",
                right: "-5px",
                transition: "0.5s all",
              },
              "& .btn_wrap": {
                background: "#000",
                transition: "0.5s all",
                "&:hover": {
                  "& a": {
                    top: "0",
                    right: "0",
                    background: "#E25822",
                  },
                },
              },
            }}
          >
            <Typography
              sx={{
                pt: "15px",
                fontSize: {sm:"95px",xs:"50px"},
                fontFamily: vt323Font.style.fontFamily,
                lineHeight: "normal",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Join the Gang!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", xs: "center" },
                width: "100%",
                gap: "1rem",
                flexWrap: "wrap",
                py: "2rem",
              }}
            >
              <Box className="btn_wrap">
                <Button href={'https://www.x.com/thepongcoin'}  target="_blank"> Twitter</Button>
              </Box>
              <Box className="btn_wrap" >
                <Button href={'https://t.me/pingandpongofficial'} target="_blank">Telegram</Button>
              </Box>
              
            </Box>
          </Box>
          <Typography
            component={"img"}
            src={grp_2.src}
            sx={{
              alignSelf: "flex-end",
              width:{sm:"auto",xs:"100px"}
            }}
          />
        </Box>
      </Box>
      {/* footer  */}
      <Box
        sx={{
          background: "#E25822",
          borderBottom: "5px solid #000",
          px: { lg: "5rem", xs: "1.5rem" },
        }}
      >
        <Typography
          sx={{
            py: "3rem",
            fontSize: {sm:"122px",xs:"60px"},
            fontFamily: vt323Font.style.fontFamily,
            lineHeight: "normal",
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          Where Fun Meets Fortune!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "space-between", xs: "center" },
            flexWrap: "wrap",
            gap: "1rem",
            pb: "1.5rem",
            "& p": {
              fontSize: "16px",
              fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
              textAlign: {sm:"start",xs:"center"},
            },
          }}
        >
          <Typography>© 2025 Pong Coin – All rights reserved.</Typography>
          {/* <Typography>Terms & Conditions | Privacy Policy</Typography> */}
        </Box>
      </Box>
    </>
  );
};

export default BottomSection;
