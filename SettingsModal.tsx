import { useState } from "react";
import { User, Settings } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AccountSection } from "@/components/settings/AccountSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";

import { PrivacySection } from "@/components/settings/PrivacySection";
import { HelpSection } from "@/components/settings/HelpSection";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[75vh] p-0 overflow-hidden bg-gradient-to-br from-background to-muted/20">
          <DialogHeader className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 pb-8">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
            
            <div className="relative z-10">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3 mb-1">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <User size={24} strokeWidth={2} />
                </div>
                Settings
              </DialogTitle>
              <p className="text-primary-foreground/90 font-medium">
                Personalize your Shelf Life experience
              </p>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[calc(75vh-140px)]">
            <div className="p-6 space-y-6">
              {/* Account Section */}
              <div className="animate-fade-in">
                <AccountSection 
                  user={user} 
                  onShowAuthModal={() => setShowAuthModal(true)} 
                />
              </div>

              {/* Notifications Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <NotificationsSection />
              </div>


              {/* Privacy & Security Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <PrivacySection onCloseModal={() => onOpenChange(false)} />
              </div>

              {/* Help & Support Section */}
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <HelpSection onCloseModal={() => onOpenChange(false)} />
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />
    </>
  );
};