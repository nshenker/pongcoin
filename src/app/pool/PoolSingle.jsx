"use client";
import { API_URL } from '@/utils/config';
import { Box, Button, TableCell, TableRow } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PoolSingle = ({row}) => {
  const [user,setUser] = useState({})
  const [creator,setCreator] = useState({})
  const [opponent,setOpponent] = useState({})
  
      const {connection} = useConnection();
      const [txnHash, setTxnHash] = useState('');
      const { publicKey , sendTransaction } = useWallet();
      const [showRetry, setShowRetry] = useState(false);
  
  const getUser = async () => {
    const access_token = window.localStorage.getItem("token")
    
    try {
      const res = await axios.get(`${API_URL}/get/user?id=${row.creator}`, {
        headers: {
          "x-access-token" : access_token
        }
      });

      if (res.status === 200) {        
        setCreator(res.data.data)
      }
  

      const resOp = await axios.get(`${API_URL}/get/user?id=${row.opponent}`, {
        headers: {
          "x-access-token" : access_token
        }
      });

      if (resOp.status === 200) {        
        setOpponent(resOp.data.data)
      }


    } catch (err) {
       
    }
  }


  const getMe = async () => {
    const access_token = window.localStorage.getItem("token")
    
    try {
      const res = await axios.get(`${API_URL}/get/me`, {
        headers: {
          "x-access-token" : access_token
        }
      });

      if (res.status === 200) {        
        setUser(res.data.data)
      }
  
    } catch (err) {
       
    }
  }


  const joinPool = async () => {

    if(row.deposit == "0" ){
      return false;
    }

    if(showRetry){
      retry();
      return;
    }


    const senderPublicKey = new PublicKey(publicKey ? publicKey.toString() : "");
    const recipient = "G5KqpEzSiPPgioKsqDf7EcNZ7efoKg9PYxJjKSuUhSnY" ; 
    let takeDeposit = false; 

    if(row.status == 0){

      if(!row.opponentJoined || !row.creatorJoined){
        if(!row.opponentJoined && row.creator != user._id){
          takeDeposit = true ;
        }
      }

    }
    let signedTransaction  = "";

    if(takeDeposit){


    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: new PublicKey(recipient),
            lamports: parseFloat(row.deposit) * 1e9,
        })
    );
 

    transaction.feePayer = senderPublicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash; 
   
    signedTransaction = await sendTransaction(transaction,connection)
    setTxnHash(signedTransaction.toString())
  }

    const access_token = window.localStorage.getItem("token")
    
    try {
      const res = await axios.post(`${API_URL}/join/pool`, 
      {
        poolId: row._id,
        txnHash: signedTransaction.toString()  
      },
      {  
        headers: {
          'x-access-token': access_token
        }
      }, 
    );

      if (res.status === 200) { 
        window.localStorage.setItem("gameToken", res.data.gameToken);  
        window.location.href = `/play/${res.data.gameToken}`
    

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
    const access_token = window.localStorage.getItem("token")
       
    try {
      const res = await axios.post(`${API_URL}/join/pool`, 
      {
        poolId: row._id,
        txnHash: txnHash.toString()
      },
      {  
        headers: {
          'x-access-token': access_token
        }
      }, 
    );

      if (res.status === 200) { 
        window.localStorage.setItem("gameToken", res.data.gameToken);  
        window.location.href = `/play/${res.data.gameToken}`
      

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

  useEffect(() => {
    if(row){
      getUser()
      getMe()  
    }
  },[])

  return (
    <>
            <TableRow key={row._id}>
            <TableCell>{row._id}</TableCell>
            <TableCell>{creator.username}</TableCell>
            <TableCell>{row.deposit}    SOL</TableCell>
            <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
            <TableCell
              sx={{
                justifyContent: "start",
                display: "flex",
              }}
            >
              <Box className="btn_wrap"  onClick={() => joinPool()}>
                <Button>{publicKey ? showRetry ?  "Retry" :  "Join" : "Connect Wallet"}</Button>
              </Box>
            </TableCell>
          </TableRow>
    </>
  )
}

export default PoolSingle