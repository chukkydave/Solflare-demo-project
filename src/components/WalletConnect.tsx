import { useWallet } from "../context/wallsContext";

const WalletConnect = () => {
  const { walletAddress, balance, connectWallet } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Solflare Wallet Integration</h1>
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Connect Solflare Wallet
        </button>
      ) : (
        <div className="text-center">
          <p>
            <strong>Wallet Address:</strong> {walletAddress}
          </p>
          <p>
            <strong>Balance:</strong> {balance?.toFixed(4)} SOL
          </p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
