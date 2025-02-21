"use client";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IBM_Plex_Mono } from "next/font/google";
import sol from "../assets/sol.svg"
import { API_URL } from "@/utils/config";
import axios from "axios";
import { Keypair, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { getProvider } from "@coral-xyz/anchor";

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
        fontWeight:"600"
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
export default function CreatePoolDialog({isDialogOpen,setIsDialogOpen}:any) {
   
    const {connection} = useConnection();
    const [amount, setAmount] = useState("0");
    const [poolCreated, setPoolCreated] = useState(false);
    const [txnHash, setTxnHash] = useState('');
    const [showRetry, setShowRetry] = useState(false);
    
    const [poolId,setPoolId] = useState(0)
    const { publicKey , sendTransaction } = useWallet();
 

    const createPool = async () => {
      const access_token = localStorage.getItem("token")
      setPoolCreated(false)
      try {
        const res = await axios.post(`${API_URL}/create/pool`, 
        {
          amount: amount
        },
        {  
          headers: {
            'x-access-token': access_token
          }
        }, 
      );
  
        if (res.status === 201) {
          setPoolCreated(true)
          setPoolId(res.data.data._id)
        }
    
      } catch (err) {
         
      }
    };
    const access_token = localStorage.getItem("token")
    
    const joinPool = async () => {
      if(amount == "0" ){
        return false;
      }
      const senderPublicKey = new PublicKey(publicKey ? publicKey.toString() : "");
      const recipient = "G5KqpEzSiPPgioKsqDf7EcNZ7efoKg9PYxJjKSuUhSnY" ; 
      const transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: senderPublicKey,
              toPubkey: new PublicKey(recipient),
              lamports: parseFloat(amount) * 1e9,
          })
      );
      let mintKeypair = Keypair.generate();

      transaction.feePayer = senderPublicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash; 
      // const provider = { connection, wallet };

      // const signedTransaction = await provider.signTransaction(transaction);
     
      const signedTransaction = await sendTransaction(transaction,connection)
      setTxnHash(signedTransaction.toString())
      
      try {
        const res = await axios.post(`${API_URL}/join/pool`, 
        {
          poolId: poolId,
          txnHash: signedTransaction.toString()
        },
        {  
          headers: {
            'x-access-token': access_token
          }
        }, 
      );
  
        if (res.status === 200) {
          setPoolCreated(true)
          localStorage.setItem("gameToken", res.data.gameToken);  
          window.location.href = `/play/${res.data.gameToken}`
          setPoolCreated(false)

        }
        if(res.status === 401){
          setShowRetry(true);
        }
    
      } catch (err) {
        if(txnHash){
          setShowRetry(true);
        }
      }
    }

    const retry = async() => {
       
      try {
        const res = await axios.post(`${API_URL}/join/pool`, 
        {
          poolId: poolId,
          txnHash: txnHash.toString()
        },
        {  
          headers: {
            'x-access-token': access_token
          }
        }, 
      );
  
        if (res.status === 200) { 
          localStorage.setItem("gameToken", res.data.gameToken);  
          window.location.href = `/play/${res.data.gameToken}`
          setPoolCreated(false)

        }
        if(res.status === 401){
          setShowRetry(true);
        }
    
      } catch (err) {
        if(txnHash){
          setShowRetry(true);
        }
       
      }
    }

    
    const onChangeAmount = (e:any) => {
      if (Number(e.target.value) < 0) return;
      setAmount(e.target.value);
    };
  
    // const handleCreatePool = async () => {
    //   if (!wallet.connected) {
    //     toast.error("Not connected wallet!");
    //     return;
    //   }
  
    //   const id = toast.loading(`Creating pool...`);
  
    //   try {
       
  
       
  
    //     // const allIxs = await getCreatePoolTx(
    //     //   mintKeypair.publicKey.toBase58(),
    //     //   TOKEN_TOTAL_SUPPLY,
    //     //   NATIVE_MINT,
    //     //   0
    //     // );
      
   
  
    //     // // console.log('allIxs:', allIxs);
  
    //     // const blockhash = (await connection.getLatestBlockhash("finalized"))
    //     //   .blockhash;
    //     // const message = new TransactionMessage({
    //     //   payerKey: wallet.publicKey,
    //     //   instructions: allIxs,
    //     //   recentBlockhash: blockhash,
    //     // }).compileToV0Message(Object.values({ ...(addLookupTableInfo ?? {}) }));

    //     // const transaction = new VersionedTransaction(message);
    //     // transaction.sign([mintKeypair]);
  
    //     // const txHash = await send(connection, walletCtx, transaction);
    //     // // console.log('txHash:', txHash);
  
    //     // const result = await updateToken(
    //     //   name,
    //     //   ticker,
    //     //   description,
    //     //   imageUrl,
    //     //   twitterLink,
    //     //   telegramLink,
    //     //   websiteLink,
    //     //   mintKeypair.publicKey.toBase58()
    //     // );
    //     // if (!result) {
    //     //   toast.dismiss(id);
    //     //   toast.error("Failed to update token info!");
    //     //   setIsDialogOpen(false);
    //     //   return;
    //     // }
  
    //     // toast.dismiss(id);
    //     // toast.success(`Created a new bonding curve with token '${name}'`);
  
    //     setIsDialogOpen(false);
    //   } catch (err) {
    //     console.error("handleCreateCoin err:", err);
    //     toast.dismiss(id);
    //     toast.error(err.message);
    //   }
    // };
  
    return (
      
        <Dialog
         onClose={() => setIsDialogOpen(false)}
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
                    background:
                      "#FAF3E0",
          backdropFilter: "blur(12.5px)",
          color: "#000",
          width: { md: "100% !important", xs: "500px !important" },
          overflowX: { md: "auto", xs: "scroll" },
          boxShadow: "inset 0px 0px 15px rgba(255, 255, 255, 0.4)",
          
        },
        "& p,div,a":{
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
            <BootstrapDialogTitle onClose={() => setIsDialogOpen(false)}>
        Create
      </BootstrapDialogTitle>
      <DialogContent dividers>

        {
          showRetry ?
          <Box>
          <Typography>Payment verification failed</Typography>
     
          <Box mt={"1rem"} sx={{
                      "& button": {
                        fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
                        color: "#fff",
                        background: "#000",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        border: "1px solid #E25822",
                        height: "36px",
                        width: "152px",
                        fontWeight: "400",
                        px: "1rem",
                        borderRadius: "0",
                        position: "relative",
                        top: "-2px",
                        right: "-2px",
                        transition: "0.5s all",
                      }, 
                        
                        "&:hover": {
                          "& button": {
                            top: "0",
                            right: "0",
                            background: "#000",
                          },
                        }, 
                }} className="btn_wrap">
         
                    <Button 
                    onClick={() => retry()}
                    >Retry</Button>
    
                    
                  </Box>          
          </Box>
          :
          poolCreated ?
          <Box>
          <Typography>Pool Created Successfully.</Typography>
     
          <Box mt={"1rem"} sx={{
                      "& button": {
                        fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
                        color: "#fff",
                        background: "#000",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        border: "1px solid #E25822",
                        height: "36px",
                        width: "152px",
                        fontWeight: "400",
                        px: "1rem",
                        borderRadius: "0",
                        position: "relative",
                        top: "-2px",
                        right: "-2px",
                        transition: "0.5s all",
                      }, 
                        
                        "&:hover": {
                          "& button": {
                            top: "0",
                            right: "0",
                            background: "#000",
                          },
                        }, 
                }} className="btn_wrap">
         
                    <Button 
                    onClick={() => joinPool()}
                    >Join Pool</Button>
    
                    
                  </Box>          
          </Box>
           :
     <Box>
                  <p style={{
                    fontSize:"16px",
                    fontWeight:"600",
                    marginBottom:"1rem"
                  }}>
                    Enter the pool deposit amount
                  </p>
                  
                  <div className="flex flex-col gap-2 items-end">
                   
                    <div className="relative w-full">
                      {(
                        <div>
                          <p
                           style={{
                            display:'flex',
                            gap:"5px",
                            alignItems:"center",
                            fontSize:"14px"
                           }}
                          >
                              <img
                            src={sol.src}
                            // width={32}
                            // height={32}
                            alt="sol"
                          />  SOL
                          </p>
                      
                        </div>
                      ) }
                
                         <TextField
                                    className="bin1"
                                    fullWidth
                                    type="text"
                                    placeholder="0.0"
                                    variant="standard"
                                    value={amount}
                                    onChange={onChangeAmount}
                                    InputProps={{
                                      disableUnderline: true,
                                    }}
                                  />
                    </div>
                  </div>
                <Box display={"inline-block"} sx={{
                      "& button": {
                        fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
                        color: "#fff",
                        background: "#000",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        border: "1px solid #E25822",
                        height: "36px",
                        width: "152px",
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
                }}>
                <Box mt={"1rem"} className="btn_wrap">
         
                    <Button 
                    onClick={() => createPool()}
                    >Create Pool</Button>
    
                    
                  </Box>
                </Box>
                </Box>
        }
      </DialogContent>
       
        </Dialog>
     
    );
  }
 