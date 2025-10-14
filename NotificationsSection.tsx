import { useState } from "react";
import { Bell, Smartphone, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const NotificationsSection = () => {
  const [morningNotifications, setMorningNotifications] = useState(true);
  const [eveningNotifications, setEveningNotifications] = useState(true);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Bell size={20} className="text-blue-600" />
          </div>
          Smart Notifications
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Stay on top of your food inventory with intelligent reminders
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Morning Notifications */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-orange-600" />
                <Label htmlFor="morning-reminders" className="font-medium">Morning Summary</Label>
                <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                  10:00 AM
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Daily overview of expired and expiring items in your kitchen
              </p>
            </div>
            <Switch 
              id="morning-reminders" 
              checked={morningNotifications}
              onCheckedChange={setMorningNotifications}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Evening Notifications */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-purple-600" />
                <Label htmlFor="evening-suggestions" className="font-medium">Recipe Suggestions</Label>
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                  4:00 PM
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Dinner inspiration using items that expire soon
              </p>
            </div>
            <Switch 
              id="evening-suggestions" 
              checked={eveningNotifications}
              onCheckedChange={setEveningNotifications}
            />
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};