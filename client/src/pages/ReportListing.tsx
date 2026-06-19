import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReportListing() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Report a Listing</h1>
        <p className="text-sm text-muted-foreground mb-6">See a fake listing, duplicate post, or broker scam? Report it below to keep our platform clean.</p>
        {submitted ? (
          <div className="p-4 bg-green-50 text-green-800 text-sm font-medium border border-green-200" style={{ borderRadius: "2px" }}>
            Thank you. Our verification team will review this property listing within 24 hours.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1">Property Title / URL</label>
              <input required type="text" className="w-full p-2.5 text-sm bg-white border border-border outline-none focus:border-[#C4622D]" style={{ borderRadius: "2px" }} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1">Reason for Report</label>
              <select required className="w-full p-2.5 text-sm bg-white border border-border outline-none focus:border-[#C4622D]" style={{ borderRadius: "2px" }}>
                <option value="">Select a reason...</option>
                <option value="fake">Fake Photos / Inaccurate Location</option>
                <option value="broker">Broker posing as a direct landlord</option>
                <option value="price">Incorrect / Misleading price</option>
                <option value="unavailable">Property is already rented out</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#C4622D] text-white py-2.5 text-sm font-bold tracking-wide hover:bg-[#A34E22] transition-colors" style={{ borderRadius: "2px" }}>Submit Report</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}
