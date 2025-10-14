import { Home, Plus, ChefHat } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: ChefHat, label: "Recipes", path: "/recipes" },
  { icon: Home, label: "Home", path: "/" },
  { icon: Plus, label: "Add", path: "/add" },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-dark border-t border-border shadow-elegant z-50">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200",
                "hover:bg-white/10 active:scale-95",
                isActive
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white"
              )}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};