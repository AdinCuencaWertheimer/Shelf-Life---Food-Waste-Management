import { useState } from "react";
import { Apple, Clock, AlertTriangle, Refrigerator, Home as HomeIcon, Snowflake, Settings, HelpCircle, Plus, ChefHat } from "lucide-react";
import { useSupabaseFoodData } from "@/hooks/useSupabaseFoodData";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/StatsCard";
import { FoodCard } from "@/components/FoodCard";
import { StatsCardSkeleton } from "@/components/StatsCardSkeleton";
import { FoodCardSkeleton } from "@/components/FoodCardSkeleton";
import { AuthModal } from "@/components/AuthModal";
import { WelcomeModal } from "@/components/WelcomeModal";
import { SettingsModal } from "@/components/SettingsModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroFood from "@/assets/hero-food.jpg";
import greenFoodPattern from "@/assets/green-food-pattern.png";
import darkGreenFoodPattern from "@/assets/dark-green-food-pattern.png";

export const Dashboard = () => {
  const { user } = useAuth();
  const { foodItems, getStats, removeFoodItem, updateFoodItem, loading } = useSupabaseFoodData();
  const navigate = useNavigate();
  const stats = getStats();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen pb-24 bg-background">
        {/* Top Bar Skeleton */}
        <div className="p-4 flex justify-between items-center">
          <div className="animate-pulse h-16 bg-muted rounded w-48"></div>
          <div className="flex space-x-2">
            <div className="animate-pulse h-10 w-10 bg-muted rounded"></div>
            <div className="animate-pulse h-10 w-10 bg-muted rounded"></div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Cards Skeleton */}
          <div>
            <div className="animate-pulse h-6 bg-muted rounded w-32 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <StatsCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Recent Items Skeleton */}
          <div>
            <div className="animate-pulse h-6 bg-muted rounded w-40 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <FoodCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }


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
            onClick={() => setShowSettingsModal(true)}
            className="hover:bg-muted"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            title="Expiring Soon"
            value={stats.expiring}
            icon={<Clock size={20} />}
            variant="expiring"
            className="shadow-elegant"
          />
          <StatsCard
            title="Expired"
            value={stats.expired}
            icon={<AlertTriangle size={20} />}
            variant="expired"
            className="shadow-elegant"
          />
        </div>

        {/* Your Kitchen Section - Always Show */}
        <Card className="shadow-card hover:shadow-elegant transition-all duration-300 bg-secondary/50 border-secondary/70">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ChefHat size={20} className="text-primary" />
              Your Kitchen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {foodItems.length > 0 ? (
              <div className="space-y-3">
                {foodItems
                  .sort((a, b) => {
                    // Sort by expiration date: earliest expiring first
                    const dateA = new Date(a.expiration_date);
                    const dateB = new Date(b.expiration_date);
                    return dateA.getTime() - dateB.getTime();
                  })
                  .map((item) => (
                     <FoodCard
                       key={item.id}
                       item={item}
                       onRemove={removeFoodItem}
                       onUpdate={updateFoodItem}
                     />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary/20">
                    <Apple size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Your kitchen is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Add some foods to start tracking expiration dates and get recipe suggestions
                </p>
                <Button 
                  onClick={() => navigate('/add')} 
                  className="bg-gradient-primary hover:shadow-elegant transition-all duration-200"
                >
                  <Plus size={16} className="mr-2" />
                  Add Foods
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
      
      <WelcomeModal
        open={showWelcomeModal}
        onOpenChange={setShowWelcomeModal}
        onSignUpClick={() => setShowAuthModal(true)}
      />
      
      <SettingsModal
        open={showSettingsModal}
        onOpenChange={setShowSettingsModal}
      />
    </div>
  );
};