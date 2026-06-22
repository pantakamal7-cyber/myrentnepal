import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import { Search, X, Filter, ClipboardList } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel from "@/components/FilterPanel";
import { MOCK_LISTINGS, getStoredListings, type PropertyType } from "@/lib/data";

export default function Listings() {
  const searchStr = useSearch();
  const getParam = (k: string) => new URLSearchParams(window.location.search).get(k) || "";
  const [myListings] = useState(() => getStoredListings());

  const [query, setQuery] = useState(getParam("q"));
  const [location, setLocation] = useState(getParam("location"));
  const [propertyType, setPropertyType] = useState<PropertyType | "">(getParam("type") as PropertyType || "");
  const [minPrice, setMinPrice] = useState(Number(getParam("minPrice")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(getParam("maxPrice")) || 100000);
  const [verifiedOnly, setVerifiedOnly] = useState(getParam("verified") === "true");
  const [noBrokerOnly, setNoBrokerOnly] = useState(getParam("noBroker") === "true");
  const [waterOnly, setWaterOnly] = useState(getParam("water") === "true");
  const [parkingOnly, setParkingOnly] = useState(getParam("parking") === "true");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setLocation(p.get("location") || ""); setPropertyType(p.get("type") as PropertyType || "");
    setQuery(p.get("q") || ""); setVerifiedOnly(p.get("verified") === "true");
    setNoBrokerOnly(p.get("noBroker") === "true"); setMaxPrice(Number(p.get("maxPrice")) || 100000);
    setParkingOnly(p.get("parking") === "true");
  }, [searchStr]);

  const updateUrlParams = (k: string, v: any) => {
    const p = new URLSearchParams(window.location.search);
    if (v) p.set(k, String(v)); else p.delete(k);
    window.history.pushState({}, "", `${window.location.pathname}?${p.toString()}`);
  };

  const filtered = useMemo(() => {
    return [...MOCK_LISTINGS, ...getStoredListings()].filter((l) => {
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
    window.history.pushState({}, "", window.location.pathname);
  };

  const hasActiveFilters = query || location || propertyType || minPrice > 0 || maxPrice < 100000 || verifiedOnly || noBrokerOnly || waterOnly || parkingOnly;

  const panelProps = {
    location, setLocation, propertyType, setPropertyType, minPrice, setMinPrice, maxPrice, setMaxPrice,
    verifiedOnly, setVerifiedOnly, noBrokerOnly, setNoBrokerOnly, waterOnly, setWaterOnly, parkingOnly, setParkingOnly,
    clearFilters, hasActiveFilters, updateUrlParams
  };

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
          <div className="hidden lg:block lg:col-span-1 border-r pr-6 border-border"><FilterPanel {...panelProps} /></div>
          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search by area, description, or title..." value={query} onChange={(e) => { setQuery(e.target.value); updateUrlParams("q", e.target.value); }} className="w-full pl-9 pr-4 py-2.5 text-sm border border-border bg-white text-[#1A1208] outline-none focus:border-[#C4622D]" style={{ borderRadius: "2px" }} />
              </div>
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden px-4 border border-border flex items-center gap-2 text-sm bg-white" style={{ borderRadius: "2px" }}><Filter size={14} /> Filter</button>
            </div>
            {myListings.length > 0 && (
              <div className="border border-[#C4622D]/30 bg-[#C4622D]/5 p-4" style={{ borderRadius: "2px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList size={16} className="text-[#C4622D]" />
                  <span className="text-sm font-bold text-[#1A1208]">Your Submitted Listings ({myListings.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {myListings.map((item, idx) => <PropertyCard key={item.property_id || idx} property={item} index={idx} />)}
                </div>
              </div>
            )}
            <div className="text-sm text-muted-foreground">{`${filtered.length} properties available`}</div>
            {filtered.length === 0 ? (
              <div className="py-20 text-center space-y-3 border border-dashed border-border" style={{ borderRadius: "4px" }}>
                <p className="text-muted-foreground text-sm">No listings match your filter paths.</p>
                <button onClick={clearFilters} className="text-xs font-bold text-[#C4622D] uppercase tracking-wider underline">Clear All Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((item, idx) => <PropertyCard key={item.property_id || idx} property={item} index={idx} />)}
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
            <div className="mt-4"><FilterPanel {...panelProps} /></div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
