/*
 * MYRENT How It Works Page – "Nepali Terracotta & Ink" Design
 * Explains the platform, anti-fraud rules, and database schema overview
 */
import { useLocation } from "wouter";
import {
  ShieldCheck, Ban, Clock, Flag, Phone, Search, Upload,
  CheckCircle2, ArrowRight, Database, Users, Home, FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
              Transparent by Design
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            How MYRENT Works
          </h1>
          <p className="text-[#F5EFE0]/70 text-lg max-w-2xl">
            MYRENT is built from the ground up to solve Kathmandu's rental pain points: untrustworthy brokers, fake listings, and zero transparency.
          </p>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container max-w-4xl space-y-16">

          {/* For Tenants */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">For Tenants</span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Finding Your Home
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", icon: Search, title: "Search & Filter", desc: "Use our location dropdown (30+ Kathmandu wards), price slider (Rs. 5,000–1,00,000+), and property type filter to find exactly what you need." },
                { step: "02", icon: ShieldCheck, title: "Check Verification", desc: "Every listing shows a Verified badge if the landlord has submitted ownership documents (Citizenship, Lalpurja, or Ward Bill) approved by our admin team." },
                { step: "03", icon: Phone, title: "Call Directly", desc: "Click 'Call Landlord Directly' or 'WhatsApp/Viber Chat' to connect instantly. No registration required. No broker. No commission." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="bg-white border border-border p-5 relative" style={{ borderRadius: "2px" }}>
                    <div className="text-5xl font-black text-[#C4622D]/10 absolute top-3 right-4 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.step}
                    </div>
                    <div className="w-10 h-10 bg-[#C4622D]/10 flex items-center justify-center mb-3" style={{ borderRadius: "2px" }}>
                      <Icon size={20} className="text-[#C4622D]" />
                    </div>
                    <h3 className="font-bold text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* For Landlords */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">For Landlords</span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Listing Your Property
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { step: "01", icon: Users, title: "Create Account", desc: "Register with your phone number (OTP verified). No email required." },
                { step: "02", icon: Home, title: "Add Listing", desc: "Fill in property details: type, location (ward dropdown), price, utilities, amenities, and photos." },
                { step: "03", icon: Upload, title: "Submit Documents", desc: "Upload your Citizenship copy, Lalpurja, or Ward Utilities Bill for ownership verification." },
                { step: "04", icon: CheckCircle2, title: "Go Live", desc: "After admin approval (24-48 hrs), your listing goes live with a Verified badge." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="bg-[#F5EFE0] border border-border p-4 relative" style={{ borderRadius: "2px" }}>
                    <div className="text-4xl font-black text-[#C4622D]/15 absolute top-2 right-3 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.step}
                    </div>
                    <div className="w-9 h-9 bg-[#C4622D]/10 flex items-center justify-center mb-2" style={{ borderRadius: "2px" }}>
                      <Icon size={17} className="text-[#C4622D]" />
                    </div>
                    <h3 className="font-bold text-[#1A1208] text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Anti-Fraud Rules */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Anti-Fraud System</span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Strict Rules
            </h2>
            <div className="space-y-5">
              {[
                {
                  rule: "Rule A",
                  color: "#C4622D",
                  icon: Ban,
                  title: "The Broker Filter",
                  detail: "Every landlord must explicitly check a box confirming: \"I am the owner/direct family member of this property. I will not charge any broker fees to the tenant.\" This pledge is recorded in our database. If 3 unique verified users report that the landlord charged broker fees, the account is automatically suspended and flagged for admin review.",
                  badge: "Account Auto-Suspend on 3 Reports",
                },
                {
                  rule: "Rule B",
                  color: "#7A8C6E",
                  icon: Clock,
                  title: "14-Day Listing Expiry",
                  detail: "To prevent the 'ghost listing' problem where rented rooms stay online forever, every listing automatically expires and is hidden from public search after 14 days. The landlord receives an SMS/notification with a 1-click 'Still Available' re-verification button. If they don't click it, the listing is hidden. This keeps the platform fresh and accurate.",
                  badge: "Auto-Hidden After 14 Days",
                },
                {
                  rule: "Rule C",
                  color: "#8B2020",
                  icon: Flag,
                  title: "The Community Report Button",
                  detail: "Every property page features a highly visible 'Report Fake/Rented Listing' button. Users can report: property already rented, fake details, broker fees charged, photos don't match, or owner not genuine. High report ratios trigger automated admin review flag alerts. Listings with 5+ reports are temporarily hidden pending review.",
                  badge: "Admin Alert on High Reports",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.rule} className="bg-white border border-border overflow-hidden" style={{ borderRadius: "2px" }}>
                    <div className="h-1" style={{ background: item.color }} />
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, borderRadius: "2px" }}>
                          <Icon size={22} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5" style={{ background: `${item.color}15`, color: item.color, borderRadius: "2px" }}>
                              {item.rule}
                            </span>
                            <h3 className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.detail}</p>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1" style={{ background: `${item.color}10`, color: item.color, borderRadius: "2px" }}>
                            <CheckCircle2 size={12} /> {item.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Database Schema Overview */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Technical Architecture</span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Database Schema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  table: "Users",
                  icon: Users,
                  fields: [
                    "User_ID (PK)",
                    "Full_Name",
                    "Phone_Number (OTP login)",
                    "Email",
                    "User_Role (Tenant / Landlord)",
                    "Account_Status (Pending / Verified / Flagged)",
                  ],
                },
                {
                  table: "Listings",
                  icon: Home,
                  fields: [
                    "Property_ID (PK)",
                    "Landlord_ID (FK → Users)",
                    "Title",
                    "Property_Type",
                    "Price_NPR, Deposit_NPR",
                    "Precise_Location (Ward Dropdown)",
                    "Amenities_List, Images_URLs",
                    "Availability_Status",
                    "Date_Listed, Expiry_Date",
                    "View_Count, Report_Count",
                  ],
                },
                {
                  table: "Verifications",
                  icon: FileText,
                  fields: [
                    "Verification_ID (PK)",
                    "Property_ID (FK → Listings)",
                    "Document_Type",
                    "  · Citizenship Copy",
                    "  · Lalpurja/Land Certificate",
                    "  · Ward Utilities Bill",
                    "Admin_Approval_Status",
                    "  (Pending / Approved / Rejected)",
                  ],
                },
              ].map((schema) => {
                const Icon = schema.icon;
                return (
                  <div key={schema.table} className="bg-[#1A1208] text-[#F5EFE0] p-5" style={{ borderRadius: "2px" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Database size={15} className="text-[#C4622D]" />
                      <h3 className="font-bold text-[#F5EFE0]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {schema.table}
                      </h3>
                    </div>
                    <ul className="space-y-1.5">
                      {schema.fields.map((field, i) => (
                        <li key={i} className={`text-xs flex items-start gap-2 ${field.startsWith("  ·") ? "pl-4 text-[#F5EFE0]/40" : "text-[#F5EFE0]/70"}`}>
                          {!field.startsWith("  ·") && <span className="text-[#C4622D] mt-0.5 shrink-0">›</span>}
                          <span>{field.replace("  · ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#C4622D] text-white p-8 text-center" style={{ borderRadius: "2px" }}>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Find Your Home?
            </h2>
            <p className="text-white/80 mb-6 text-sm">
              Browse hundreds of verified, broker-free listings across Kathmandu right now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/listings")}
                className="bg-white text-[#C4622D] font-bold px-8 py-3 text-sm hover:bg-[#F5EFE0] transition-colors flex items-center gap-2"
                style={{ borderRadius: "2px" }}
              >
                <Search size={16} /> Browse Listings
              </button>
              <button
                onClick={() => navigate("/list-property")}
                className="border-2 border-white/60 text-white font-semibold px-8 py-3 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                style={{ borderRadius: "2px" }}
              >
                List Your Property <ArrowRight size={16} />
              </button>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
