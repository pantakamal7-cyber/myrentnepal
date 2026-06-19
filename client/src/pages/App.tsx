import { Switch, Route } from "wouter";
import Home from "./Home";
import Listings from "./Listings";
import Terms from "./Terms"; 
import Privacy from "./Privacy"; 
import AntiFraud from "./AntiFraud";
import ReportListing from "./ReportListing";
import Verification from "./Verification";
import FAQ from "./FAQ";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Switch>
      {/* Core Application Routes */}
      <Route path="/" component={Home} />
      <Route path="/listings"><Listings /></Route>
      <Route path="/terms" component={Terms} /> 
      <Route path="/privacy" component={Privacy} /> 

      {/* Trust & Safety Lowercase Path System Mappings */}
      <Route path="/anti-fraud" component={AntiFraud} />
      <Route path="/anti-fraud-policy" component={AntiFraud} />

      {/* Report Listing Path Mappings */}
      <Route path="/report" component={ReportListing} />
      <Route path="/report-listing" component={ReportListing} />
      <Route path="/report-a-listing" component={ReportListing} />

      {/* Verification Process Path Mappings */}
      <Route path="/verification" component={Verification} />
      <Route path="/verification-process" component={Verification} />

      {/* FAQ Path Mappings */}
      <Route path="/faq" component={FAQ} />
      <Route path="/faqs" component={FAQ} />

      {/* Fallback 404 Route Catch */}
      <Route component={NotFound} />
    </Switch>
  );
}

