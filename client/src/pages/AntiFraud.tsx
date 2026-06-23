import { Ban, Clock, Flag, ShieldCheck, Phone, Mail, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AntiFraud() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Zero Tolerance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Anti-Fraud Policy
          </h1>
          <p className="text-[#F5EFE0]/70 text-lg max-w-2xl">
            MYRENT is built to eliminate Kathmandu's three biggest rental scam problems: fake landlords, ghost listings, and hidden broker fees.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl py-12 flex-1 space-y-12">

        {/* Three Rules */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Platform Rules</span>
          </div>
          <h2 className="text-3xl font-black text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Three Strict Anti-Fraud Rules
          </h2>
          <div className="space-y-5">
            {[
              {
                rule: "Rule A",
                color: "#C4622D",
                icon: Ban,
                title: "The Broker Filter",
                what: "What it means",
                whatText: "Every landlord must explicitly confirm: \"I am the owner or direct family member of this property. I will NOT charge any broker fees to the tenant.\" This pledge is permanently recorded against the listing.",
                how: "How it's enforced",
                howText: "If 3 unique, verified users report that a landlord charged broker fees after making this pledge, the landlord's account is automatically suspended and flagged for immediate admin review. Zero warnings.",
                badge: "Auto-Suspend on 3 Reports",
              },
              {
                rule: "Rule B",
                color: "#7A8C6E",
                icon: Clock,
                title: "14-Day Listing Expiry",
                what: "What it means",
                whatText: "Every listing on MYRENT is automatically hidden from public search after 14 days. This prevents the \"ghost listing\" problem — rented rooms that stay online for months misleading tenants.",
                how: "How it's enforced",
                howText: "7 days before expiry, the landlord receives an SMS/notification with a single 'Still Available' button. One tap re-activates the listing for another 14 days. If they don't respond, the listing auto-hides. No manual removal needed.",
                badge: "Auto-Hidden After 14 Days",
              },
              {
                rule: "Rule C",
                color: "#8B2020",
                icon: Flag,
                title: "Community Report Button",
                what: "What it means",
                whatText: "Every property page features a prominently visible 'Report Listing' button. Tenants can report: property already rented, fake photos, price mismatch, broker posing as owner, or location inaccurate.",
                how: "How it's enforced",
                howText: "Reports are reviewed by our verification team within 24 hours. Listings with 3+ reports are temporarily hidden pending review. Listings with 5+ confirmed reports are permanently removed. Landlords with repeat violations are permanently banned.",
                badge: "Admin Review on 3+ Reports",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.rule} className="bg-white border border-border overflow-hidden" style={{ borderRadius: "2px" }}>
                  <div className="h-1" style={{ background: item.color }} />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, borderRadius: "2px" }}>
                        <Icon size={20} style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5" style={{ background: `${item.color}15`, color: item.color, borderRadius: "2px" }}>
                        {item.rule}
                      </span>
                      <h3 className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{item.what}</p>
                        <p className="text-sm text-[#1A1208]/80 leading-relaxed">{item.whatText}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{item.how}</p>
                        <p className="text-sm text-[#1A1208]/80 leading-relaxed">{item.howText}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1" style={{ background: `${item.color}10`, color: item.color, borderRadius: "2px" }}>
                        <CheckCircle2 size={12} /> {item.badge}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Safety Tips for Tenants */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">For Tenants</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            How to Stay Safe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: CheckCircle2, color: "#7A8C6E", text: "Always physically visit the property before paying any deposit." },
              { icon: CheckCircle2, color: "#7A8C6E", text: "Meet the landlord in person and ask to see their citizenship or Lalpurja document." },
              { icon: CheckCircle2, color: "#7A8C6E", text: "Only pay rent after signing a rental agreement (भाडा सम्झौता पत्र)." },
              { icon: CheckCircle2, color: "#7A8C6E", text: "Verified badge (✓) means our team has confirmed the landlord's identity and property ownership." },
              { icon: XCircle, color: "#8B2020", text: "Never send advance rent or security deposit via eSewa/Khalti to an unverified contact." },
              { icon: XCircle, color: "#8B2020", text: "Never pay any 'broker commission' — MYRENT is a 100% broker-free platform." },
              { icon: XCircle, color: "#8B2020", text: "Never share your personal ID documents with landlords before visiting the property." },
              { icon: XCircle, color: "#8B2020", text: "Be suspicious of prices that are significantly lower than similar listings in the same area." },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 bg-white border border-border" style={{ borderRadius: "2px" }}>
                  <Icon size={18} style={{ color: tip.color }} className="shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1A1208]/80 leading-relaxed">{tip.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Warning signs */}
        <section className="bg-[#8B2020]/5 border border-[#8B2020]/20 p-6" style={{ borderRadius: "2px" }}>
          <div className="flex items-start gap-3">
            <AlertTriangle size={22} className="text-[#8B2020] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#8B2020] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Common Scam Warning Signs
              </h3>
              <ul className="space-y-1.5 text-sm text-[#1A1208]/80">
                <li>• Landlord refuses to show the property in person or insists on online-only communication</li>
                <li>• Demands advance rent payment before you've signed any agreement</li>
                <li>• Price is unusually low for the area — check similar listings to compare</li>
                <li>• Contact number switches mid-conversation or goes silent after receiving payment</li>
                <li>• Asks for personal documents like citizenship or bank details before a viewing</li>
                <li>• Listing has zero photos or photos clearly taken from the internet</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[#1A1208] text-[#F5EFE0] p-8" style={{ borderRadius: "2px" }}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={20} className="text-[#C4622D]" />
            <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Report a Scam Directly</h3>
          </div>
          <p className="text-sm text-[#F5EFE0]/70 mb-5 leading-relaxed">
            If you have been scammed or attempted to be scammed by someone on MYRENT, please contact us immediately. We will investigate, remove the listing, and share the information with Nepal Police Cyber Bureau if required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="tel:+977014MYRENT" className="flex items-center gap-3 p-3 border border-white/20 hover:border-[#C4622D]/50 transition-colors" style={{ borderRadius: "2px" }}>
              <Phone size={16} className="text-[#C4622D]" />
              <div>
                <p className="text-xs text-[#F5EFE0]/50 mb-0.5">Emergency Fraud Hotline</p>
                <p className="text-sm font-semibold">+977-01-MYRENT</p>
              </div>
            </a>
            <a href="mailto:fraud@myrent.com.np" className="flex items-center gap-3 p-3 border border-white/20 hover:border-[#C4622D]/50 transition-colors" style={{ borderRadius: "2px" }}>
              <Mail size={16} className="text-[#C4622D]" />
              <div>
                <p className="text-xs text-[#F5EFE0]/50 mb-0.5">Email</p>
                <p className="text-sm font-semibold">fraud@myrent.com.np</p>
              </div>
            </a>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
