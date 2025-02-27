import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  Popper,
  Typography,
} from "@mui/material";
import { Courier_Prime, IBM_Plex_Mono, Press_Start_2P } from "next/font/google";
import React, { useContext, useEffect, useState } from "react";
import WalletConnectButton from "./WalletConnectButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getTokenBalance } from "@/utils/callFucntions";
import wallet_avatar from "@/assets/wallet_avatar.svg"
import Link from "next/link";
import axios from "axios"
import { API_URL } from "@/utils/config";
import { ContractContext } from "@/contexts/ContractContext";
 
import dynamic from 'next/dynamic'


const UpdateProfileDialog = dynamic(
  () => import('./UpdateProfile'),
  { ssr: false }
)

// Font configurations
const courierPrimeFont = Courier_Prime({
  variable: "--font-Courier_Prime-sans",
  subsets: ["latin"],
  weight: "400",
});

const pressStart2PFont = Press_Start_2P({
  variable: "--font-Press_Start_2P-sans",
  subsets: ["latin"],
  weight: "400",
});
const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const {solBalance,setSolBalance}=useContext(ContractContext)
    const [isDialogOpen,setIsDialogOpen] = useState(false);
  
    const { publicKey,disconnect } = useWallet();
    const { connection } = useConnection();
  const [tokenBalance,setTokenBalance] = useState(0)
  // const [solBalance,setSolBalance] = useState("0")
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setSolBalance("0");
      setTokenBalance(0);
      setOpen(false);
      // localStorage.removeItem("token")
      // if(typeof window !== "undefined"){
      //   window.location.reload()
      // }
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const createUser = async () => {
    
    try {
      const res = await axios.post(`${API_URL}/create/user`, {
        address: publicKey
      });

      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("token", res.data.token);       
        localStorage.setItem("username", res.data.data.username);       
      }
  
    } catch (err) {
       
    }
  };

  const hangleConnect = async () => {
    await createUser()
  }

  

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);

  const getBalance = async () => {
    const tokenAddress = "5t8LShVXF9orE62UZQbBokWQFEpnzQMnTFY8snZsnp5o" ; 
    const balance = await getTokenBalance(publicKey?.toString(),tokenAddress,connection);
    setTokenBalance(balance)
    if(publicKey){
      const solbalance = await connection.getBalance(publicKey);
      // alert(solbalance)
      setSolBalance(parseFloat((solbalance/1e9).toString()).toFixed(2))        
    }
  }
  useEffect( () =>  {
    if(publicKey){
      hangleConnect()
      getBalance();
    }
  },[publicKey,connection])
  // React.useEffect(() => {
  //   if (prevOpen.current === true  open === false && anchorRef.current) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  return (
    <Box
      sx={{
        py: "1.2rem",
        border: "solid #000",
        borderWidth: "1px 0",
        px: { lg: "5rem", xs: "1.5rem" },
      }}
    >
      <>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: { sm: "space-between", xs: "center" },
            flexWrap: "wrap",
            "& a , button": {
              fontFamily: courierPrimeFont.style.fontFamily,
              textTransform: "capitalize",
              fontSize: "16px",
              color: "#000",
              background: "#FAF3E0",
              border: "1px solid #000",
              height: "39px",
              width: "120px",
              fontWeight: "400",
              px: "1rem",
              borderRadius: "0",
              position: "relative",
              top: "-3px",
              right: "-3px",
              transition: "0.5s all",
            },
            "& .btn_wrap_connect": {
              background: "#000",
              transition: "0.5s all",
              "&:hover": {
                "& a, button": {
                  top: "0",
                  right: "0",
                  background: "#E25822",
                },
              },
            },
            "& .btn_wrap": {
              background: "#000",
              transition: "0.5s all",
              "&:hover": {
                "& a, button": {
                  top: "0",
                  right: "0",
                  background: "#FAF3E0",
                },
              },
            },
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: { sm: "initial", xs: "center" },
            }}
          >
            <Box className="btn_wrap">
            <Button component={Link} href="/">Home</Button>
            </Box>
            <Box className="btn_wrap">
              <Button component={Link} href="/#tokenomics">Tokenomics</Button>
            </Box>
            <Box className="btn_wrap">
              <Button component={Link} href="/#roadmap">Roadmap</Button>
            </Box>
            <Box className="btn_wrap">
                <Button component={Link} href="/pool">
                  Play
                </Button>
              </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {
              publicKey &&
            <Box className="btn_wrap_connect">
              <Button
                sx={{
                  fontFamily: `${pressStart2PFont.style.fontFamily} !important`,
                  color: "#fff !important",
                  width: "auto !important",
                  background: "#E25822 !important",
                }}
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
              <img src={wallet_avatar.src} width={"25px"} style={{marginRight: "10px"}}/> {publicKey.toString().substring(0,4)}...{publicKey.toString().substring(publicKey.toString().length-4,publicKey.toString().length)}
              </Button>
            </Box>
            }

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              sx={{
                zIndex: "1200",
              }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Box
                    sx={{
                      mt: "1rem",
                      background: "#FAF3E0",
                      border: "2px solid #000",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                      <Box
                        sx={{
                          p: "1rem",
                          textAlign: "center",
                          "& select": {
                            p: "10px",
                            background: "transparent",
                            borderRadius: "0",
                            "&:focus-visible": {
                              outline: "0 !important",
                            },
                          },
                        }}
                      > 
                      <Box
                      sx={{
                        "& p": {
                          fontSize: "16px",
                          fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                        },
                        pt: "1rem",
                        display: "flex",
                        cursor: "pointer",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Username:</Typography>
                      <Typography onClick={() => setIsDialogOpen(true)} fontWeight={"600"} sx={{textDecoration: "underline"}}>
                        @{window.localStorage.getItem("username")}
                      </Typography>
                    </Box>
                       <Box
                        sx={{
                          "& p": {
                            fontSize: "16px",
                            fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                          },
                          pt: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>SOL:</Typography>
                        <Typography fontWeight={"600"}>
                          {solBalance}
                        </Typography>
                      </Box>
                           
                          <Box
                            sx={{
                              "& p": {
                                fontSize: "16px",
                                fontFamily: IBM_Plex_Mono_Font.style.fontFamily,
                              },
                              pt: "1rem",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>$PONG:</Typography>
                            <Typography fontWeight={"600"}>
                              {parseFloat(tokenBalance.toString()).toFixed(2)} 
                            </Typography>
                          </Box>
                          <Box
                            className="btn_wrap_connect"
                            mt={"1rem"}
                            display={"inline-block"}
                          >
                            <Button
                              sx={{
                                fontFamily: `${pressStart2PFont.style.fontFamily} !important`,
                                color: "#fff !important",
                                width: "auto !important",
                                background: "#E25822 !important",
                              }}
                              onClick={handleDisconnect}
                            >
                              Disconnect
                            </Button>
                          </Box>
                        </Box>
                      </MenuList>
                    </ClickAwayListener>
                  </Box>
                </Grow>
              )}
            </Popper>
            {
              !publicKey &&  
              <Box className="btn_wrap_connect">
              <Box
                sx={{
                  "& button": {
                    fontFamily: `${pressStart2PFont.style.fontFamily} !important`,
                    color: "#fff !important",
                    width: "auto !important",
                    background: "#E25822 !important",
                  },
                }}
              >
                <WalletConnectButton />
              </Box>
            </Box>
          }
          </Box>
        </Box>
      </>
      <UpdateProfileDialog   isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </Box>
  );
};

export default Header;
