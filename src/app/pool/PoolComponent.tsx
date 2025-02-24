"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { IBM_Plex_Mono } from "next/font/google";
import PoolSingle from "./PoolSingle";
import axios from "axios";
import { API_URL } from "@/utils/config";



const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});
interface PoolComponentProps {
  tabIndex: number;
}
const PoolComponent: React.FC<PoolComponentProps>= ({tabIndex}) => {
  const [user, setUser] = useState({});
  const getMe = async () => {
    const access_token = window.localStorage.getItem("token");

    try {
      const res = await axios.get(`${API_URL}/get/me`, {
        headers: {
          "x-access-token": access_token,
        },
      });

      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (err) {}
  };
 

  const [data,setData] = useState([]);

  const getData = async () => {
    
    const access_token = localStorage.getItem("token")
    
    try {
      const res = await axios.get(`${API_URL}/get/pools`);

      if (res.status === 200) {        
        const fetchedData = res.data.data;

        // Apply filtering based only on status
        const filteredData = fetchedData.filter((item:any) => {
          if (tabIndex === 0) {
            return item.status === 0; // "Live" tab - status 0
          } else if (tabIndex === 1) {
            return item.status !== 2; // "Play" tab - status NOT 2
          } else if (tabIndex === 2) {
            return item.status === 2; // "History" tab - status 2
          }
          return false;
        });
  
        setData(filteredData);
      }
  
    } catch (err) {
       
    }
  }

  useEffect(() => {
    // getData();  
    getMe();
    getData();

    setInterval(() => {
    },30000)
  },[])

  // useEffect(() => {
  //   // setData([])
  // },[tabIndex])

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        overflow: "auto",
        height: "200px",
        background: "#FAF3E0",
        // scrollbarWidth: "none", // For Firefox
        // "&::-webkit-scrollbar": {
        //   display: "none", // Hide scrollbar in Webkit browsers (Chrome, Safari)
        // },
        "& th,td": {
          fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
        },
        "& td": {
          fontSize: "12px",
        },
        "& th": {
          fontSize: "13px",
          background: "#FAF3E0", // Ensure background remains visible when sticky
          position: "sticky",
          top: 0,
          zIndex: 2,
        },
        "& button": {
          fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
          color: "#fff",
          background: "#000",
          textTransform: "capitalize",
          fontSize: "13px",
          border: "1px solid #E25822",
          height: "36px",
          width: "auto",
          fontWeight: "600",
          px: "1rem",
          borderRadius: "0",
          position: "relative",
          top: "-2px",
          right: "-2px",
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
      <Table
        sx={{
          width: { lg: "100%", xs: "600px" },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              "& th,td": {
                fontWeight: "bold",
              },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Created on</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row,index) => (
            <PoolSingle row={row} key={index} tabIndex={tabIndex} user={user}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PoolComponent;
