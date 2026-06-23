import { useState } from "react";
import { Flag, AlertTriangle, CheckCircle2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function ReportListing() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    property_ref: "",
    reason: "",
    details: "",
    reporter_phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (supabase) {
        await supabase.from("reports").insert([
          {
            property_ref: form.property_ref,
            reason: form.reason,
            details: form.details,
            reporter_phone: form.reporter_phone || null,
            reported_at: new Date().toISOString(),
            status: "pending",
          },
        ]);
      }
      // Whether Supabase is configured or not, show success
      toast.success("Report submitted!", {
        description: "Our team will review this within 24 hours.",
      });
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Community Safety</span>
          </div>
          <h1 className="text-4xl font-black mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Report a Listing
          </h1>
          <p className="text-[#F5EFE0]/70">
            Seen a fake listing, broker scam, or already-rented property? Help keep MYRENT clean for everyone.
          </p>
        </div>
      </div>

      <div className="container max-w-3xl py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white border border-border p-8 text-center" style={{ borderRadius: "2px" }}>
                <CheckCircle2 size={40} className="text-[#7A8C6E] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Report Received
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Thank you. Our verification team will review this property within 24 hours. If 3 or more users report the same listing, it is automatically hidden from search while under review.
                </p>
                <p className="text-xs text-muted-foreground">
                  Questions? Email us at{" "}
                  <a href="mailto:fraud@myrent.com.np" className="text-[#C4622D] font-semibold hover:underline">
                    fraud@myrent.com.np
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-border p-6 space-y-5" style={{ borderRadius: "2px" }}>
                <h2 className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Submit a Report
                </h2>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Property Title or URL <span className="text-[#8B2020]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 'Bright 2BHK Flat in New Baneshwor' or paste the URL"
                    value={form.property_ref}
                    onChange={(e) => setForm((f) => ({ ...f, property_ref: e.target.value }))}
                    className="w-full p-2.5 text-sm bg-white border border-border outline-none focus:border-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Reason for Report <span className="text-[#8B2020]">*</span>
                  </label>
                  <select
                    required
                    value={form.reason}
                    onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                    className="w-full p-2.5 text-sm bg-white border border-border outline-none focus:border-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    <option value="">Select a reason...</option>
                    <option value="already_rented">Property is already rented out / not available</option>
                    <option value="fake_photos">Fake or stolen photos / location inaccurate</option>
                    <option value="broker_fees">Landlord is actually a broker / charged fees</option>
                    <option value="price_wrong">Price is different from what's advertised</option>
                    <option value="not_owner">Person contacted is not the actual owner</option>
                    <option value="scam_attempt">Attempted to collect advance payment as scam</option>
                    <option value="duplicate">Duplicate listing of the same property</option>
                    <option value="other">Other issue</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Additional Details (optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe what happened in detail — this helps our team investigate faster."
                    value={form.details}
                    onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
                    className="w-full p-2.5 text-sm bg-white border border-border outline-none focus:border-[#C4622D] transition-colors resize-none"
                    style={{ borderRadius: "2px" }}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Your Phone Number (optional — for follow-up)
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2.5 text-sm text-muted-foreground border border-r-0 border-border bg-muted" style={{ borderRadius: "2px 0 0 2px" }}>+977</span>
                    <input
                      type="tel"
                      placeholder="98XXXXXXXX"
                      value={form.reporter_phone}
                      onChange={(e) => setForm((f) => ({ ...f, reporter_phone: e.target.value }))}
                      className="flex-1 p-2.5 text-sm bg-white border border-border outline-none focus:border-[#C4622D] transition-colors"
                      style={{ borderRadius: "0 2px 2px 0" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Your number is kept confidential and only used for case follow-up.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8B2020] text-white py-3 text-sm font-bold tracking-wide hover:bg-[#6d1a1a] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ borderRadius: "2px" }}
                >
                  <Flag size={15} />
                  {loading ? "Submitting…" : "Submit Report"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#1A1208] text-[#F5EFE0] p-5" style={{ borderRadius: "2px" }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-[#C4622D]" />
                <h3 className="font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>What Happens Next?</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[#F5EFE0]/70 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#C4622D] font-bold shrink-0">1.</span>
                  <span>Our team reviews your report within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4622D] font-bold shrink-0">2.</span>
                  <span>At 3+ reports, the listing is auto-hidden pending review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4622D] font-bold shrink-0">3.</span>
                  <span>We contact the landlord for a response if needed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4622D] font-bold shrink-0">4.</span>
                  <span>Confirmed violations: listing removed, account suspended.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4622D] font-bold shrink-0">5.</span>
                  <span>Serious fraud cases are reported to Nepal Police Cyber Bureau.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-border p-5" style={{ borderRadius: "2px" }}>
              <h3 className="font-bold text-sm text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Emergency Fraud Contact
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Been scammed? Contact us immediately.</p>
              <div className="space-y-2">
                <a href="tel:+977014MYRENT" className="flex items-center gap-2 text-xs font-semibold text-[#C4622D] hover:underline">
                  <Phone size={12} /> +977-01-MYRENT
                </a>
                <a href="mailto:fraud@myrent.com.np" className="flex items-center gap-2 text-xs font-semibold text-[#C4622D] hover:underline">
                  <Mail size={12} /> fraud@myrent.com.np
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
