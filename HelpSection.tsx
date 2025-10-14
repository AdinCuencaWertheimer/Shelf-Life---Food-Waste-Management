import { HelpCircle, Heart, MessageCircle, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HelpSectionProps {
  onCloseModal: () => void;
}

export const HelpSection = ({ onCloseModal }: HelpSectionProps) => {
  const navigate = useNavigate();

  const handleSupportNavigation = () => {
    onCloseModal();
    navigate('/support');
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <HelpCircle size={20} className="text-emerald-600" />
          </div>
          Help & Support
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Get assistance and learn more about Shelf Life
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start p-4 h-auto hover-scale transition-all duration-200 hover:bg-emerald-50"
          onClick={handleSupportNavigation}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <MessageCircle size={18} className="text-emerald-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">Get Help & Support</div>
              <div className="text-xs text-muted-foreground mt-1">
                Contact us for assistance
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
        </Button>
        
        <div className="pt-4 border-t border-emerald-100">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
              <span>for better food management</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-600">
              <Sparkles size={12} />
              <span className="font-medium">Helping reduce food waste, one meal at a time</span>
              <Sparkles size={12} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};