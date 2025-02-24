import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletConnectProvider from "@/contexts/WalletConnectProvider";
import ContractContextProvider from "@/contexts/ContractContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$PONG",
  description: "Serve, Smash, and Score with Pong!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <WalletConnectProvider>
      <ContractContextProvider>
        {children}
        </ContractContextProvider>
        </WalletConnectProvider>
      </body>
    </html>
  );
}
