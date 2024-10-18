import { WalletProvider } from "./context/WalletContext";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <WalletProvider>
      <WalletConnect />
    </WalletProvider>
  );
}

export default App;
