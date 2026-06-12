/*
 * MYRENT Listings Page – "Nepali Terracotta & Ink" Design
 * Left-anchored filter sidebar + offset card grid
 */
import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, MapPin, ChevronDown, X, ShieldCheck, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_LISTINGS, KATHMANDU_LOCATIONS, PROPERTY_TYPES, type PropertyType } from "@/lib/data";

export default function Listings() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);

  const [query, setQuery] = useState(params.get("q") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [propertyType, setPropertyType] = useState<PropertyType | "">(
    (params.get("type") as PropertyType) || ""
  );
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [noBrokerOnly, setNoBrokerOnly] = useState(false);
  const [waterOnly, setWaterOnly] = useState(false);
  const [parkingOnly, setParkingOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_LISTINGS.filter((l) => {
      if (l.availability_status !== "Available") return false;
      if (query && !l.title.toLowerCase().includes(query.toLowerCase()) &&
          !l.location.toLowerCase().includes(query.toLowerCase()) &&
          !l.description.toLowerCase().includes(query.toLowerCase())) return false;
      if (location && l.location !== location) return false;
      if (propertyType && l.property_type !== propertyType) return false;
      if (l.price_npr < minPrice || l.price_npr > maxPrice) return false;
      if (verifiedOnly && !l.is_verified) return false;
      if (noBrokerOnly && !l.is_broker_free) return false;
      if (waterOnly && !l.water_availability) return false;
      if (parkingOnly && !l.parking_bike && !l.parking_car) return false;
      return true;
    });
  }, [query, location, propertyType, minPrice, maxPrice, verifiedOnly, noBrokerOnly, waterOnly, parkingOnly]);

  const clearFilters = () => {
    setQuery("");
    setLocation("");
    setPropertyType("");
    setMinPrice(0);
    setMaxPrice(100000);
    setVerifiedOnly(false);
    setNoBrokerOnly(false);
    setWaterOnly(false);
    setParkingOnly(false);
  };

  const hasActiveFilters = query || location || propertyType || minPrice > 0 || maxPrice < 100000 || verifiedOnly || noBrokerOnly || waterOnly || parkingOnly;

  const FilterPanel = () => (
    <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1A1208] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          <SlidersHorizontal size={16} className="text-[#C4622D]" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#C4622D] hover:underline flex items-center gap-1"
          >
            <X size={12} /> Clear All
          </button>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
          Location
        </label>
        <div className="relative">
          <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-8 pr-8 py-2.5 text-sm bg-white text-[#1A1208] border border-border appearance-none outline-none focus:border-[#C4622D] transition-colors"
            style={{ borderRadius: "2px" }}
          >
            <option value="">All Locations</option>
            {KATHMANDU_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
          Property Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setPropertyType(propertyType === t ? "" : t)}
              className={`text-xs py-2 px-2 border font-medium transition-all text-center ${
                propertyType === t
                  ? "bg-[#C4622D] text-white border-[#C4622D]"
                  : "bg-white text-[#1A1208] border-border hover:border-[#C4622D] hover:text-[#C4622D]"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
          Price Range (NPR/month)
        </label>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Min: Rs. {minPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full accent-[#C4622D]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Max: {maxPrice >= 100000 ? "Rs. 1,00,000+" : `Rs. ${maxPrice.toLocaleString()}`}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C4622D]"
            />
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
          Must Have
        </label>
        <div className="space-y-2.5">
          {[
            { label: "Verified Listings Only", value: verifiedOnly, set: setVerifiedOnly, icon: "✓" },
            { label: "No Broker Fee", value: noBrokerOnly, set: setNoBrokerOnly, icon: "⊘" },
            { label: "Water Available", value: waterOnly, set: setWaterOnly, icon: "💧" },
            { label: "Parking Available", value: parkingOnly, set: setParkingOnly, icon: "🅿" },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => item.set(!item.value)}
                className={`w-4 h-4 border-2 flex items-center justify-center transition-all shrink-0 ${
                  item.value
                    ? "bg-[#C4622D] border-[#C4622D]"
                    : "border-border group-hover:border-[#C4622D]"
                }`}
                style={{ borderRadius: "2px" }}
              >
                {item.value && <span className="text-white text-xs leading-none">✓</span>}
              </div>
              <span className="text-sm text-[#1A1208]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Page header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-8">
        <div className="container">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
              Kathmandu Rentals
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            Browse Listings
          </h1>
          <p className="text-[#F5EFE0]/60 text-sm mt-1">
            {filtered.length} properties available · All owner-verified, broker-free
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-border py-3 sticky top-16 z-40">
        <div className="container">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-[#F5EFE0] px-3 py-2.5 border border-border focus-within:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }}>
              <Search size={15} className="text-[#C4622D] shrink-0" />
              <input
                type="text"
                placeholder="Search listings..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#1A1208] placeholder-muted-foreground outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-[#1A1208]">
                  <X size={14} />
                </button>
              )}
            </div>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden flex items-center gap-2 px-3 py-2.5 border text-sm font-medium transition-colors ${
                hasActiveFilters
                  ? "bg-[#C4622D] text-white border-[#C4622D]"
                  : "bg-white text-[#1A1208] border-border hover:border-[#C4622D]"
              }`}
              style={{ borderRadius: "2px" }}
            >
              <Filter size={15} />
              Filters
              {hasActiveFilters && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 py-8">
        <div className="container">
          <div className="flex gap-8">
            {/* Sidebar – desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32 bg-white border border-border p-5" style={{ borderRadius: "2px" }}>
                <FilterPanel />
              </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                <div className="relative ml-auto w-80 max-w-full bg-white h-full overflow-y-auto p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>Filters</h3>
                    <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-[#1A1208]">
                      <X size={20} />
                    </button>
                  </div>
                  <FilterPanel />
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="mt-6 w-full bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    Show {filtered.length} Results
                  </button>
                </div>
              </div>
            )}

            {/* Listings grid */}
            <div className="flex-1 min-w-0">
              {/* Active filter pills */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {location && (
                    <span className="flex items-center gap-1 text-xs bg-[#C4622D]/10 text-[#C4622D] border border-[#C4622D]/30 px-2.5 py-1" style={{ borderRadius: "2px" }}>
                      <MapPin size={10} /> {location}
                      <button onClick={() => setLocation("")} className="ml-1 hover:text-[#1A1208]"><X size={10} /></button>
                    </span>
                  )}
                  {propertyType && (
                    <span className="flex items-center gap-1 text-xs bg-[#C4622D]/10 text-[#C4622D] border border-[#C4622D]/30 px-2.5 py-1" style={{ borderRadius: "2px" }}>
                      {propertyType}
                      <button onClick={() => setPropertyType("")} className="ml-1 hover:text-[#1A1208]"><X size={10} /></button>
                    </span>
                  )}
                  {verifiedOnly && (
                    <span className="flex items-center gap-1 text-xs bg-[#7A8C6E]/10 text-[#7A8C6E] border border-[#7A8C6E]/30 px-2.5 py-1" style={{ borderRadius: "2px" }}>
                      <ShieldCheck size={10} /> Verified Only
                      <button onClick={() => setVerifiedOnly(false)} className="ml-1 hover:text-[#1A1208]"><X size={10} /></button>
                    </span>
                  )}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    No listings found
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Try adjusting your filters or search in a different area.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#C4622D] border border-[#C4622D] px-4 py-2 hover:bg-[#C4622D] hover:text-white transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((listing, i) => (
                    <PropertyCard key={listing.property_id} listing={listing} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
