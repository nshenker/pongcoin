
import React from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { truncateAddress } from "@/utils/functions";

export default function WalletConnectButton() {
  const { publicKey } = useWallet();
  return (
    <div>
      <WalletMultiButton  style={{
          //   boxShadow: "0px 0px 10px 4px rgba(251, 113, 133, var(--tw-bg-opacity, 0.5)) !important",
          //   // borderRadius: "8px",
          // background: "rgba(251, 113, 133, var(--tw-bg-opacity, 1)) !important",
        }}>
        <div className="flex items-center space-x-0.5 lg:space-x-2">
          {!publicKey ? (
            <>
              {/* {!connecting && !connected && !disconnecting && <Icon name="wallet" size={6} />} */}
              <p className="hidden lg:block">Connect</p>
            </>
          ) : (
            <p className="hidden lg:block">{truncateAddress(publicKey.toBase58())}</p>
          )}
        </div>
      </WalletMultiButton>
    </div>
  );
}
