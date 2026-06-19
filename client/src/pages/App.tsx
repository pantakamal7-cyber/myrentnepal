import { Switch, Route } from "wouter";
import Home from "./Home";
import Listings from "./Listings";
import Terms from "./Terms"; 
import Privacy from "./Privacy"; 
import NotFound from "./NotFound";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 🛡️ Explicit Layout Wrappers to Force Vite to Keep Your Pages Intact during Tree Shaking
function AntiFraud() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Anti-Fraud Policy</h1>
        <div className="space-y-4 text-sm text-[#1A1208]/80 leading-relaxed">
          <p>At MYRENT, we maintain a zero-tolerance policy for fake listings and rental scams in Kathmandu.</p>
          <h2 className="text-lg font-bold text-[#1A1208] mt-4">1. Verified Landlords</h2>
          <p>All property listings must undergo ownership confirmation before being marked with our official verified badge.</p>
          <h2 className="text-lg font-bold text-[#1A1208] mt-4">2. Safe Transactions</h2>
          <p>Never send advance booking deposits via eSewa, Khalti, or bank transfer before physically inspecting the property and meeting the landlord face-to-face.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="font-bold text-[#1A1208] text-base mb-1.5">Is MYRENT free for tenants?</h3>
            <p className="text-sm text-[#1A1208]/80 leading-relaxed">Yes, browsing listings and contacting direct property owners is completely free for tenants. No hidden commissions or broker charges.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ReportListing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Report a Listing</h1>
        <p className="text-sm text-muted-foreground mb-6">See a fake listing, duplicate post, or broker scam? Report it below to keep our platform clean.</p>
      </div>
      <Footer />
    </div>
  );
}

function VerificationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Verification Process</h1>
        <div className="space-y-4 text-sm text-[#1A1208]/80 leading-relaxed">
          <p>Our verification process ensures 100% direct connections between tenants and real landlords across Kathmandu.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      {/* Core Application Routes */}
      <Route path="/" component={Home} />
      <Route path="/listings"><Listings /></Route>
      <Route path="/terms" component={Terms} /> 
      <Route path="/privacy" component={Privacy} /> 

      {/* Trust & Safety Path Registrations */}
      <Route path="/anti-fraud" component={AntiFraud} />
      <Route path="/Anti-Fraud-Policy" component={AntiFraud} />
      <Route path="/report" component={ReportListing} />
      <Route path="/report-listing" component={ReportListing} />
      <Route path="/verification" component={Verification} />
      <Route path="/verification-process" component={Verification} />
      <Route path="/faq" component={FAQ} />
      <Route path="/faqs" component={FAQ} />

      {/* Fallback 404 Route Catch */}
      <Route component={NotFound} />
    </Switch>
  );
}


