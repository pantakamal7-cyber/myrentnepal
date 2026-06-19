import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Terms from "./pages/Terms"; 
import Privacy from "./pages/Privacy"; 
import AntiFraud from "../components/pages/AntiFraud";
import ReportListing from "../components/pages/ReportListing";
import Verification from "../components/pages/Verification";
import FAQ from "../components/pages/FAQ";

import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Switch>
      {/* Core Pages */}
      <Route path="/" component={Home} />
      <Route path="/listings"><Listings /></Route>
      <Route path="/terms" component={Terms} /> 
      <Route path="/privacy" component={Privacy} /> 

      {/* Anti-Fraud Route Variations */}
      <Route path="/anti-fraud" component={AntiFraud} />
      <Route path="/anti-fraud-policy" component={AntiFraud} />

      {/* Report Listing Route Variations */}
      <Route path="/report" component={ReportListing} />
      <Route path="/report-listing" component={ReportListing} />
      <Route path="/report-a-listing" component={ReportListing} />

      {/* Verification Process Route Variations */}
      <Route path="/verification" component={Verification} />
      <Route path="/verification-process" component={Verification} />

      {/* FAQ Route Variations */}
      <Route path="/faq" component={FAQ} />
      <Route path="/faqs" component={FAQ} />

      {/* Fallback 404 Route */}
      <Route component={NotFound} />
    </Switch>
  );
}
