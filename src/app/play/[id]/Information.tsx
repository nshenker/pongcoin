"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import { IBM_Plex_Mono, Press_Start_2P, VT323 } from "next/font/google";
import React from "react";
import play_icon from "../../../assets/play_icon.svg";
import obj from "../../../assets/obj.svg";
import control from "../../../assets/control.svg";
import info_bg from "../../../assets/info_bg.png";
import info_icon from "../../../assets/info_icon.svg";
import left_arrow from "../../../assets/left_arrow.svg";
import right_arrow from "../../../assets/right_arrow.svg";
import NorthIcon from '@mui/icons-material/North';

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
        <Box pt={"1rem"}>
          <Typography className="text_1">
            <Typography component={"img"} src={control.src} /> How to Play?
          </Typography>
          <Typography component={"li"}>
            Control your paddle, bounce the ball, and outscore your opponent!
          </Typography>
          <Typography component={"li"}>
            Time your hits, predict the ball's movement, and master the art of
            the perfect PONG shot!
          </Typography>
          <Typography component={"li"}>
            {
              "Power-ups coming soon – expect speed boosts, curve shots, and more!"
            }
          </Typography>
          <Typography
            sx={{
              pt: "2rem",
              fontSize: "16px",
              fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
            }}
          >
            Think you have what it takes? Step into the $PONG Arena and prove
            your skills!
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${info_bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "100% 100%",
          // height:"600PX",
          height: "100%",
          width: { sm: "80%", xs: "100%" },
          m: "0 auto",
          px: { sm: "3rem", xs: "1rem" },
          pt: { sm: "1.3rem", xs: "2.5rem" },
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
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
            color: "#fff",
          }}
        >
          PONG INSTRUCTIONS{" "}
          <Typography
            component={"img"}
            src={info_icon.src}
            sx={{
              width: { sm: "auto", xs: "25px" },
            }}
          />
        </Typography>
        <Grid container spacing={2} mt={"1rem"}>
          <Grid item sm={6} xs={12}>
            <Typography className="text_1" pb={"0.5rem"}>
              <Typography component={"img"} src={control.src} /> Controls:
            </Typography>

            <Grid container spacing={1} mt={"0.5rem"}>
              <Grid item lg={4} xs={5.5} alignSelf={"center"}>
                <Typography
                  component={"li"}
                  pb={"0.5rem"}
                  lineHeight={"normal"}
                >
                  Move Up
                </Typography>
              </Grid>
              <Grid
                item
                lg={2.5}
                xs={2.5}
                alignSelf={"center"}
                display={"flex"}
              >
                <Typography
                  component={"img"}
                  src={left_arrow.src}
                  px={"1rem"}
                  sx={{
                    transform:"rotate(90deg)"
                  }}
                />
                :
              </Grid>
              <Grid
                item
                lg={5.5}
                xs={3.5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { sm: "start", xs: "center" },
                }}
              >
                <Box className="btn_wrap">
                  <Button><NorthIcon sx={{fontSize:"1rem"}}/></Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={"0.5rem"}>
              <Grid item lg={4} xs={5.5} alignSelf={"center"}>
                <Typography
                  component={"li"}
                  pb={"0.5rem"}
                  lineHeight={"normal"}
                >
                  Move Down
                </Typography>
              </Grid>
              <Grid
                item
                lg={2.5}
                xs={2.5}
                alignSelf={"center"}
                display={"flex"}
              >
                <Typography
                  component={"img"}
                  src={left_arrow.src}
                  px={"1rem"}
                  sx={{
                    transform:"rotate(-90deg)"
                  }}
                />
                :
              </Grid>
              <Grid
                item
                lg={5.5}
                xs={3.5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { sm: "start", xs: "center" },
                }}
              >
                <Box className="btn_wrap">
                  <Button><NorthIcon sx={{fontSize:"1rem",transform:"rotate(-180deg)"}}/></Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={"0.5rem"}>
              <Grid item lg={4} xs={5} alignSelf={"center"}>
                <Typography
                  component={"li"}
                  pb={"0.5rem"}
                  lineHeight={"normal"}
                >
                  Hit Ball
                </Typography>
              </Grid>
              <Grid item lg={2.5} xs={2} alignSelf={"center"} display={"flex"}>
                <Typography component={"img"} src={play_icon.src} px={"1rem"} />
                :
              </Grid>
              <Grid
                item
                lg={5.5}
                xs={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { sm: "start", xs: "center" },
                }}
              >
                <Box className="btn_wrap">
                  <Button
                    sx={{
                      width: "auto !important",
                    }}
                  >
                    Spacebar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography className="text_1" pb={"0.5rem"}>
              <Typography component={"img"} src={obj.src} /> Objective:
            </Typography>
            <Typography component={"li"} py={"0.5rem"}>
              Score points by bouncing the ball off walls.
            </Typography>
            <Typography component={"li"} pb={"0.5rem"}>
              {"Don’t let the ball pass your paddle!"}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: { sm: "3rem", xs: "1rem" },
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
              onClick={()=>setShowGame(true)}
                sx={{
                  width: "auto !important",
                  background: "#E25822 !important",
                  fontFamily: `${Press_Start_2P_font.style.fontFamily} !important`,
                }}
              >
                Press Start
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
