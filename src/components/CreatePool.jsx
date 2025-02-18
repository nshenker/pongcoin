"use client";

import { Rajdhani } from "next/font/google";
import localFont from "next/font/local";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";


export default function CreatePoolDialog({isDialogOpen,setIsDialogOpen}) {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount, setAmount] = useState();
 
    
    const onChangeAmount = (e) => {
      if (Number(e.target.value) < 0) return;
      setAmount(e.target.value);
    };
  
    const handleCreatePool = async () => {
      if (!wallet.connected) {
        toast.error("Not connected wallet!");
        return;
      }
  
      const id = toast.loading(`Creating pool...`);
  
      try {
       
  
       
  
        // const allIxs = await getCreatePoolTx(
        //   mintKeypair.publicKey.toBase58(),
        //   TOKEN_TOTAL_SUPPLY,
        //   NATIVE_MINT,
        //   0
        // );
      
   
  
        // // console.log('allIxs:', allIxs);
  
        // const blockhash = (await connection.getLatestBlockhash("finalized"))
        //   .blockhash;
        // const message = new TransactionMessage({
        //   payerKey: wallet.publicKey,
        //   instructions: allIxs,
        //   recentBlockhash: blockhash,
        // }).compileToV0Message(Object.values({ ...(addLookupTableInfo ?? {}) }));

        // const transaction = new VersionedTransaction(message);
        // transaction.sign([mintKeypair]);
  
        // const txHash = await send(connection, walletCtx, transaction);
        // // console.log('txHash:', txHash);
  
        // const result = await updateToken(
        //   name,
        //   ticker,
        //   description,
        //   imageUrl,
        //   twitterLink,
        //   telegramLink,
        //   websiteLink,
        //   mintKeypair.publicKey.toBase58()
        // );
        // if (!result) {
        //   toast.dismiss(id);
        //   toast.error("Failed to update token info!");
        //   setIsDialogOpen(false);
        //   return;
        // }
  
        // toast.dismiss(id);
        // toast.success(`Created a new bonding curve with token '${name}'`);
  
        setIsDialogOpen(false);
      } catch (err) {
        console.error("handleCreateCoin err:", err);
        toast.dismiss(id);
        toast.error(err.message);
      }
    };
  
    return (
      
        <Dialog
          as="div"
          open={isDialogOpen}
          className={`relative z-30 focus:outline-none `}
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 bg-black/80">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="flex flex-col gap-10 p-10 w-full max-w-xl rounded-3xl bg-[#030303] border border-white backdrop-blur-2xl">
                  <p className="text-[32px] text-bold text-white">
                    Enter the pool deposit amount
                  </p>
                  
                  <div className="flex flex-col gap-2 items-end">
                   
                    <div className="relative w-full">
                      {(
                        <div className="absolute right-6 inset-y-4 flex gap-1 items-center">
                          <p
                            className={`text-xl text-white `}
                          >
                            SOL
                          </p>
                          <img
                            src="/sol.png"
                            width={32}
                            height={32}
                            alt="sol"
                          />
                        </div>
                      ) }
                      <input
                        value={amount}
                        onChange={onChangeAmount}
                        type="number"
                        className={`w-full h-[74px] bg-[#121212] pl-6 rounded-xl border border-white text-[#808080] text-base`}
                        placeholder="0.0 (optional)"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-center">
                    <button
                      type="button"
                      className="bg-white rounded-xl w-full h-[50px] text-xl text-bold"
                      onClick={handleCreatePool}
                    >
                      Create Pool
                    </button>
                    
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
     
    );
  }
 