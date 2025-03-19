
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletInfo, connectWallet } from "@/lib/walletUtils";
import { Loader2 } from "lucide-react";

interface WalletButtonProps {
  wallet: WalletInfo;
  onConnect: (address: string) => void;
}

const WalletButton = ({ wallet, onConnect }: WalletButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet(wallet.type);
      if (address) {
        onConnect(address);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Icon mapping (would be better with actual SVG imports)
  const getIcon = () => {
    switch (wallet.type) {
      case "metamask":
        return "🦊";
      case "walletconnect":
        return "🔗";
      case "coinbase":
        return "💰";
      case "okx":
        return "🌐";
      default:
        return "👛";
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      variant="outline"
      className="w-full justify-between h-auto py-3 px-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{getIcon()}</span>
        <div className="text-left">
          <div className="font-medium">{wallet.name}</div>
          <div className="text-xs text-muted-foreground">{wallet.description}</div>
        </div>
      </div>
      {isConnecting && <Loader2 className="animate-spin ml-2" size={16} />}
    </Button>
  );
};

export default WalletButton;
