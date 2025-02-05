// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BN, web3 } from "@coral-xyz/anchor";
import millify from "millify";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { FormatNumberOptions } from "@/types"; 
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (walletAddress: string, len = 4) => {
  return walletAddress.slice(0, len) + "..." + walletAddress.slice(-len);
};

export const formatNumber = (
  value: string | number | null | undefined,
  {
    prefix = "",
    suffix = "",
    thousandSeparator = true,
    decimalScale = 2,
    isPercentage = false,
    truncateTinyValue = false,
    useMillify = false,
    placeholder = "N/A",
  }: FormatNumberOptions = {}
): string => {
  if (value === undefined || value === null) return placeholder;

  let numberValue = Number(value);

  if (isPercentage && suffix === "") {
    suffix = "%";
  }

  if (numberValue === 0) {
    return `${prefix}0${suffix}`;
  }

  if (truncateTinyValue && numberValue < 0.0001) {
    return `${prefix}${isPercentage ? "<0.01" : "<0.0001"}${suffix}`;
  }

  if (Math.abs(numberValue) < 1e-6) {
    numberValue = 0;
  }

  if (isPercentage) {
    numberValue *= 100;
  }

  if (useMillify) {
    return prefix + millify(numberValue, { precision: decimalScale }) + suffix;
  }

  let formattedValue = numberValue.toFixed(decimalScale);
  formattedValue = parseFloat(formattedValue).toString();

  if (thousandSeparator) {
    const parts = formattedValue.split(".");
    const separator = typeof thousandSeparator === "string" ? thousandSeparator : ",";
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    formattedValue = parts.join(".");
  }

  return `${prefix}${formattedValue}${suffix}`;
};

 

export const convertToLamports = (amount: number) => {
  return new BN(String(amount * 10 ** 9));
}

 

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }

  return "An unknown error occurred";
};

export const getTokenBalance = async (walletAddress:string | undefined, tokenMintAddress:string | null, connection:Connection) => {  

  // Convert wallet and mint addresses to PublicKey  
  const walletPublicKey = new web3.PublicKey(walletAddress!);  
  const mintPublicKey = new web3.PublicKey(tokenMintAddress!);  

  // Get the associated token address  
  const associatedTokenAddress = await getAssociatedTokenAddress(  
      mintPublicKey,  
      walletPublicKey  
  );  

  // Fetch the account info for the associated token address  
  try {  
      const accountInfo = await connection.getParsedAccountInfo(associatedTokenAddress);  
      if (accountInfo.value === null) {  
          console.log('Token account does not exist. Ensure the wallet has tokens for this mint.');  
          return 0;  
      }  
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
      // Get the token balance from the parsed account info  
      const tokenAmount = accountInfo.value.data?.parsed.info.tokenAmount.uiAmount;  

      return tokenAmount;  
  } catch (error) {  
      console.error('Error fetching token balance:', error);  
      return 0;  
  }  
}  