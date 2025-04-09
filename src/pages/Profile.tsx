
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { User, Wallet, Mail, Camera, PenLine, Check, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  bio: z.string().optional(),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  phone: z.string().optional(),
});

const Profile = () => {
  const { user, updateUser, connectWallet, disconnectWallet } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      website: user?.website || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    setIsSaving(true);
    
    setTimeout(() => {
      updateUser({
        ...values,
        profileImage
      });
      
      setIsSaving(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        updateUser({ profileImage: result });
        toast.success('Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-primary/10">
                  <AvatarImage src={profileImage || ''} />
                  <AvatarFallback className="text-lg bg-primary/10">
                    {user?.name.split(' ').map(n => n[0]).join('') || "U"}
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="profile-image-upload" 
                  className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera size={14} />
                  <input 
                    id="profile-image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              <div className="space-y-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center md:justify-start gap-1.5">
                    <Mail size={14} />
                    <span>{user?.email || "user@example.com"}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1.5">
                    <User size={14} />
                    <span className="capitalize">{user?.role || "user"}</span>
                  </div>
                  {user?.walletAddress && (
                    <div className="flex items-center justify-center md:justify-start gap-1.5">
                      <Wallet size={14} />
                      <span className="font-mono">{user.walletAddress}</span>
                    </div>
                  )}
                </div>
                
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => setIsEditing(true)}
                  >
                    <PenLine size={14} className="mr-1" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              
              {isEditing ? (
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="A brief description about yourself" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://example.com" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="+1 (555) 000-0000" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              ) : (
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                    <dd className="mt-1">{user?.name || "Not provided"}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                    <dd className="mt-1">{user?.email || "Not provided"}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                    <dd className="mt-1 capitalize">{user?.role || "Not provided"}</dd>
                  </div>
                  
                  {user?.walletAddress && (
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Wallet Address</dt>
                      <dd className="mt-1 font-mono text-sm">{user?.walletAddress}</dd>
                    </div>
                  )}
                  
                  {user?.bio && (
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Bio</dt>
                      <dd className="mt-1">{user?.bio}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  Notification Preferences
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
