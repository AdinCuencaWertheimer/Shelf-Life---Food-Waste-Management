import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Foods } from "./pages/Foods";
import { AddFood } from "./pages/AddFood";
import { Settings } from "./pages/Settings";
import { Recipes } from "./pages/Recipes";
import { Support } from "./pages/Support";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { DataExport } from "./pages/DataExport";
import { PrivacySecurity } from "./pages/PrivacySecurity";
import { BottomNavigation } from "./components/BottomNavigation";
import { SwipeNavigation } from "./components/SwipeNavigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative">
          <SwipeNavigation>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/add" element={<AddFood />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/data-export" element={<DataExport />} />
              <Route path="/privacy-security" element={<PrivacySecurity />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SwipeNavigation>
          <BottomNavigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
