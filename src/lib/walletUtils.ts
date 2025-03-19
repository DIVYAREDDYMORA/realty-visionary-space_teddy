
import { toast } from "sonner";

export type WalletType = "metamask" | "walletconnect" | "coinbase" | "okx";

export interface WalletInfo {
  type: WalletType;
  name: string;
  icon: string;
  description: string;
}

export const walletOptions: WalletInfo[] = [
  {
    type: "metamask",
    name: "MetaMask",
    icon: "metamask",
    description: "Connect to your MetaMask Wallet"
  },
  {
    type: "walletconnect",
    name: "WalletConnect",
    icon: "walletconnect",
    description: "Scan with WalletConnect to connect"
  },
  {
    type: "coinbase",
    name: "Coinbase Wallet",
    icon: "coinbase",
    description: "Connect to your Coinbase Wallet"
  },
  {
    type: "okx",
    name: "OKX Wallet",
    icon: "okx",
    description: "Connect to your OKX Wallet"
  }
];

export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    // This is a mock implementation. In a real application, you would use actual wallet libraries
    // like ethers.js, web3-react, wagmi, etc.
    console.log(`Connecting to ${walletType} wallet...`);
    
    // Simulating connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return a mock wallet address
    const mockAddress = "0x" + Array(40).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    toast.success(`Connected to ${walletType} wallet`);
    return mockAddress;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    toast.error("Failed to connect wallet. Please try again.");
    return null;
  }
};
