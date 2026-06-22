/*
 * MYRENT Homepage – "Nepali Terracotta & Ink" Design
 * Full-bleed hero with asymmetric search panel, verified listings grid,
 * how-it-works section, and anti-fraud trust signals
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Search, MapPin, SlidersHorizontal, ShieldCheck, Ban, Clock,
  Flag, ArrowRight, ChevronDown, PlusCircle, Phone
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { fetchListings, KATHMANDU_LOCATIONS, PROPERTY_TYPES, type Listing } from "@/lib/data";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/hero_kathmandu-n5m7iM9LSMmw95w8MNqWwJ.webp";

export default function Home() {
  const [, navigate] = useLocation();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [allListings, setAllListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchListings().then(setAllListings);
  }, []);

    // 🚀 Force clean hard-redirect parameters to clear sticky React state containers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (searchType) params.set("type", searchType);
    if (searchQuery) params.set("q", searchQuery);
    
    // Using window.location forces the browser to pull down a fresh view with your keys
    window.location.href = `/listings?${params.toString()}`;
  };

  // 🎯 Quick-click function for your Popular Area cards layout lower down
  const handleQuickAreaClick = (areaName: string) => {
    window.location.href = `/listings?location=${encodeURIComponent(areaName)}`;
  };

  const verifiedListings = allListings.filter((l) => l.is_verified && l.availability_status === "Available");
  const recentListings = allListings.filter((l) => l.availability_status === "Available").slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Kathmandu cityscape"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay — dark left, lighter right */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(105deg, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.75) 45%, rgba(26,18,8,0.4) 100%)"
          }} />
          {/* Brick texture overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)`
          }} />
        </div>

        <div className="container relative z-10 py-16">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
              <div className="w-8 h-px bg-[#C4622D]" />
              <span className="text-[#C4622D] text-xs font-bold uppercase tracking-widest">
                Kathmandu's Direct Rental Platform
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl font-black text-white leading-[1.05] mb-5 animate-fade-in-up stagger-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Find Your Home.<br />
              <span className="text-[#C4622D]">No Brokers.</span><br />
              No Fake Listings.
            </h1>

            {/* Subheadline */}
            <p className="text-[#F5EFE0]/75 text-lg mb-8 leading-relaxed max-w-xl animate-fade-in-up stagger-2">
              Connect directly with verified landlords across Kathmandu. Every listing is owner-confirmed, document-verified, and auto-expires to stay fresh.
            </p>

            {/* Search Card */}
            <div className="search-bar-hero p-4 sm:p-5 animate-fade-in-up stagger-3" style={{ borderRadius: "2px" }}>
              <form onSubmit={handleSearch}>
                {/* Text search */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Search size={18} className="text-[#C4622D] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by area, landmark, or property type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-[#1A1208] placeholder-muted-foreground text-sm outline-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Filters row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {/* Location */}
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
                    <select
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-8 pr-8 py-2.5 text-sm bg-[#F5EFE0] text-[#1A1208] border border-border appearance-none outline-none focus:border-[#C4622D] transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}
                    >
                      <option value="">All Locations</option>
                      {KATHMANDU_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* Property Type */}
                  <div className="relative">
                    <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-full pl-8 pr-8 py-2.5 text-sm bg-[#F5EFE0] text-[#1A1208] border border-border appearance-none outline-none focus:border-[#C4622D] transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: "2px" }}
                    >
                      <option value="">All Types</option>
                      {PROPERTY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* Search button */}
                  <button
                    type="submit"
                    className="bg-[#C4622D] text-white font-bold text-sm py-2.5 px-6 flex items-center justify-center gap-2 hover:bg-[#a85226] transition-all duration-150 active:scale-95"
                    style={{ borderRadius: "2px" }}
                  >
                    <Search size={15} />
                    Search
                  </button>
                </div>

                {/* Quick filters */}
                               <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Under Rs. 10,000", url: "/listings?maxPrice=10000" },
                    { label: "Verified Only", url: "/listings?verified=true" },
                    { label: "No Broker", url: "/listings?noBroker=true" },
                    { label: "Parking Available", url: "/listings?parking=true" }
                  ].map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => {
                        window.location.href = tag.url;
                      }}
                      className="text-xs px-3 py-1 border border-border bg-white text-muted-foreground hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                      style={{ borderRadius: "2px" }}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-6 animate-fade-in-up stagger-4">
              {[
                { value: "500+", label: "Verified Listings" },
                { value: "0", label: "Broker Fees" },
                { value: "30+", label: "Neighbourhoods" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#F5EFE0]/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES BAR ─────────────────────────────────────── */}
      <section className="bg-[#C4622D] text-white py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: ShieldCheck, text: "Document Verified Listings" },
              { icon: Ban, text: "Zero Broker Policy" },
              { icon: Clock, text: "Auto-Expiry After 14 Days" },
              { icon: Flag, text: "Community Report System" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-semibold">
                <Icon size={16} className="text-white/80" />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENTLY VERIFIED LISTINGS ───────────────────────────── */}
      <section className="py-14 bg-background">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-[#C4622D]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
                  Fresh & Verified
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recently Verified Listings
              </h2>
            </div>
            <button
              onClick={() => navigate("/listings")}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#C4622D] hover:underline"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verifiedListings.slice(0, 6).length > 0 ? (
              verifiedListings.slice(0, 6).map((listing, i) => (
                <PropertyCard key={listing.property_id} property={listing} index={i} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-border" style={{ borderRadius: "4px" }}>
                <p className="text-muted-foreground text-sm mb-4">No verified listings yet. Be the first landlord to list!</p>
                <button
                  onClick={() => navigate("/list-property")}
                  className="text-xs font-bold text-white bg-[#C4622D] px-5 py-2.5 uppercase tracking-wider hover:bg-[#a85226] transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  List Your Property
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C4622D] border border-[#C4622D] px-6 py-2.5 hover:bg-[#C4622D] hover:text-white transition-colors"
              style={{ borderRadius: "2px" }}
            >
              View All Listings <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-14 bg-[#1A1208] text-[#F5EFE0]">
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
                Simple & Transparent
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              How MYRENT Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Filter",
                desc: "Browse verified listings by location, price range, and property type. Every listing shows real photos and exact ward addresses.",
                icon: Search,
              },
              {
                step: "02",
                title: "Verify & Trust",
                desc: "Every landlord submits Citizenship, Lalpurja, or Ward Utilities Bill. Listings auto-expire after 14 days unless the landlord re-confirms availability.",
                icon: ShieldCheck,
              },
              {
                step: "03",
                title: "Call Directly",
                desc: "Click 'Call Landlord' or 'WhatsApp/Viber Chat' to connect instantly. No middlemen, no broker fees — ever.",
                icon: Phone,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative">
                  <div className="text-6xl font-black text-white/5 absolute -top-2 -left-2 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.step}
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#C4622D]/20 flex items-center justify-center mb-4" style={{ borderRadius: "2px" }}>
                      <Icon size={22} className="text-[#C4622D]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#F5EFE0] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-[#F5EFE0]/60 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ANTI-FRAUD RULES ─────────────────────────────────────── */}
      <section className="py-14 bg-background">
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
                Built-In Protection
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Anti-Fraud System
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm">
              Three strict behavioral rules are enforced on every listing and every landlord account on MYRENT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                rule: "Rule A",
                label: "The Broker Filter",
                color: "#C4622D",
                icon: Ban,
                title: "Zero Broker Guarantee",
                desc: "Landlords must confirm: \"I am the owner/direct family member. I will not charge broker fees.\" If 3 unique users report otherwise, the account auto-suspends.",
              },
              {
                rule: "Rule B",
                label: "Listing Expiry",
                color: "#7A8C6E",
                icon: Clock,
                title: "14-Day Auto-Expiry",
                desc: "Every listing automatically hides from search after 14 days unless the landlord clicks a 1-click 'Still Available' re-verification button sent via SMS.",
              },
              {
                rule: "Rule C",
                label: "Report Button",
                color: "#8B2020",
                icon: Flag,
                title: "Community Report System",
                desc: "Every property page has a visible 'Report Fake/Rented Listing' button. High report ratios trigger automated admin review flag alerts.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.rule}
                  className="border border-border bg-white p-6 relative overflow-hidden"
                  style={{ borderRadius: "2px" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: item.color }}
                  />
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2 py-0.5"
                      style={{
                        background: `${item.color}18`,
                        color: item.color,
                        borderRadius: "2px",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {item.rule}
                    </span>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {item.label}
                    </span>
                  </div>
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-3"
                    style={{ background: `${item.color}15`, borderRadius: "2px" }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY TYPE ───────────────────────────────────────── */}
      <section className="py-14 bg-[#F5EFE0]">
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
                Browse By Type
              </span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Are You Looking For?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: "Room", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_room-97thervvkFxgwxbfyeF6ZH.webp", count: "180+ listings", from: "Rs. 5,000" },
              { type: "Flat", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_flat-k9RdXoL8964gtbQwCfzx7N.webp", count: "240+ listings", from: "Rs. 12,000" },
              { type: "Full House", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_house-jciBQvGVqXqghBvHwqudo8.webp", count: "60+ listings", from: "Rs. 30,000" },
              { type: "Shutter/Commercial", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_commercial-dv9MZTaiv6jxJAqn3HD8bH.webp", count: "45+ listings", from: "Rs. 20,000" },
            ].map((item, i) => (
              <button
                key={item.type}
                onClick={() => navigate(`/listings?type=${encodeURIComponent(item.type)}`)}
                className={`group relative overflow-hidden text-left animate-fade-in-up stagger-${i + 1}`}
                style={{ borderRadius: "2px", aspectRatio: "4/5" }}
              >
                <img
                  src={item.img}
                  alt={item.type}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(26,18,8,0.85) 0%, rgba(26,18,8,0.2) 60%, transparent 100%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.type}
                  </div>
                  <div className="text-white/70 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.count}
                  </div>
                  <div className="text-[#C4622D] text-xs font-semibold mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    From {item.from}/mo
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="py-14 bg-[#C4622D] text-white">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Are You a Landlord?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            List your property for free. Reach thousands of verified tenants in Kathmandu. No broker, no commission — just direct connections.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/list-property")}
              className="bg-white text-[#C4622D] font-bold px-8 py-3.5 text-base hover:bg-[#F5EFE0] transition-colors active:scale-95 flex items-center gap-2"
              style={{ borderRadius: "2px" }}
            >
              <PlusCircle size={18} />
              List Your Property Free
            </button>
            <button
              onClick={() => navigate("/how-it-works")}
              className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 text-base hover:bg-white/10 transition-colors flex items-center gap-2"
              style={{ borderRadius: "2px" }}
            >
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

