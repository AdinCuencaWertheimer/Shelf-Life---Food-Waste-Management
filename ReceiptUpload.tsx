import { useState, useRef } from "react";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExtractedItem {
  name: string;
  expiration_date: string;
  category: string;
  estimatedShelfLife: number;
}

interface ReceiptUploadProps {
  onItemsExtracted: (items: ExtractedItem[]) => void;
}

export const ReceiptUpload = ({ onItemsExtracted }: ReceiptUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const base64Image = await convertToBase64(file);
      setUploadedImage(base64Image);
      
      console.log('Starting receipt processing...');
      console.log('Image size:', base64Image.length, 'characters');
      
      toast({
        title: "Processing Receipt",
        description: "Scanning for food items...",
      });

      console.log('Calling supabase function...');
      const { data, error } = await supabase.functions.invoke('scan-receipt', {
        body: { image: base64Image }
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data.success && data.items?.length > 0) {
        onItemsExtracted(data.items);
        toast({
          title: "Success!",
          description: `Found ${data.totalItems} food item${data.totalItems !== 1 ? 's' : ''} on your receipt.`,
        });
      } else {
        toast({
          title: "No Food Items Found",
          description: "Couldn't identify any perishable food items on this receipt. Try taking a clearer photo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error processing receipt:', error);
      toast({
        title: "Processing Failed",
        description: "Failed to process the receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera size={20} className="mr-2" />
          Receipt Scanner
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload a photo of your grocery receipt to automatically add food items
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!uploadedImage ? (
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center space-y-4">
            <div className="flex justify-center">
              <Upload size={48} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Take a clear photo of your grocery receipt
              </p>
              <Button 
                onClick={handleUploadClick}
                disabled={isProcessing}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Camera size={16} className="mr-2" />
                    Upload Receipt
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="Uploaded receipt" 
                className="w-full max-h-64 object-contain rounded-lg border"
              />
              <Button
                size="icon"
                variant="destructive"
                onClick={clearImage}
                className="absolute top-2 right-2"
              >
                <X size={16} />
              </Button>
            </div>
            
            {!isProcessing && (
              <Button 
                onClick={handleUploadClick}
                variant="outline"
                className="w-full"
              >
                <Upload size={16} className="mr-2" />
                Upload Different Receipt
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};