import { useState } from "react";
import { ArrowLeft, Download, FileText, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useSupabaseFoodData } from "@/hooks/useSupabaseFoodData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const DataExport = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { foodItems } = useSupabaseFoodData();
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFoodDataExport = async (format: 'csv' | 'json') => {
    if (!user) {
      toast.error("Please sign in to export your data");
      return;
    }

    setIsExporting(true);
    try {
      const exportData = foodItems.map(item => ({
        name: item.name,
        expiration_date: item.expiration_date,
        status: item.status,
        created_at: item.created_at
      }));

      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `shelf-life-food-data-${timestamp}.${format}`;

      if (format === 'csv') {
        exportToCSV(exportData, filename);
      } else {
        exportToJSON(exportData, filename);
      }

      toast.success(`Food data exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 rounded-b-3xl relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-2 top-2 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold flex items-center justify-center">
          <Download size={24} className="mr-2" />
          Data Export
        </h1>
      </div>

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Export Your Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Download your Shelf Life data in various formats. This includes all your food items, expiration dates, and tracking history.
            </p>
          </CardContent>
        </Card>

        {!user ? (
          <Card className="shadow-card border-destructive/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Package size={48} className="mx-auto text-muted-foreground" />
                <h3 className="text-lg font-semibold">Sign In Required</h3>
                <p className="text-muted-foreground">
                  Please sign in to export your food inventory data.
                </p>
                <Button onClick={() => navigate('/settings')}>
                  Go to Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package size={20} className="mr-2" />
                  Food Inventory Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Export all your tracked food items including names, expiration dates, status, and creation dates.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p><strong>Total items:</strong> {foodItems.length}</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleFoodDataExport('csv')}
                    disabled={isExporting || foodItems.length === 0}
                    variant="outline"
                  >
                    <FileText size={16} className="mr-2" />
                    Export as CSV
                  </Button>
                  <Button 
                    onClick={() => handleFoodDataExport('json')}
                    disabled={isExporting || foodItems.length === 0}
                    variant="outline"
                  >
                    <FileText size={16} className="mr-2" />
                    Export as JSON
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Data Format Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">CSV Format</h3>
                  <p className="text-muted-foreground text-sm">
                    Comma-separated values format that can be opened in Excel, Google Sheets, or other spreadsheet applications.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">JSON Format</h3>
                  <p className="text-muted-foreground text-sm">
                    JavaScript Object Notation format that preserves data structure and can be used for importing into other applications.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Privacy Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your exported data contains only the information you've entered into Shelf Life. No personal identification information beyond what you've provided is included in the export.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};