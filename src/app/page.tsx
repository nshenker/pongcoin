
"use client";
import LandingPage from "../pages/LandingPage/page"
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box  sx={{
      "& .MuiContainer-root":{
        "@media (min-width:1260px)":{
          maxWidth:"1500px"
        },
      }
    }}>
    <LandingPage/>
    </Box>
  );
}
