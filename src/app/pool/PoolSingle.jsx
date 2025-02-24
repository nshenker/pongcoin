"use client";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import WalletConnectButton from "@/components/WalletConnectButton";
import { API_URL } from "@/utils/config";
import { Box, Button, CircularProgress, TableCell, TableRow } from "@mui/material";
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
import React, { useEffect, useState } from "react";

const pressStart2PFont = Press_Start_2P({
  variable: "--font-Press_Start_2P-sans",
  subsets: ["latin"],
  weight: "400",
});

const PoolSingle = ({ row, tabIndex,user }) => {
  
  // const [user, setUser] = useState({});
  const [creator, setCreator] = useState({});
  const [opponent, setOpponent] = useState({});
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
    
    setJoinPoolLoading(true)
    if (row.deposit == "0") {
      return false;
    }

    if (showRetry) {
      retry();
      return;
    }

    const senderPublicKey = new PublicKey(
      publicKey ? publicKey.toString() : ""
    );
    const recipient = "G5KqpEzSiPPgioKsqDf7EcNZ7efoKg9PYxJjKSuUhSnY";
    let takeDeposit = false;

    if (row.status == 0) {
      if (!row.opponentJoined || !row.creatorJoined) {
        if (!row.opponentJoined && row.creator != user._id) {
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
        setJoinPoolLoading(false)
        window.localStorage.setItem("gameToken", res.data.gameToken);
        window.location.href = `/play/${res.data.gameToken}`;
      }
      if (res.status === 401) {
        setShowRetry(true);
        setJoinPoolLoading(false)
      }
    } catch (err) {
      if (txnHash) {
        setShowRetry(true);
        setJoinPoolLoading(false)
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
    if (row?.creator!==undefined) {
      getUser();
    }
  }, [row?.creator]);




  return (
    <>
    {tabIndex === 0 &&row?.creatorJoined && row?.online ? (
      <TableRow key={row._id}>
        <TableCell>{row._id}</TableCell>
        <TableCell>{creator.username}</TableCell>
        <TableCell>{row.deposit} SOL</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
        <TableCell>
          {publicKey ? (
            <Box sx={{ justifyContent: "start", display: "flex", gap: "1rem" }}>
              <Box className="btn_wrap" onClick={() => joinPool()}>
                <Button>
                  {publicKey ? (showRetry ? "Retry" : "Join") : "Connect Wallet"}
                </Button>
              </Box>
              {!row?.gameStarted && (
                <Box className="btn_wrap" onClick={() => setIsDialogOpen(true)}>
                  <Button>Leave</Button>
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
    ) : tabIndex === 1 &&
      ((row?.creatorJoined && creator._id == user?._id) ||
        (row?.opponentJoined && opponent?._id == user?._id)) ? (
      <TableRow key={row._id}>
        <TableCell>{row._id}</TableCell>
        <TableCell>{creator.username}</TableCell>
        <TableCell>{row.deposit} SOL</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
        <TableCell>
          {publicKey ? (
            <Box sx={{ justifyContent: "start", display: "flex", gap: "1rem" }}>
              <Box className="btn_wrap" onClick={() => joinPool()}>
                <Button   sx={{
                      "&.Mui-disabled": {
                        cursor: "not-allowed !important",
                        pointerEvents: "auto !important",
                        color: "rgb(255 255 255 / 68%) !important",
                      },
                    }}
                    disabled={joinPoolLoading}>
                  {publicKey ? (showRetry ? "Retry" : "Join") : "Connect Wallet"}
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
              {!row?.gameStarted && (
                <Box className="btn_wrap" onClick={() => setIsDialogOpen(true)}>
                  <Button>Leave</Button>
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
    ) : tabIndex === 2 &&
      ((creator._id == user?._id) || (opponent?._id == user?._id)) ? (
      <TableRow key={row._id}>
        <TableCell>{row._id}</TableCell>
        <TableCell>{creator.username}</TableCell>
        <TableCell>{row.deposit} SOL</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
        <TableCell>
          {publicKey ? (
            <Box sx={{ justifyContent: "start", display: "flex", gap: "1rem" }}>
              <Box className="btn_wrap" onClick={() => joinPool()}>
                <Button>
                  {publicKey ? (showRetry ? "Retry" : "Join") : "Connect Wallet"}
                </Button>
              </Box>
              {!row?.gameStarted && (
                <Box className="btn_wrap" onClick={() => setIsDialogOpen(true)}>
                  <Button>Leave</Button>
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
    ) : null}
  
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
