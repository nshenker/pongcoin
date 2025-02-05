import { Box, Typography } from "@mui/material";
import React from "react";
import grid_img from "../../assets/grid_img.png";
import pie from "../../assets/pie.png";
import grp_1 from "../../assets/grp_1.svg";
import grp_2 from "../../assets/grp_2.svg";
import { IBM_Plex_Mono, VT323 } from "next/font/google";

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

const tokenomicData = [
  {
    title: "Total Supply",
    subtitle: "1,000,000,000 $PONG",
    marginLeft:"0rem"
  },
  {
    title: "TBA",
    subtitle: "To be announced...",

    marginLeft:"3rem"
  },
  {
    title: "TBA",
    subtitle: "To be announced...",

    marginLeft:"6rem"
  },
  {
    title: "TBA",
    subtitle: "To be announced...",
    marginLeft:"3rem"
  },
  {
    title: "TBA",
    subtitle: "To be announced...",

    marginLeft:"0rem"
  },
];

const Tokenomics = () => {
  return (
    <Box
      sx={{
        px: { lg: "5rem", xs: "1.5rem" },
        py: "1rem",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${grid_img.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: {sm:"100% 100%",xs:"cover"},
          backgroundPosition: "center",
        //   height: "750px",
        }}
      >
        <Typography
          sx={{
            pt: "25px",
            fontSize: {sm:"95px",xs:"60px"},
            fontFamily: vt323Font.style.fontFamily,
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          Tokenomics
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
            textAlign: "center",
          }}
        >
          Supply & Distribution
        </Typography>
        <Box
          sx={{
            position: "relative",
            py: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap:"wrap"
          }}
        >
          <Typography
            component={"img"}
            src={grp_1.src}
            sx={{
                position:"absolute",
                top:{sm:"0px",xs:"5px"},
                left:"20px",
                width:{sm:"auto",xs:"100px"}
            }}
            // width={"400px"}
            // height={"400px"}
          />
          <Typography
            component={"img"}
            src={grp_2.src}
            sx={{
                position:"absolute",
                bottom:{sm:"20px",xs:"5px"},
                right:"20px",
                width:{sm:"auto",xs:"100px"}
            }}
            // width={"400px"}
            // height={"400px"}
          />
          <Typography
            component={"img"}
            src={pie.src}
            sx={{
                width:{sm:"400px",xs:"100%"},
                height:{sm:"400px"}
            }}
          />

          <Box>
            {tokenomicData?.map((e, index) => (
              <Box
                key={index}
                sx={{
                  background: "#000",
                  // height:"100%",
                  width: { lg: "455px" },
                  height: { lg: "90px" },
                  ml:e.marginLeft,
                  mb: "1.2rem",
                }}
              >
                <Box
                  sx={{
                    height: { lg: "90px" },
                    position: "relative",
                    top: "-5px",
                    right: "-5px",
                    p: "0.8rem 1rem",
                    border: "1px solid #000",
                    background: "#FAF3E0",
                    display: "grid",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                      fontWeight: "bold",
                      color: "#E25822",
                    }}
                  >
                    {e.title}
                  </Typography>
                  {
                    e.subtitle != "" &&
                  <Typography
                    sx={{
                    //   pt:"0.3rem",
                      fontSize: "16px",
                      lineHeight: "normal",
                      fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                    }}
                  >
                    {e.subtitle}
                  </Typography>
                  }

                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Tokenomics;
