import { User, UserCheck, LogIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/UserProfile";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AccountSectionProps {
  user: SupabaseUser | null;
  onShowAuthModal: () => void;
}

export const AccountSection = ({ user, onShowAuthModal }: AccountSectionProps) => {
  if (!user) {
    return (
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <div className="p-3 bg-primary/10 rounded-full">
              <LogIn size={24} className="text-primary" />
            </div>
            Get Started
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-3">
            <p className="text-muted-foreground text-lg font-medium">
              Join Shelf Life today
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={onShowAuthModal}
              className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover-scale"
              size="lg"
            >
              <LogIn size={20} className="mr-2" />
              Sign In / Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-xl">
          <UserCheck className="text-green-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <p className="text-muted-foreground text-sm">Manage your account information</p>
        </div>
      </div>
      <UserProfile />
    </div>
  );
};