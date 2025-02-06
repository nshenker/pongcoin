"use client";
import { Box, Typography } from "@mui/material";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import React, { useEffect } from "react";
import GLOW from "../../assets/GLOW.gif";
import left from "../../assets/left.svg";
import slider_1 from "../../assets/slider_1.svg";
import right from "../../assets/right.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

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

const SliderSection = () => {
  useEffect(() => {
    // Ensure navigation buttons are rendered before Swiper initializes
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");

    if (prevButton && nextButton) {
      prevButton.innerHTML = `<img src="${left.src}" alt="Left Arrow" style="width: 25px; height: 25px;"  />`;
      nextButton.innerHTML = `<img src="${right.src}" alt="Right Arrow" style="width: 25px; height: 25px;" />`;
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          background: "#009B77",
          px: { lg: "5rem", xs: "1.5rem" },
          pt: "2rem",
          pb: "4rem",
        }}
        id="roadmap"
      >
        <Typography
          sx={{
            fontSize: { sm: "168px", xs: "80px" },
            fontFamily: vt323Font.style.fontFamily,
            lineHeight: "normal",
            textAlign: { sm: "start", xs: "center" },
            px: { lg: "6rem" },
            position: "relative",
            zIndex: 1,
          }}
        >
          Roadmap
        </Typography>
        <Box
          sx={{
            background: "#000",
            width: { lg: "1100px" },
            m: {sm:"-3.5rem auto 0",xs:"-1.5rem 0 0"},
            textAlign: "end",
            position:"relative"
          }}
        >
            <Typography component={"img"} src={slider_1.src} sx={{
                position:"absolute",
                left:{sm:"-10%"},
                top:{sm:"30%"},
                transform:"translateY(-30%)"
            }}/>
            {/* <Typography component={"img"} src={slider_2.src} sx={{
                position:"absolute",
                right:{sm:"10%"},
                // top:{sm:"30%"},
                // transform:"translateY(-30%)"
            }}/> */}
          <Box
            sx={{
              position: "relative",
              top: "-5px",
              right: "-5px",
              p: "2rem",
              background: "#FAF3E0",
              "& p": {
                fontSize: "16px",
                fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                textAlign: "start",
              },
              "& .swiper-button-prev, .swiper-button-next": {
                bottom: "0 !important",
                top: {sm:"85%",xs:"92%"},
                color: "#000",
                background: "#FAF3E0",
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.7)",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              },
              "& .swiper-button-prev": {
                left: "auto",
                right: {md:"8%",sm:"15%",xs:"30%"},
              },
              "& .swiper-button-prev:after, .swiper-button-next:after": {
                display:"none"
              },
            }}
          >
            <Swiper
              navigation
              modules={[Autoplay, Navigation, Pagination]}
              className="mySwiper"
            >
              {[0, 1, 3, 4, 5].map((e, i) => (
                <SwiperSlide key={i}>
                  <Typography
                    component={"img"}
                    src={GLOW.src}
                    sx={{
                      width: { sm: "88px", xs: "68px" },
                      height: { sm: "71px", xs: "51px" },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { sm: "23px !important", xs: "16px" },
                      fontWeight: "600",
                    }}
                  >
                    Phase 1: Serve
                  </Typography>
                  <Typography pt={"1rem"}>
                    Website Launch: Unveiling our official platform to the
                    world.
                  </Typography>
                  <Typography pt={"1rem"}>
                    Community Building: Initiating social media channels and
                    engaging with early supporters.
                  </Typography>
                  <Typography pt={"1rem"} mb={"3rem"}>
                    Initial Exchange Listings: Securing spots on reputable
                    exchanges for trading.
                  </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SliderSection;
