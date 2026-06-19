/*
 * MYRENT Footer – Terracotta & Ink design
 * Fully Optimized with Native Router Trackers
 */
import { Link } from "wouter";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1208] text-[#F5EFE0]/80">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#C4622D] flex items-center justify-center font-bold text-white text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                M
              </div>
              <span className="text-xl font-bold text-[#F5EFE0]" style={{ fontFamily: "'Playfair Display', serif" }}>
                MY<span className="text-[#C4622D]">RENT</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#F5EFE0]/60 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Kathmandu's most trusted direct rental platform. No brokers. No fake listings. Just honest connections.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#7A8C6E]">
              <ShieldCheck size={14} />
              <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Verified Listings Only</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#F5EFE0] mb-4 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Platform
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/listings", label: "Browse Listings" },
                { href: "/list-property", label: "List Your Property" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/login", label: "Landlord Login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5EFE0]/60 hover:text-[#C4622D] transition-colors cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-bold text-[#F5EFE0] mb-4 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Popular Areas
            </h4>
            <ul className="space-y-2">
              {["New Baneshwor", "Jhamsikhel", "Lazimpat", "Thamel", "Boudha", "Koteshwor"].map((area) => (
                <li key={area}>
                  <Link
                    href={`/listings?location=${encodeURIComponent(area)}`}
                    className="text-sm text-[#F5EFE0]/60 hover:text-[#C4622D] transition-colors cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="text-sm font-bold text-[#F5EFE0] mb-4 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Trust & Safety
            </h4>
            <ul className="space-y-2 mb-4">
              {[
                { href: "/anti-fraud", label: "Anti-Fraud Policy" },
                { href: "/report", label: "Report a Listing" },
                { href: "/verification", label: "Verification Process" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5EFE0]/60 hover:text-[#C4622D] transition-colors cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 text-xs text-[#F5EFE0]/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <div className="flex items-center gap-2">
                <MapPin size={11} />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={11} />
                <span>+977-01-MYRENT</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={11} />
                <span>hello@myrent.com.np</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#F5EFE0]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 MYRENT Nepal. All rights reserved. Registered in Kathmandu, Nepal.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#F5EFE0]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/privacy" className="hover:text-[#C4622D] transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C4622D] transition-colors cursor-pointer">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

