/*
 * MYRENT Navbar – Terracotta & Ink design
 * Sticky top navigation with brand identity and key CTAs
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Search, PlusCircle, User, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/listings", label: "Browse Listings", icon: Search },
    { href: "/list-property", label: "List Property", icon: PlusCircle },
    { href: "/how-it-works", label: "How It Works", icon: ShieldCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1A1208] text-[#F5EFE0] shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#C4622D] flex items-center justify-center font-bold text-white text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              M
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              MY<span className="text-[#C4622D]">RENT</span>
            </span>
            <span className="hidden sm:inline text-xs text-[#F5EFE0]/50 ml-1 font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Kathmandu
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 hover:text-[#C4622D] ${
                  location === link.href ? "text-[#C4622D]" : "text-[#F5EFE0]/80"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#F5EFE0]/80 hover:text-[#F5EFE0] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Sign In
            </Link>
            <Link
              href="/list-property"
              className="bg-[#C4622D] text-white text-sm font-semibold px-4 py-2 hover:bg-[#a85226] transition-all duration-150 active:scale-95"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              + List Property
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#F5EFE0]/80 hover:text-[#F5EFE0]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1208] border-t border-white/10 animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors rounded-sm ${
                    location === link.href
                      ? "bg-[#C4622D]/20 text-[#C4622D]"
                      : "text-[#F5EFE0]/80 hover:bg-white/5 hover:text-[#F5EFE0]"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-medium text-[#F5EFE0]/80 border border-white/20 hover:bg-white/5 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Sign In
              </Link>
              <Link
                href="/list-property"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold bg-[#C4622D] text-white hover:bg-[#a85226] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                + List Property
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
