import { Shield, FileText, Lock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PrivacySectionProps {
  onCloseModal: () => void;
}

export const PrivacySection = ({ onCloseModal }: PrivacySectionProps) => {
  const navigate = useNavigate();

  const privacyItems = [
    {
      icon: Shield,
      title: "Privacy & Security Overview",
      description: "View how we protect your data",
      path: "/privacy-security",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "Terms of Service",
      description: "Our terms and conditions",
      path: "/terms-of-service",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Lock,
      title: "Privacy Policy",
      description: "How we handle your information",
      path: "/privacy-policy",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const handleNavigation = (path: string) => {
    onCloseModal();
    navigate(path);
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-xl">
            <Shield size={20} className="text-gray-600" />
          </div>
          Privacy & Legal
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Review our policies and your data rights
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        {privacyItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start p-4 h-auto hover-scale transition-all duration-200 hover:bg-muted/50"
            onClick={() => handleNavigation(item.path)}
          >
            <div className="flex items-center gap-3 w-full">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon size={18} className={item.color} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};