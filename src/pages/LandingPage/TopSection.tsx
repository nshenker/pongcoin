import {
  Box,
  Button,
  Grid,
  keyframes,
  Typography,
} from "@mui/material";
import {
  IBM_Plex_Mono,
  Press_Start_2P,
  VT323,
} from "next/font/google";
import logo from "../../assets/logo.png";
import Pingpong from "../../assets/Pingpong.gif";
import pong_mask from "../../assets/pong_mask.png";
import GLOW from "../../assets/GLOW.gif";
import cost from "../../assets/cost.gif";
import fast from "../../assets/fast.gif";
import funny from "../../assets/funny.gif";
import Pongcoin_autoscroll from "../../assets/Pongcoin_autoscroll.gif";
import React from "react";
import Header from "@/components/Header";

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

const pressStart2PFont = Press_Start_2P({
  variable: "--font-Press_Start_2P-sans",
  subsets: ["latin"],
  weight: "400",
});

const pongData = [
  {
    image: fast,
    title: "Super Fast Transactions",
    subtitle: "- Blazing speed on blockchain!",
    borderBottom: true,
  },
  {
    image: funny,
    title: "Meme Culture",
    subtitle: "- We love fun and humor.",
    borderBottom: true,
  },
  {
    image: cost,
    title: "Low Fees",
    subtitle: "- More play, less pay!",
    borderBottom: false,
  },
];

const blinkingEffect = keyframes`
  0%, 100% {
    background-color: #E25822;
    border-color: #000;
    color: #fff;
    opacity: 1;
  }
  50% {
    background-color: #FEE501;
    border-color: #E25822;
    color: #E25822;
    opacity: 1;
  }
`;

const TopSection = () => {
  return (
    <>
      <Box lineHeight={0}>
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
        <Box
          sx={{
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
            "& .btn_wrap_top": {
              background: "#000",
              border: "1px solid #E25822",
              transition: "0.5s all",
              "&:hover": {
                border: "1px solid transparent",
                "& btn_wrap_": {
                  top: "0",
                  right: "0",
                  background: "#E25822",
                },
              },
            },
            "& .btn_wrap_": {
              background: "#000",
              border: "1px solid #E25822",
              transition: "0.5s all",
              top: "-4px",
              right: "-4px",
              position: "relative",
              "&:hover": {
                border: "1px solid transparent",
                "& button": {
                  top: "0",
                  right: "0",
                  background: "#E25822",
                },
              },
            },
          }}
        >
          <Grid container spacing={0}>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", xs: "center" },
                flexDirection: "column",
              }}
            >
              <Box />
              <Box
                sx={{
                  pl: { lg: "5rem", xs: "1.5rem" },
                  pr: { md: "0rem", xs: "1.5rem" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: "56px", xs: "40px" },
                    fontFamily: vt323Font.style.fontFamily,
                    lineHeight: "normal",
                    textAlign: { sm: "start", xs: "center" },
                  }}
                >
                  Keep Calm and $PONG On!
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: "23px", xs: "16px" },
                    fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                    textAlign: { sm: "start", xs: "center" },
                  }}
                >
                  The coin that’s always in play.
                </Typography>
                <Box display={"flex"}>
                  <Box className="btn_wrap_top" mt={"1rem"}>
                    <Box
                      className="btn_wrap_"
                      sx={{
                        background: "#000",
                        border: "1px solid #E25822",
                        transition: "0.5s all",
                        "&:hover": {
                          border: "1px solid transparent",
                          "& a": {
                            top: "0",
                            right: "0",
                            background: "#E25822",
                          },
                        },
                      }}
                    >
                      <Button
                        sx={{
                          fontFamily: `'Press Start 2P', cursive`,
                          color: "#fff",
                          width: "auto",
                          background: "#E25822",
                          fontSize: "16px",
                          border: "1px solid #000",
                          height: "39px",
                          fontWeight: "400",
                          px: "1rem",
                          borderRadius: "0",
                          position: "relative",
                          top: "-4px",
                          right: "-4px",
                          transition: "0.5s all",
                          animation: `${blinkingEffect} .25s infinite`,
                          "&:hover": {
                            animation: "none",
                          },
                        }}
                        href="https://raydium.io/swap/?inputMint=sol&outputMint=5t8LShVXF9orE62UZQbBokWQFEpnzQMnTFY8snZsnp5o"
                        target="_blank"
                      >
                        Buy Pong
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  pl: { lg: "5rem", xs: "1.5rem" },
                  pr: { md: "10px", xs: "1.5rem" },
                  border: "2px solid #000",
                  pt: "10px",
                  pb: "8px",
                  mt: { md: "0", xs: "2rem" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { sm: "space-between", xs: "center" },
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      textAlign: { sm: "start", xs: "center" },
                      fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                    }}
                  >
                    Join the squad and let’s make memes move!
                  </Typography>
                  <Box className="btn_wrap" 
                    sx={{
                      "&:hover": {
                          border: "1px solid transparent",
                          "& a": {
                            top: "0",
                            right: "0",
                            background: "#E25822",
                          },
                        },
                    }}
                  >
                    <Button
                      sx={{
                        fontFamily: `${pressStart2PFont.style.fontFamily} !important`,
                        color: "#fff !important",
                        width: "auto !important",
                        background: "#E25822 !important",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        border: "1px solid #000",
                        height: "60px",
                        fontWeight: "400",
                        px: "1rem",
                        borderRadius: "0",
                        position: "relative",
                        top: "-3px",
                        right: "-3px",
                        transition: "0.5s all",
                      }}
                      href={'https://t.me/pingandpongofficial'} target="_blank"
                    >
                      Join now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                position={"relative"}
                sx={{
                  background: "#FEE501",
                }}
              >
                <Typography
                  component={"img"}
                  src={Pingpong.src}
                  sx={{
                    height: { lg: "527px" },
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <Typography
                  component={"img"}
                  src={pong_mask.src}
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <Typography
                  component={"img"}
                  src={GLOW.src}
                  sx={{
                    width: { sm: "88px", xs: "68px" },
                    height: { sm: "71px", xs: "51px" },
                    position: "absolute",
                    top: { sm: "50px", xs: "20px" },
                    left: { sm: "30px", xs: "10px" },
                  }}
                />
                <Typography
                  component={"img"}
                  src={GLOW.src}
                  sx={{
                    width: { sm: "88px", xs: "68px" },
                    height: { sm: "71px", xs: "51px" },
                    position: "absolute",
                    bottom: { sm: "50px", xs: "20px" },
                    right: { sm: "30px", xs: "10px" },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* what is pong ???  */}
        <Typography
          component={"img"}
          src={Pongcoin_autoscroll.src}
          width={"100%"}
          height={"100%"}
          lineHeight={0}
        />
        <Box
          sx={{
            background: "#009B77",
            borderBottom: "5px solid #000",
          }}
        >
          <Grid container spacing={0}>
            <Grid item md={6} xs={12} alignSelf={"center"}>
              <Box
                sx={{
                  px: { lg: "5rem", xs: "1.5rem" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: "95px", xs: "60px" },
                    fontFamily: vt323Font.style.fontFamily,
                    lineHeight: "normal",
                    textAlign: { sm: "start", xs: "center" },
                    py: { md: 0, xs: "1rem" },
                  }}
                >
                  WHAT IS $PONG?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    width: { lg: "495px" },
                    fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                    textAlign: { sm: "justify", xs: "center" },
                    pb: "1rem",
                  }}
                >
                  Inspired by the legendary 80s Ping Pong game, Pong Coin is a
                  fun, fast, and meme-powered cryptocurrency designed for
                  community-driven engagement and retro gaming fans.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  borderLeft: { md: "5px solid #000" },
                  borderTop: { md: 0, xs: "5px solid #000" },
                }}
              >
                {pongData?.map((e, index) => (
                  <Box
                    key={index}
                    sx={{
                      "& p": {
                        fontSize: "16px",
                      },
                      p: { lg: "3rem", xs: "2rem" },
                      display: "flex",
                      gap: "5px",
                      flexWrap: "wrap",
                      borderBottom: e.borderBottom ? "5px solid #000" : "",
                    }}
                  >
                    <Typography
                      component={"img"}
                      src={e.image.src}
                      width={"23px"}
                      height={"23px"}
                    />
                    <Typography
                      sx={{ fontFamily: IBM_Plex_Mono_Font.style.fontFamily }}
                    >
                      <b>{e.title}</b>
                    </Typography>
                    <Typography
                      sx={{ fontFamily: IBM_Plex_Mono_Font.style.fontFamily }}
                    >
                      {e.subtitle}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default TopSection;
