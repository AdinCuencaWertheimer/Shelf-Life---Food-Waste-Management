import { useState } from "react";
import { Plus, Calendar, Settings, HelpCircle, Camera, Zap, Edit3 } from "lucide-react";
import { useSupabaseFoodData } from "@/hooks/useSupabaseFoodData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { WelcomeModal } from "@/components/WelcomeModal";
import { ReceiptUpload } from "@/components/ReceiptUpload";
import { ReceiptTipsModal } from "@/components/ReceiptTipsModal";
import { ExtractedItemsList } from "@/components/ExtractedItemsList";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import darkGreenFoodPattern from "@/assets/dark-green-food-pattern.png";

interface ExtractedItem {
  name: string;
  expiration_date: string;
  category: string;
  estimatedShelfLife: number;
}

export const AddFood = () => {
  const { user } = useAuth();
  const { addFoodItem, getFrequentItems } = useSupabaseFoodData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [extractedItems, setExtractedItems] = useState<ExtractedItem[]>([]);
  const [activeTab, setActiveTab] = useState("manual");
  const [showReceiptTips, setShowReceiptTips] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !expirationDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const expDate = new Date(expirationDate);
    if (expDate < new Date()) {
      toast({
        title: "Invalid Date",
        description: "Expiration date cannot be in the past.",
        variant: "destructive",
      });
      return;
    }
    
    const { error } = await addFoodItem({
      name: name.trim(),
      expiration_date: expirationDate,
    });

    if (!error) {
      setName('');
      setExpirationDate('');
      
      navigate("/");
    }
  };

  const frequentItems = getFrequentItems();
  
  const defaultSuggestions = [
    { name: "Milk", days: 7, count: 0 },
    { name: "Bread", days: 5, count: 0 },
    { name: "Apples", days: 14, count: 0 },
    { name: "Yogurt", days: 10, count: 0 },
    { name: "Frozen Vegetables", days: 90, count: 0 },
    { name: "Cheese", days: 21, count: 0 },
  ];








  
  const quickAddItems = frequentItems.length > 0 ? frequentItems : defaultSuggestions;

  const handleQuickAdd = async (item: typeof quickAddItems[0]) => {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + item.days);
    
    await addFoodItem({
      name: item.name,
      expiration_date: expDate.toISOString().split('T')[0],
    });
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
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
            onClick={() => setShowWelcomeModal(true)}
            className="hover:bg-muted"
          >
            <HelpCircle size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="hover:bg-muted"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={(value) => {
          if (value === "receipt") {
            setShowReceiptTips(true);
          } else {
            setActiveTab(value);
          }
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Edit3 size={16} />
              <span className="hidden sm:inline">Manual Entry</span>
              <span className="sm:hidden">Manual</span>
            </TabsTrigger>
            <TabsTrigger value="receipt" className="flex items-center gap-2">
              <Camera size={16} />
              <span className="hidden sm:inline">Scan Receipt</span>
              <span className="sm:hidden">Scan</span>
            </TabsTrigger>
          </TabsList>

          {/* Receipt Scanner Tab */}
          <TabsContent value="receipt" className="animate-fade-in">
            {extractedItems.length === 0 ? (
              <ReceiptUpload onItemsExtracted={setExtractedItems} />
            ) : (
              <ExtractedItemsList 
                items={extractedItems} 
                onClear={() => setExtractedItems([])} 
              />
            )}
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual" className="animate-fade-in">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Edit3 size={20} className="text-primary" />
                  Add Items Manually
                </CardTitle>
                <p className="text-muted-foreground">
                  Enter food details and expiration dates
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-medium">
                      Food Name *
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Milk, Apples, Bread, Chicken"
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="expiration" className="text-base font-medium">
                      Expiration Date *
                    </Label>
                    <Input
                      id="expiration"
                      type="date"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-gradient-primary hover:opacity-90 transition-all duration-200"
                  >
                    <Plus size={20} className="mr-2" />
                    Add to Kitchen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <ReceiptTipsModal
        open={showReceiptTips}
        onOpenChange={setShowReceiptTips}
        onContinue={() => setActiveTab("receipt")}
      />
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
      
      <WelcomeModal
        open={showWelcomeModal}
        onOpenChange={setShowWelcomeModal}
        onSignUpClick={() => setShowAuthModal(true)}
      />
    </div>
  );
};