import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, Check, AlertTriangle } from "lucide-react";

interface ReceiptTipsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export const ReceiptTipsModal = ({ open, onOpenChange, onContinue }: ReceiptTipsModalProps) => {
  const handleContinue = () => {
    onContinue();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Camera size={20} />
            </div>
            Receipt Scanning Tips
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            For best results, follow these photo guidelines:
          </p>
          
          <div className="space-y-3">
            {/* Bad Example */}
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="p-1 bg-destructive/20 rounded">
                <X size={16} className="text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-destructive mb-1">Avoid</p>
                <p className="text-xs text-muted-foreground">Blurry photos with poor lighting</p>
              </div>
            </div>
            
            {/* Best Example */}
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-fresh/15 border border-fresh/40">
              <div className="p-1 bg-fresh/40 rounded">
                <Check size={16} className="text-fresh" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-fresh mb-1">Best</p>
                <p className="text-xs text-muted-foreground">Receipt fully visible with clear text</p>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/10 p-3 rounded-lg mt-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle size={16} className="text-accent mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Make sure all item names and prices are clearly visible for accurate scanning.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleContinue}
            className="w-full mt-6 bg-gradient-primary"
          >
            <Camera size={16} className="mr-2" />
            Got it, let's scan!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};