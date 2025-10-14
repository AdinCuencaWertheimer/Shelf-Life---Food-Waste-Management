import { Mail, ArrowLeft, MessageCircle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Support = () => {
  const navigate = useNavigate();

  const copyEmail = () => {
    navigator.clipboard.writeText("shelflifeinfo@gmail.com");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Support & Help</h1>
            <p className="text-muted-foreground text-sm">Get assistance with Shelf Life</p>
          </div>
        </div>

        {/* Main Support Card */}
        <Card className="shadow-elegant mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
              <Mail className="text-primary" size={32} />
            </div>
            <CardTitle className="text-xl">We're Here to Help!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Need assistance or have feedback? We'd love to hear from you!
              </p>
              <p className="text-lg font-medium">
                Email us at:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-mono text-lg font-semibold text-primary">
                  shelflifeinfo@gmail.com
                </p>
              </div>
            </div>

            <Button 
              onClick={copyEmail}
              className="w-full"
              size="lg"
            >
              <Mail size={20} className="mr-2" />
              Copy Email Address
            </Button>
          </CardContent>
        </Card>

        {/* Quick Help Cards */}
        <div className="space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Questions about using Shelf Life, managing your food inventory, or any technical issues
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Send Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your ideas, suggestions, or report bugs to help us improve Shelf Life
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>We typically respond within 24 hours</p>
        </div>
      </div>
    </div>
  );
};