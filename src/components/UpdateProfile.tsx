"use client";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IBM_Plex_Mono } from "next/font/google";
import sol from "../assets/sol.svg";
import { API_URL } from "@/utils/config";
import axios from "axios";
import {
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { ContractContext } from "@/contexts/ContractContext";


interface BootstrapDialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});
function BootstrapDialogTitle(props: BootstrapDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        fontSize: "1.2rem",
        p: 1.2,
        borderBottom: "2px solid rgba(255, 255, 255, 0.22)",
        fontWeight: "600",
      }}
      {...other}
    >
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 6,
            top: 6,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
}
export default function UpdateProfileDialog({
  isDialogOpen,
  setIsDialogOpen
}: any) {
  const { connection } = useConnection();
   const {solBalance}=useContext(ContractContext)
  const [balErr, setBalErr] = useState("");
  const [amount, setAmount] = useState("0");
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);  
  const [userName, setUserName] = useState(window.localStorage.getItem("username"));
  const [showRetry, setShowRetry] = useState(false);
  const [message, setMessage] = useState("");
  
  const [poolId, setPoolId] = useState(0);
  const { publicKey, sendTransaction } = useWallet();

  const updateProfile = async () => {
    setUpdateLoading(true);
    const access_token = localStorage.getItem("token");
    setProfileUpdated(false);
    try {
      const res = await axios.post(
        `${API_URL}/update/user`,
        {
          username: userName,
        },
        {
          headers: {
            "x-access-token": access_token,
          },
        }
      );

      if (res.status === 200) {
        setMessage("Profile Updated Successfully.")
        if(userName){
          localStorage.setItem("username" , userName)
        }
        setTimeout(() => {
          setUpdateLoading(false);
        setProfileUpdated(true); 
        setMessage("")
        }, 2000);
        
      }
    } catch (err:any) {
      console.log(err)
      setMessage(err.response.data.error)
      setUpdateLoading(false);
    }
  };

 

  
  const close = () => {
    setUpdateLoading(false);
    setProfileUpdated(false); 


    setIsDialogOpen(false);
  }


  return (
    <Dialog 
      disableScrollLock
      
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      sx={{
        "& .MuiDialogContent-root": {
          padding: "1.2rem 1rem",
        },
        "& .MuiDialogActions-root": {
          padding: "1rem",
        },
        "& .MuiDialog-container": {
          backdropFilter: "blur(2px)",
        },
        "& .MuiPaper-root": {
          maxWidth: "500px !important",
          borderRadius: "10px",
          background: "#FAF3E0",
          backdropFilter: "blur(12.5px)",
          color: "#000",
          width: { md: "100% !important", xs: "500px !important" },
          overflowX: { md: "auto", xs: "scroll" },
          boxShadow: "inset 0px 0px 15px rgba(255, 255, 255, 0.4)",
        },
        "& p,div,a": {
          fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
          // fontSize:"15px"
        },
        "& .bin1": {
          mt: "5px",
          background: "rgba(77, 77, 77, 0.35)",
          width: "100%",
          border: "2px solid transparent !important",
          borderRadius: "7px",
          p: "5px",
          "& input[type=number]": {
            "-moz-appearance": "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&:hover": {
            border: "2px solid transparent !important",
          },
          "& :focus": {
            boxShadow: "none !important",
            border: "none !important",
            borderRadius: "5px !important ",
          },
          "& input,textarea": {
            padding: "8px 15px",
            fontSize: "14px",
            color: "#000 !important",
            fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
            "&::placeholder": {
              color: "#000 !important",
              fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
            },
          },
        },
      }}
    >
      <BootstrapDialogTitle onClose={() => close()}>
        Update
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            "& button": {
              fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
              color: "#fff",
              background: "#000",
              textTransform: "capitalize",
              fontSize: "16px",
              border: "1px solid #E25822",
              height: "36px",
              // width: "152px",
              fontWeight: "400",
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
          {
            message  != "" &&
          
           <Box textAlign={"center"}>
                <Typography>{message}</Typography>
                </Box>
          }
                     
              <Box>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Username
                </p>

                <div className="flex flex-col gap-2 items-end">
                  <div className="relative w-full">
                      <TextField
                      className="bin1"
                      fullWidth
                      type="text"
                      placeholder="0.0"
                      variant="standard"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  {balErr && <Typography sx={{color:"red",fontSize:"13px",pt:"5px"}}>{balErr}</Typography>}
                </div>
                <Box display={"inline-block"}>
                  <Box mt={"1rem"} className="btn_wrap">
                    <Button
                      sx={{
                        "&.Mui-disabled": {
                          cursor: "not-allowed !important",
                          pointerEvents: "auto !important",
                          color: "rgb(255 255 255 / 68%) !important",
                        },
                      }}
                      disabled={updateLoading||balErr!==""}
                      onClick={() => updateProfile()}
                    >
                      Update Profile
                      {updateLoading && (
                        <CircularProgress
                          sx={{
                            width: "15px !important",
                            height: "15px !important",
                            color: "#fff",
                            ml: "10px",
                          }}
                        />
                      )}
                    </Button>
                  </Box>
                </Box>
              </Box>
 
           
         
        </Box>
      </DialogContent>
    </Dialog>
  );
}
