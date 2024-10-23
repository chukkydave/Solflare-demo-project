import { createContext, useContext } from 'react';

interface WalletContextType {
  walletAddress: string | null;
  balance: number | null;
  connectWallet: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  balance: null,
  connectWallet: async () => {},
});

export const useWallet = () => useContext(WalletContext);