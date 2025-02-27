"use client";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import WalletConnectButton from "@/components/WalletConnectButton";
import { ContractContext } from "@/contexts/ContractContext";
import { API_URL } from "@/utils/config";
import { timeAgo } from "@/utils/functions";
import {
  Box,
  Button,
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import { Press_Start_2P } from "next/font/google";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const pressStart2PFont = Press_Start_2P({
  variable: "--font-Press_Start_2P-sans",
  subsets: ["latin"],
  weight: "400",
});

const PoolSingle = ({ row, tabIndex }) => {
  const { user } = useContext(ContractContext);
  // const [user, setUser] = useState({});
  const [txnHash, setTxnHash] = useState("");
  const [creator, setCreator] = useState({});
  const [opponent, setOpponent] = useState({});
  const [rowVisible, setRowVisible] = useState(false);
  const { connection } = useConnection();
  const { wallet } = useWallet();
  const { publicKey, sendTransaction } = useWallet();
  const [joinPoolLoading, setJoinPoolLoading] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const getUser = async () => {
    const access_token = window.localStorage.getItem("token");

    try {
      const res = await axios.get(`${API_URL}/get/user?id=${row?.creator}`, {
        headers: {
          "x-access-token": access_token,
        },
      });

      if (res.status === 200) {
        setCreator(res.data.data);
      }

      const resOp = await axios.get(`${API_URL}/get/user?id=${row?.opponent}`, {
        headers: {
          "x-access-token": access_token,
        },
      });

      if (resOp.status === 200) {
        setOpponent(resOp.data.data);
      }
    } catch (err) {}
  };

  const joinPool = async () => {

    if (row.deposit == "0") {
      return false;
    }

    if (showRetry) {
      retry();
      return;
    }
    setJoinPoolLoading(true);

    const senderPublicKey = new PublicKey(
      publicKey ? publicKey.toString() : ""
    );
    const recipient = "G5KqpEzSiPPgioKsqDf7EcNZ7efoKg9PYxJjKSuUhSnY";
    let takeDeposit = false;

    if (row.status == 0) {
      if (!row?.opponentJoined || !row?.creatorJoined) {
        if (!row?.opponentJoined && row?.creator != user?._id) {
          takeDeposit = true;
        }
      }
    }
    let signedTransaction = "";

    if (takeDeposit) {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(row.deposit) * 1e9,
        })
      );

      transaction.feePayer = senderPublicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      signedTransaction = await sendTransaction(transaction, connection);
      setTxnHash(signedTransaction.toString());
    }
    if(!txnHash){
      setJoinPoolLoading(false)
    }
    const access_token = window.localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${API_URL}/join/pool`,
        {
          poolId: row._id,
          txnHash: signedTransaction.toString(),
        },
        {
          headers: {
            "x-access-token": access_token,
          },
        }
      );

      if (res.status === 200) {
        setJoinPoolLoading(false);
        window.localStorage.setItem("gameToken", res.data.gameToken);
        window.location.href = `/play/${res.data.gameToken}`;
      }
      if (res.status === 401) {
        setShowRetry(true);
        setJoinPoolLoading(false);
      }
    } catch (err) {
      if (err?.status == 401 && signedTransaction.toString()) {
        setShowRetry(true);
        setJoinPoolLoading(false);
      }
    else{
      setJoinPoolLoading(false);
    }
       
    }
  };

  const retry = async () => {
    const access_token = window.localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${API_URL}/join/pool`,
        {
          poolId: row._id,
          txnHash: txnHash.toString(),
        },
        {
          headers: {
            "x-access-token": access_token,
          },
        }
      );

      if (res.status === 200) {
        window.localStorage.setItem("gameToken", res.data.gameToken);
        window.location.href = `/play/${res.data.gameToken}`;
      }
      if (res.status === 401) {
        setShowRetry(true);
      }
    } catch (err) {
      if (txnHash) {
        setShowRetry(true);
      }
    }
  };

  useEffect(() => {
    if (row?.creator || row?.opponent) {
      getUser();
    }
  }, [row.creator, row?.opponent]);

  // console.log(row.creator,row?.opponent);

  // useEffect(() => {
  //   let isVisible = false;
  //   // debugger

  //   if (tabIndex === 0) {
  //     isVisible = row?.creatorJoined && row?.online;
  //   } else if (tabIndex === 1) {
  //     isVisible =
  //       (row?.creatorJoined && creator?._id === user?._id) ||
  //       (row?.opponentJoined && opponent?._id === user?._id);
  //   } else {
  //     isVisible = creator?._id === user?._id || opponent?._id === user?._id;
  //   }

  //   setRowVisible(isVisible);
  // }, [tabIndex, row, creator, user, opponent]);

  return (
    <>
      <TableRow key={row._id}>
        <TableCell>{row._id}</TableCell>
        {tabIndex===2?
        <TableCell>{(creator?.username&&opponent?.username)?`${creator?.username} / ${opponent?.username}`:"Fetching.."}</TableCell>
        :
        <TableCell>{creator?.username?creator?.username:"Fetching.."}</TableCell>}
        <TableCell>{row?.deposit} SOL</TableCell>
        <TableCell>{timeAgo(row?.createdAt)}</TableCell>
        <TableCell sx={{
          // whiteSpace:"nowrap"
        }}>
          {publicKey ? (
            <Box sx={{ justifyContent: "start", display: "flex", gap: "1rem" }}>
              <Box className="btn_wrap" onClick={() => joinPool()}>
                {(tabIndex == 0 ||tabIndex == 1 )&& 
                    <Button
                      sx={{
                        "&.Mui-disabled": {
                          cursor: "not-allowed !important",
                          pointerEvents: "auto !important",
                          color: "rgb(255 255 255 / 68%) !important",
                        },
                      }}
                      disabled={joinPoolLoading}
                    >
                      {publicKey
                        ? showRetry
                          ? "Retry"
                          : tabIndex == 1
                          ? "Resume"
                          : "Join"
                        : "Connect Wallet"}
                      {joinPoolLoading && (
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
                  }
              </Box>
              {tabIndex == 1 && (
                <Box className="btn_wrap" onClick={() => setIsDialogOpen(true)}>
                  <Button>Leave</Button>
                </Box>
              )}
              {tabIndex == 2 && (
                <Box
                  className="btn_wrap"
                  onClick={() =>
                    window.open(
                      `https://solscan.io/tx/${row?.winnerRewardedHash}`,
                      "_blank"
                    )
                  }
                >
                  <Button>View Txn</Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box className="btn_wrap" sx={{ display: "inline-block" }}>
              <WalletConnectButton />
            </Box>
          )}
        </TableCell>
      </TableRow>
      {
          showRetry && (
            <Box sx={{position:"absolute", background: "white",  top: "5%" , left: "2%" , width: "480px" , height: "auto" , p: "10px"}}>
            <Box textAlign={"center"} mt={"30px"} mb={"20px"}>
                  <Typography>Payment verification failed</Typography>
                  </Box>
                  <Box>
                  <Typography>
                <strong>ID:</strong> {row._id}
                </Typography>
              {
                txnHash != "" &&
              <Typography>                
              <strong>Txn Hash:</strong> <a href={`https://solscan.io/tx/${txnHash}`}> {txnHash}</a>
              </Typography>
              }
              </Box>
              {
                 (row._id && txnHash  == "") ?
                  <Box
                  mt={"1rem"}
                  sx={{
                    display: "inline-block",
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
                  }}
                  className="btn_wrap"
                >
                  <Button
                    sx={{
                      "&.Mui-disabled": {
                        cursor: "not-allowed !important",
                        pointerEvents: "auto !important",
                        color: "rgb(255 255 255 / 68%) !important",
                      },
                    }}
                    disabled={joinPoolLoading}
                    onClick={() => joinPool()}
                  >
                    Join Pool
                    {joinPoolLoading && (
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
                  :
                    (row._id && txnHash  != "") ?
                  <Box
                    mt={"1rem"}
                    sx={{
                      display: "inline-block",
                      "& button": {
                        fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
                        color: "#fff",
                        background: "#000",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        border: "1px solid #E25822",
                        height: "36px", 
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
                    }}
                    className="btn_wrap"
                  >
                    <Button onClick={() => retry()}>Retry</Button>
  
                  
                  </Box>
                  :
                  <></>
          }

              <Box mt={"1rem"} sx={{ml:"10px", display: "inline-block",  width: "85px"}} className="btn_wrap">
                      <Button
                        sx={{
                          "&.Mui-disabled": {
                            cursor: "not-allowed !important",
                            pointerEvents: "auto !important",
                            color: "rgb(255 255 255 / 68%) !important",
                          },
                        }}
                        disabled={createLoading||balErr!==""}
                        onClick={() => close()}
                      >Close</Button>
                      </Box> 
                </Box>
                  
            ) 
          }
      {/* Confirmation Popups */}
      {isDialogOpen && (
        <ConfirmationPopup
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          poolId={row?._id}
        />
      )}
    </>
  );
};

export default PoolSingle;
