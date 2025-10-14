import { useState } from "react";
import { Bell, Moon, User, Shield, HelpCircle, Heart, Send, FileText, Download, Settings as SettingsIcon } from "lucide-react";
import { UserProfile } from "@/components/UserProfile";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [isTestingSMS, setIsTestingSMS] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const testSMSReminder = async () => {
    setIsTestingSMS(true);
    try {
      const { data, error } = await supabase.functions.invoke('daily-sms-reminder', {
        body: { test: true }
      });
      
      if (error) {
        toast.error(`Text test failed: ${error.message}`);
      } else {
        toast.success("Text test sent! Check your phone.");
        console.log('SMS test result:', data);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsTestingSMS(false);
    }
  };
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center">
        <img 
          src="/shelf-life-logo.png" 
          alt="Shelf Life Logo" 
          className="h-16 w-auto"
        />
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <HelpCircle size={20} />
          </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
            >
              <SettingsIcon size={20} />
            </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Authentication Section */}
        {!user ? (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User size={20} className="mr-2" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Sign in to sync your food inventory across devices and enable text reminders.
                </p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full"
                >
                  Sign In / Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="text-primary" size={20} />
              Profile
            </h2>
            <UserProfile />
          </div>
        )}

        {/* Preferences Section */}

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell size={20} className="mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-reminders">Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Daily 10 AM and 4 PM text summaries of expired/expiring items
                </p>
                <div className="mt-2 p-2 bg-muted/50 rounded-md border-l-2 border-primary/30">
                  <p className="text-xs text-muted-foreground italic">
                    Example: "Hey! Consider using your milk and bread because they expire in 1 day. Also throw out your chicken because it has expired."
                  </p>
                </div>
              </div>
              <Switch 
                id="daily-reminders" 
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label>Test Text Reminder</Label>
              <p className="text-sm text-muted-foreground">
                Send a test text to your phone number to verify the system is working
              </p>
              <Button 
                onClick={testSMSReminder}
                disabled={isTestingSMS}
                variant="outline"
                className="w-full"
              >
                <Send size={16} className="mr-2" />
                {isTestingSMS ? "Sending..." : "Send Test Text"}
              </Button>
            </div>
            
            <Separator />
          </CardContent>
        </Card>


        {/* Privacy & Security */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield size={20} className="mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/privacy-security')}
            >
              <Shield size={16} className="mr-2" />
              Privacy & Security Overview
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/privacy-policy')}
            >
              <FileText size={16} className="mr-2" />
              Privacy Policy
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/terms-of-service')}
            >
              <FileText size={16} className="mr-2" />
              Terms of Service
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/data-export')}
            >
              <Download size={16} className="mr-2" />
              Data Export
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle size={20} className="mr-2" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => toast.info("Help Center feature coming soon!")}
            >
              <HelpCircle size={16} className="mr-2" />
              Help Center
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => toast.info("Send Feedback feature coming soon!")}
            >
              <Heart size={16} className="mr-2" />
              Send Feedback
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => toast.info("Rate App feature coming soon!")}
            >
              <Heart size={16} className="mr-2" />
              Rate App
            </Button>
          </CardContent>
        </Card>


        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Shelf Life v1.0.0</p>
          <p>Made with ❤️ for reducing food waste</p>
        </div>
      </div>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </div>
  );
};