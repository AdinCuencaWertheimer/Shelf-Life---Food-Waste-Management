import { ArrowLeft, Shield, Lock, Eye, Database, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivacySecurity = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 rounded-b-3xl relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-2 top-2 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold flex items-center justify-center">
          <Shield size={24} className="mr-2" />
          Privacy & Security
        </h1>
      </div>

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Your Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We take your privacy and security seriously. Here's how we protect your data and what you can do to stay secure.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock size={20} className="mr-2" />
              Data Encryption
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold">Data Encryption</h3>
                <p className="text-muted-foreground text-sm">
                  Your food data is encrypted in transit (HTTPS/TLS) and at rest using Supabase's database-level encryption protocols.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold">Secure Authentication</h3>
                <p className="text-muted-foreground text-sm">
                  We use Supabase Auth for secure user authentication with industry-standard password hashing and JWT session management.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database size={20} className="mr-2" />
              Data Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold">Secure Cloud Infrastructure</h3>
                <p className="text-muted-foreground text-sm">
                  Your data is stored on Supabase's secure, SOC 2 and GDPR-compliant cloud infrastructure with regular security audits.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold">Automatic Backups</h3>
                <p className="text-muted-foreground text-sm">
                  Supabase performs automatic backups to ensure data durability while maintaining security standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye size={20} className="mr-2" />
              What We Track
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Food Data Only</h3>
              <p className="text-muted-foreground text-sm mb-3">
                We only store the food information you explicitly add to your inventory:
              </p>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Food item names</li>
                <li>• Expiration dates</li>
                <li>• Storage locations (fridge, pantry, freezer)</li>
                <li>• Creation timestamps</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Personal Tracking</h3>
              <p className="text-muted-foreground text-sm">
                We do NOT track your location, browsing habits, or personal behavior outside of the app. Only the food data you explicitly enter is stored.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key size={20} className="mr-2" />
              Your Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/privacy-policy')}
                className="justify-start"
              >
                <Shield size={16} className="mr-2" />
                Read Privacy Policy
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/data-export')}
                className="justify-start"
                disabled={!user}
              >
                <Database size={16} className="mr-2" />
                Export Your Data
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/terms-of-service')}
                className="justify-start"
              >
                <Shield size={16} className="mr-2" />
                Terms of Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {!user && (
          <Card className="shadow-card border-muted">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Shield size={32} className="mx-auto text-muted-foreground" />
                <h3 className="font-semibold">Sign In for Full Privacy Control</h3>
                <p className="text-muted-foreground text-sm">
                  Create an account to access data export, deletion requests, and more privacy controls.
                </p>
                <Button onClick={() => navigate('/settings')}>
                  Go to Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};