import { useLocation } from "wouter";
import { ShieldCheck, FileText, MapPin, CheckCircle2, Clock, Phone, Mail, Upload, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Verification() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">100% Direct Landlords</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Verification Process
          </h1>
          <p className="text-[#F5EFE0]/70 text-lg max-w-2xl">
            Every listing on MYRENT goes through a strict verification process to ensure you are always talking directly to the real property owner.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl py-12 flex-1 space-y-12">

        {/* Step-by-step process */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">For Landlords</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            How to Get Your Listing Verified
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                icon: Phone,
                title: "Phone Number Verification",
                desc: "Create your landlord account using your Nepal mobile number. You will receive a 6-digit OTP to confirm your identity. This phone number will be visible to tenants for direct contact.",
                time: "Instant",
              },
              {
                step: "02",
                icon: FileText,
                title: "Submit Ownership Documents",
                desc: "Upload one of three accepted document types: (1) Citizenship Copy (नागरिकता प्रमाणपत्र) of the property owner, (2) Lalpurja / Land Ownership Certificate (लालपुर्जा), or (3) Ward Office Utilities Bill proving residence at the listed address.",
                time: "Upload in minutes",
              },
              {
                step: "03",
                icon: MapPin,
                title: "Location Cross-Check",
                desc: "Our team cross-references the property address with Google Maps coordinates, ward records, and the submitted documents. For listings in high-demand areas, a field agent may physically visit to confirm layout details, water availability, and parking.",
                time: "24–48 hours",
              },
              {
                step: "04",
                icon: ShieldCheck,
                title: "Verified Badge Activated",
                desc: "Once approved, your listing receives the official MYRENT Verified badge (✓). Verified listings appear higher in search results and receive significantly more enquiries from tenants who trust them.",
                time: "After approval",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white border border-border overflow-hidden" style={{ borderRadius: "2px" }}>
                  <div className="p-5 flex items-start gap-5">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#C4622D]/10" style={{ borderRadius: "2px" }}>
                        <Icon size={18} className="text-[#C4622D]" />
                      </div>
                      <span className="text-3xl font-black text-[#C4622D]/10 mt-1 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.step}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground border border-border px-2 py-0.5" style={{ borderRadius: "2px" }}>
                          <Clock size={11} /> {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#1A1208]/80 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Accepted Documents */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Accepted Documents</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            What We Accept
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Citizenship Copy",
                nepali: "नागरिकता प्रमाणपत्र",
                desc: "A scanned or photographed copy of the property owner's Nepal citizenship certificate. Must show name and photo clearly.",
                accepted: ["Scanned front and back", "Clear smartphone photo", "PDF or JPG format"],
              },
              {
                title: "Lalpurja / Land Certificate",
                nepali: "लालपुर्जा",
                desc: "The official land ownership certificate issued by the Government of Nepal's Land Revenue Office (मालपोत कार्यालय).",
                accepted: ["Current or recent Lalpurja", "Must match listed address", "PDF or JPG format"],
              },
              {
                title: "Ward Utilities Bill",
                nepali: "वडा कार्यालयको बिजुली/पानी बिल",
                desc: "A recent electricity or water bill from Nepal Electricity Authority (NEA) or Kathmandu Upatyaka Khanepani Limited (KUKL) showing the property address.",
                accepted: ["Must be within last 3 months", "Name and address must be visible", "PDF or JPG format"],
              },
            ].map((doc) => (
              <div key={doc.title} className="bg-white border border-border p-5" style={{ borderRadius: "2px" }}>
                <div className="w-10 h-10 bg-[#C4622D]/10 flex items-center justify-center mb-3" style={{ borderRadius: "2px" }}>
                  <FileText size={18} className="text-[#C4622D]" />
                </div>
                <h3 className="font-bold text-[#1A1208] mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{doc.title}</h3>
                <p className="text-xs text-[#C4622D] font-medium mb-2">{doc.nepali}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{doc.desc}</p>
                <ul className="space-y-1">
                  {doc.accepted.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#1A1208]/70">
                      <CheckCircle2 size={12} className="text-[#7A8C6E] shrink-0" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Verification status explanation */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Listing Badges</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            What the Badges Mean
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, color: "#7A8C6E", bg: "#7A8C6E15", label: "✓ Verified", desc: "Documents reviewed and property confirmed by MYRENT team. Safe to visit and contact." },
              { icon: Clock, color: "#C4622D", bg: "#C4622D15", label: "⏳ Pending Review", desc: "Landlord has submitted documents. Our team is reviewing. Usually takes 24–48 hours." },
              { icon: AlertTriangle, color: "#8B2020", bg: "#8B202015", label: "⚠ Unverified", desc: "No documents submitted. Proceed with extra caution. We recommend only verified listings." },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="p-4 border border-border bg-white" style={{ borderRadius: "2px" }}>
                  <div className="w-9 h-9 flex items-center justify-center mb-2" style={{ background: badge.bg, borderRadius: "2px" }}>
                    <Icon size={17} style={{ color: badge.color }} />
                  </div>
                  <p className="font-bold text-sm text-[#1A1208] mb-1" style={{ color: badge.color }}>{badge.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#C4622D] text-white p-8 text-center" style={{ borderRadius: "2px" }}>
          <Upload size={28} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Get Verified?
          </h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
            Verified landlords get 3× more enquiries. List your property today and submit your documents to get the Verified badge.
          </p>
          <button
            onClick={() => navigate("/list-property")}
            className="bg-white text-[#C4622D] font-bold px-8 py-3 text-sm hover:bg-[#F5EFE0] transition-colors"
            style={{ borderRadius: "2px" }}
          >
            List & Verify My Property
          </button>
        </section>

        {/* Contact */}
        <section className="text-center text-sm text-muted-foreground">
          <p className="mb-3">Have questions about the verification process?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+977014MYRENT" className="flex items-center gap-2 text-[#C4622D] font-semibold hover:underline">
              <Phone size={14} /> +977-01-MYRENT
            </a>
            <a href="mailto:verify@myrent.com.np" className="flex items-center gap-2 text-[#C4622D] font-semibold hover:underline">
              <Mail size={14} /> verify@myrent.com.np
            </a>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
