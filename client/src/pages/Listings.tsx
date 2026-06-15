import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, MapPin, ChevronDown, X, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_LISTINGS, KATHMANDU_LOCATIONS, PROPERTY_TYPES, type PropertyType } from "@/lib/data";

export default function Listings() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);

  const [query, setQuery] = useState(params.get("q") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [propertyType, setPropertyType] = useState<PropertyType | "">((params.get("type") as PropertyType) || "");
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
      if (query && !l.title.toLowerCase().includes(query.toLowerCase()) && !l.location.toLowerCase().includes(query.toLowerCase()) && !l.description.toLowerCase().includes(query.toLowerCase())) return false;
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
    setQuery(""); setLocation(""); setPropertyType(""); setMinPrice(0); setMaxPrice(100000);
    setVerifiedOnly(false); setNoBrokerOnly(false); setWaterOnly(false); setParkingOnly(false);
  };

  const hasActiveFilters = query || location || propertyType || minPrice > 0 || maxPrice < 100000 || verifiedOnly || noBrokerOnly || waterOnly || parkingOnly;

  const FilterPanel = () => (
    <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1A1208] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          <SlidersHorizontal size={16} className="text-[#C4622D]" /> Filters
        </h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-[#C4622D] hover:underline flex items-center gap-1"><X size={12} /> Clear All</button>
        )}
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Location</label>
        <div className="relative">
          <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full pl-8 pr-8 py-2.5 text-sm bg-white text-[#1A1208] border border-border appearance-none outline-none focus:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }}>
            <option value="">All Locations</option>
            {KATHMANDU_LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button key={t} onClick={() => setPropertyType(propertyType === t ? "" : t)} className={`text-xs py-2 px-2 border font-medium transition-all text-center ${propertyType === t ? "bg-[#C4622D] text-white border-[#C4622D]" : "bg-white text-[#1A1208] border-border hover:border-[#C4622D] hover:text-[#C4622D]"}`} style={{ borderRadius: "2px" }}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Price Range (NPR/month)</label>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Min: Rs. {minPrice.toLocaleString()}</div>
            <input type="range" min={0} max={100000} step={1000} value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full accent-[#C4622D]" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Max: {maxPrice >= 100000 ? "Rs. 1,00,000+" : `Rs. ${maxPrice.toLocaleString()}`}</div>
            <input type="range" min={0} max={100000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#C4622D]" />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Must Have</label>
        <div className="space-y-2.5">
          {[
            { label: "Verified Listings Only", value: verifiedOnly, set: setVerifiedOnly },
            { label: "No Broker Fee", value: noBrokerOnly, set: setNoBrokerOnly },
            { label: "Water Available", value: waterOnly, set: setWaterOnly },
            { label: "Parking Available", value: parkingOnly, set: setParkingOnly },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => item.set(!item.value)}>
              <div className={`w-4 h-4 border-2 flex items-center justify-center transition-all shrink-0 ${item.value ? "bg-[#C4622D] border-[#C4622D]" : "border-border group-hover:border-[#C4622D]"}`} style={{ borderRadius: "2px" }}>
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
      <div className="bg-[#1A1208] text-[#F5EFE0] py-8">
        <div className="container px-4">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Browse Listings</h1>
            <p className="text-sm text-[#F5EFE0]/80">Find properties in Kathmandu verified directly from landlords.</p>
          </div>
        </div>
      </div>
      <div className="container px-4 flex-1 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block lg:col-span-1 border-r pr-6 border-border"><FilterPanel /></div>
          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search by area, description, or title..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-sm border border-border bg-white text-[#1A1208] outline-none focus:border-[#C4622D]" style={{ borderRadius: "2px" }} />
              </div>
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden px-4 border border-border flex items-center gap-2 text-sm bg-white" style={{ borderRadius: "2px" }}><Filter size={14} /> Filter</button>
            </div>
            <div className="text-sm text-muted-foreground">{`${filtered.length} properties available`}</div>
            {filtered.length === 0 ? (
              <div className="py-20 text-center space-y-3 border border-dashed border-border" style={{ borderRadius: "4px" }}>
                <p className="text-muted-foreground text-sm">No listings match your filter paths.</p>
                <button onClick={clearFilters} className="text-xs font-bold text-[#C4622D] uppercase tracking-wider underline">Clear All Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((item) => <PropertyCard key={item.id} property={item} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative ml-0 mr-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-xl overflow-y-auto">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-muted-foreground"><X size={18} /></button>
            <div className="mt-4"><FilterPanel /></div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

