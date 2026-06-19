import { SlidersHorizontal, MapPin, ChevronDown, X } from "lucide-react";
import { KATHMANDU_LOCATIONS, PROPERTY_TYPES } from "@/lib/data";

export default function FilterPanel({
  location, setLocation, propertyType, setPropertyType,
  minPrice, setMinPrice, maxPrice, setMaxPrice,
  verifiedOnly, setVerifiedOnly, noBrokerOnly, setNoBrokerOnly,
  waterOnly, setWaterOnly, parkingOnly, setParkingOnly,
  clearFilters, hasActiveFilters, updateUrlParams
}: any) {
  return (
    <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1A1208] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          <SlidersHorizontal size={16} className="text-[#C4622D]" /> Filters
        </h3>
        {hasActiveFilters && <button onClick={clearFilters} className="text-xs text-[#C4622D] hover:underline flex items-center gap-1"><X size={12} /> Clear All</button>}
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Location</label>
        <div className="relative">
          <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
          <select value={location} onChange={(e) => { setLocation(e.target.value); updateUrlParams("location", e.target.value); }} className="w-full pl-8 pr-8 py-2.5 text-sm bg-white text-[#1A1208] border border-border appearance-none outline-none focus:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }}>
            <option value="">All Locations</option>
            {KATHMANDU_LOCATIONS.map((loc: string) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((t: string) => {
            const act = propertyType === t;
            return <button key={t} onClick={() => { const val = act ? "" : t; setPropertyType(val); updateUrlParams("type", val); }} className={`text-xs py-2 px-2 border font-medium transition-all text-center ${act ? "bg-[#C4622D] text-white border-[#C4622D]" : "bg-white text-[#1A1208] border-border hover:border-[#C4622D] hover:text-[#C4622D]"}`} style={{ borderRadius: "2px" }}>{t}</button>;
          })}
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
            { label: "Verified Listings Only", value: verifiedOnly, set: setVerifiedOnly, key: "verified" },
            { label: "No Broker Fee", value: noBrokerOnly, set: setNoBrokerOnly, key: "noBroker" },
            { label: "Water Available", value: waterOnly, set: setWaterOnly, key: "water" },
            { label: "Parking Available", value: parkingOnly, set: setParkingOnly, key: "parking" },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => { const n = !item.value; item.set(n); updateUrlParams(item.key, n ? "true" : ""); }}>
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
}
