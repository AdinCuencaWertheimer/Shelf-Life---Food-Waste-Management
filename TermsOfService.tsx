import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const TermsOfService = () => {
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
          <FileText size={24} className="mr-2" />
          Terms of Service
        </h1>
      </div>

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              Welcome to Shelf Life! These Terms of Service ("Terms") govern your use of our food tracking application and services.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By accessing and using Shelf Life, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Use of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Permitted Use</h3>
              <p className="text-muted-foreground">
                You may use Shelf Life to track your food inventory, receive expiration reminders, and get recipe suggestions for personal, non-commercial purposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prohibited Use</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Using the service for any illegal purpose</li>
                <li>• Attempting to interfere with the service's security</li>
                <li>• Sharing your account credentials with others</li>
                <li>• Using automated tools to access the service</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Food Safety Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Shelf Life is a tool to help you track food expiration dates. However, we cannot guarantee the accuracy of expiration date suggestions or the safety of food items. Always use your judgment and follow food safety guidelines when determining if food is safe to consume.
            </p>
            <p className="text-muted-foreground font-semibold">
              When in doubt, throw it out! We are not responsible for any illness or injury resulting from the consumption of food tracked in our app.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>SMS Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By providing your phone number, you consent to receive SMS notifications about expiring food items. Standard message and data rates may apply. You can opt out at any time through the app settings.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Shelf Life and its creators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our service.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will notify users of any significant changes through the app or email.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at support@shelflife.app
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};