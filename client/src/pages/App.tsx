import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import Home from "./Home";
import Listings from "./Listings";
import Terms from "./Terms"; 
import Privacy from "./Privacy"; 
import NotFound from "./NotFound";

// 🚀 Senior Architect Fix: Forces the compiler to build standalone code bundles for your new pages
const AntiFraud = lazy(() => import("./AntiFraud"));
const ReportListing = lazy(() => import("./ReportListing"));
const Verification = lazy(() => import("./Verification"));
const FAQ = lazy(() => import("./FAQ"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F5EFE0] text-sm text-muted-foreground">Loading page...</div>}>
      <Switch>
        {/* Core Application Routes */}
        <Route path="/" component={Home} />
        <Route path="/listings"><Listings /></Route>
        <Route path="/terms" component={Terms} /> 
        <Route path="/privacy" component={Privacy} /> 

        {/* Trust & Safety Path Registrations using Clean Lazy Loading */}
        <Route path="/anti-fraud" component={AntiFraud} />
        <Route path="/anti-fraud-policy" component={AntiFraud} />
        <Route path="/report" component={ReportListing} />
        <Route path="/report-listing" component={ReportListing} />
        <Route path="/verification" component={Verification} />
        <Route path="/verification-process" component={Verification} />
        <Route path="/faq" component={FAQ} />
        <Route path="/faqs" component={FAQ} />

        {/* Fallback 404 Route Catch */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}


