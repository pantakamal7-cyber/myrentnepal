/*
 * MYRENT App – Route configuration
 * "Nepali Terracotta & Ink" Design System
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import ListProperty from "./pages/ListProperty";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import AntiFraud from "./pages/AntiFraud";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import ReportListing from "./pages/ReportListing";
import Terms from "./pages/Terms";
import Verification from "./pages/Verification";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/listings" component={Listings} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/list-property" component={ListProperty} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/login" component={Login} />
      <Route path="/anti-fraud" component={AntiFraud} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/report" component={ReportListing} />
      <Route path="/terms" component={Terms} />
      <Route path="/verification" component={Verification} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
