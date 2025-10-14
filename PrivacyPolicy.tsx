import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
          Privacy Policy
        </h1>
      </div>

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              At Shelf Life, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our food tracking application.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Information</h3>
              <p className="text-muted-foreground">
                When you create an account, we collect your email address and phone number (for SMS notifications).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Food Data</h3>
              <p className="text-muted-foreground">
                We store the food items you add to your inventory, including names, expiration dates, and locations (fridge, pantry, freezer).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage Information</h3>
              <p className="text-muted-foreground">
                We collect information about how you use our app to improve our services and provide better recommendations.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-muted-foreground">
              <li>• To provide and maintain our food tracking service</li>
              <li>• To send you SMS notifications about expiring food items</li>
              <li>• To provide personalized recipe suggestions</li>
              <li>• To improve our app's functionality and user experience</li>
              <li>• To communicate with you about updates and features</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit using HTTPS/TLS and stored securely using Supabase's database encryption. While we use industry-standard security practices, please note that no method of electronic storage is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Access your personal data</li>
              <li>• Correct inaccurate data</li>
              <li>• Delete your account and data</li>
              <li>• Export your data</li>
              <li>• Opt out of SMS notifications</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@shelflife.app
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};