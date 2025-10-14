import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: 'default' | 'fresh' | 'expiring' | 'expired';
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  variant = 'default',
  className 
}: StatsCardProps) => {
  const variantStyles = {
    default: 'bg-card text-card-foreground border border-border',
    fresh: 'bg-gradient-fresh text-fresh-foreground border-2 border-fresh/30',
    expiring: 'bg-gradient-expiring text-expiring-foreground border-2 border-expiring/40 ring-1 ring-expiring/20',
    expired: 'bg-gradient-expired text-expired-foreground border-2 border-expired/40 ring-1 ring-expired/30'
  };

  return (
    <Card className={cn(
      "animate-scale-in shadow-card hover:shadow-elegant transition-all duration-200 hover:scale-[1.02]",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>{title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};