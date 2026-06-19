import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Terms from "./pages/Terms"; 
import Privacy from "./pages/Privacy"; 
import AntiFraud from "./pages/AntiFraud";
import ReportListing from "./pages/ReportListing";
import Verification from "./pages/Verification";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/listings">
        <Listings />
      </Route>

      <Route path="/terms" component={Terms} /> 
      <Route path="/privacy" component={Privacy} /> 

      {/* 🛡️ Trust & Safety Route Mappings */}
      <Route path="/anti-fraud" component={AntiFraud} />
      <Route path="/report" component={ReportListing} />
      <Route path="/verification" component={Verification} />
      <Route path="/faq" component={FAQ} />

      {/* Fallback 404 Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

