import { createContext, useContext, useState, ReactNode } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import Solflare from "@solflare-wallet/sdk";

// Define types for the wallet context
interface WalletContextType {
  walletAddress: string | null;
  balance: number | null;
  connectWallet: () => Promise<void>;
}

// Create the context with an empty default value
const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  balance: null,
  connectWallet: async () => {},
});

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

// Custom hook for using wallet context
export const useWallet = () => useContext(WalletContext);
