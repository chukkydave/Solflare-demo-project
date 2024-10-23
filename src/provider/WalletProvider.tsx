// src/providers/WalletProvider.tsx
import { useState, ReactNode } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import Solflare from "@solflare-wallet/sdk";
import { WalletContext } from "../context/wallsContext";

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  const connectWallet = async () => {
    try {
      const solflare = new Solflare();
      await solflare.connect();

      if (solflare.isConnected && solflare.publicKey) {
        const publicKey = solflare.publicKey.toString();
        setWalletAddress(publicKey);

        // Get wallet balance
        const walletBalance = await connection.getBalance(new PublicKey(publicKey));
        setBalance(walletBalance / 1e9); // Convert lamports to SOL
      }
    } catch (error) {
      console.error("Failed to connect Solflare wallet:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, balance, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
