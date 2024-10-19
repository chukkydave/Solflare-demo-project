import { WalletProvider } from "./provider/WalletProvider";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <WalletProvider>
      <WalletConnect />
    </WalletProvider>
  );
}

export default App;
