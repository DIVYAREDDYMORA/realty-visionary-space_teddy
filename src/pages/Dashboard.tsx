
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Wallet,
  Home,
  Store,
  History,
  Settings,
  ListPlus,
  CreditCard,
  Bell,
  UserRound,
  LogOut,
  BarChart3,
  ListFilter,
  Heart,
  Grid2X2,
  ChevronRight,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletButton from '@/components/WalletButton';
import { walletOptions, connectWallet } from '@/lib/walletUtils';

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  
  // Mock data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null,
    role: 'buyer',
  };
  
  const mockNavItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Store, label: 'Marketplace', href: '/properties' },
    { icon: ListPlus, label: 'List Property', href: '/list-property' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: History, label: 'History', href: '/history' },
    { icon: CreditCard, label: 'Payments', href: '/payments' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];
  
  const mockStats = [
    { label: 'Properties Viewed', value: 24 },
    { label: 'Saved Properties', value: 5 },
    { label: 'Recent Searches', value: 12 },
  ];
  
  const handleConnectWallet = async (walletType: string) => {
    setIsLoadingAssets(true);
    try {
      const address = await connectWallet(walletType as any);
      setWalletAddress(address);
      
      // Simulate loading NFT assets
      setTimeout(() => {
        setIsLoadingAssets(false);
        toast.success("Your Web3 wallet is now connected!");
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoadingAssets(false);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };
  
  const handleDisconnect = () => {
    setWalletAddress(null);
    toast.success("Wallet disconnected successfully");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center space-x-3 pb-4 mb-4 border-b">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">{mockUser.name}</h2>
                    <p className="text-xs text-muted-foreground">{mockUser.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {mockNavItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className={`flex items-center py-2 px-3 text-sm rounded-md transition-colors ${
                        item.active
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <item.icon size={18} className="mr-2" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full justify-start text-muted-foreground" size="sm">
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {mockUser.name.split(' ')[0]}!
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/properties">
                    <Store size={16} className="mr-2" />
                    Browse Properties
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/list-property">
                    <ListPlus size={16} className="mr-2" />
                    List Property
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Wallet Connection Card */}
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-5 border-b">
                <h2 className="text-xl font-semibold">Web3 Wallet</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect your wallet to access Web3 features
                </p>
              </div>
              
              <div className="p-5">
                {walletAddress ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Connected Wallet</div>
                        <code className="font-mono text-xs sm:text-sm break-all bg-muted rounded-md p-2 block">
                          {walletAddress}
                        </code>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleDisconnect}>
                        Disconnect
                      </Button>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="text-sm font-medium mb-3">Your NFT Assets</div>
                      
                      {isLoadingAssets ? (
                        <div className="flex items-center justify-center p-8">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Loading assets...</span>
                        </div>
                      ) : (
                        <div className="bg-muted/50 rounded-lg p-8 text-center">
                          <p className="text-muted-foreground">No NFT assets found</p>
                          <Button variant="link" size="sm" asChild>
                            <Link to="/properties">Browse NFT properties</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="max-w-md mx-auto space-y-3">
                      <p className="text-sm text-center mb-4">
                        Connect your wallet to access features like buying properties, listing 
                        your own properties, and tracking your transactions
                      </p>
                      
                      {walletOptions.map((wallet) => (
                        <WalletButton
                          key={wallet.type}
                          wallet={wallet}
                          onConnect={(address) => handleConnectWallet(wallet.type)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockStats.map((stat, i) => (
                <div key={i} className="bg-card rounded-lg border p-5">
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
            
            {/* Recent Activity */}
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Button variant="link" size="sm" className="text-sm" asChild>
                  <Link to="/history">View all <ChevronRight size={14} /></Link>
                </Button>
              </div>
              
              <div className="p-5">
                <div className="bg-muted/50 rounded-lg py-8 text-center">
                  <p className="text-muted-foreground">No recent activity</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your recent actions and property views will appear here
                  </p>
                </div>
              </div>
            </div>
            
            {/* Recommended Properties */}
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recommended Properties</h2>
                <Button variant="link" size="sm" className="text-sm" asChild>
                  <Link to="/properties">View all <ChevronRight size={14} /></Link>
                </Button>
              </div>
              
              <div className="p-5">
                <div className="bg-muted/50 rounded-lg py-12 text-center">
                  <p className="text-muted-foreground">
                    No recommended properties yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Browse more properties to get personalized recommendations
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/properties">Browse Properties</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
