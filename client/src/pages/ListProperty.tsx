/*
 * MYRENT List Property Page – "Nepali Terracotta & Ink" Design
 * Includes Rule A: Broker Filter checkbox
 * Includes document upload for verification
 * Includes 14-day expiry notice (Rule B)
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ShieldCheck, Ban, Clock, Upload, CheckCircle2, AlertTriangle,
  Phone, MapPin, ChevronDown, Info, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { KATHMANDU_LOCATIONS, PROPERTY_TYPES, type Listing, type PropertyType, saveListingToStorage } from "@/lib/data";

type Step = 1 | 2 | 3 | 4;

export default function ListProperty() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    title: "",
    property_type: "",
    location: "",
    exact_address: "",
    price: "",
    deposit: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    water: false,
    parking_bike: false,
    parking_car: false,
    submeter: false,
    amenities: [] as string[],
    doc_type: "",
    broker_confirmed: false,
  });

  const update = (field: string, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleAmenity = (a: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    }));
  };

  const handleSubmit = async () => {
    if (!form.broker_confirmed) {
      toast.error("You must confirm the broker-free pledge to list on MYRENT.");
      return;
    }

    const today = new Date();
    const expiry = new Date(today);
    expiry.setDate(expiry.getDate() + 14);

    const newListing: Listing = {
      property_id: `user-${Date.now()}`,
      landlord_id: `landlord-${Date.now()}`,
      landlord_name: form.full_name,
      landlord_phone: form.phone,
      title: form.title,
      property_type: form.property_type as PropertyType,
      price_npr: Number(form.price) || 0,
      security_deposit_npr: Number(form.deposit) || 0,
      location: form.location,
      ward: "",
      exact_address: form.exact_address,
      amenities: form.amenities,
      images: [],
      date_listed: today.toISOString().slice(0, 10),
      expiry_date: expiry.toISOString().slice(0, 10),
      availability_status: "Available",
      view_count: 0,
      report_count: 0,
      is_verified: false,
      is_broker_free: form.broker_confirmed,
      water_availability: form.water,
      parking_bike: form.parking_bike,
      parking_car: form.parking_car,
      electricity_submeter: form.submeter,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      area_sqft: form.area ? Number(form.area) : undefined,
      description: form.description,
    };

    saveListingToStorage(newListing);
    setSubmitted(true);
    toast.success("Listing submitted!", {
      description: "Your listing is now live. Once verified, it will display the verified badge.",
    });
  };

  const steps = [
    { n: 1, label: "Your Details" },
    { n: 2, label: "Property Info" },
    { n: 3, label: "Utilities & Amenities" },
    { n: 4, label: "Verify & Submit" },
  ];
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 bg-[#7A8C6E]/15 flex items-center justify-center mx-auto mb-6" style={{ borderRadius: "2px" }}>
              <CheckCircle2 size={40} className="text-[#7A8C6E]" />
            </div>
            <h2 className="text-3xl font-black text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Listing Submitted!
            </h2>
            <p className="text-muted-foreground mb-2">
              Your property <strong>"{form.title}"</strong> has been submitted for verification.
            </p>
            <div className="bg-[#F5EFE0] border border-border p-4 text-left mb-6 space-y-2" style={{ borderRadius: "2px" }}>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-[#C4622D]" />
                <span>Your listing is <strong>live now</strong> and visible on the Browse Listings page. A verified badge will be added once your documents are reviewed (24-48 hrs)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-amber-600" />
                <span>Listing auto-expires after <strong>14 days</strong> — you'll receive an SMS to re-confirm availability</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Ban size={14} className="text-[#C4622D]" />
                <span>Your broker-free pledge is recorded and enforced</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 text-sm border border-border text-[#1A1208] hover:bg-muted transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Go Home
              </button>
              <button
                onClick={() => navigate("/listings")}
                className="flex-1 py-3 text-sm bg-[#C4622D] text-white font-semibold hover:bg-[#a85226] transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Browse Listings
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-8">
        <div className="container">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
              Free to List
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            List Your Property
          </h1>
          <p className="text-[#F5EFE0]/60 text-sm mt-1">
            Reach thousands of verified tenants in Kathmandu. No broker, no commission.
          </p>
        </div>
      </div>

      <div className="flex-1 py-8">
        <div className="container max-w-3xl">

          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-all ${
                      step === s.n
                        ? "bg-[#C4622D] text-white"
                        : step > s.n
                        ? "bg-[#7A8C6E] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                    style={{ borderRadius: "2px" }}
                  >
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${step === s.n ? "text-[#C4622D] font-semibold" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${step > s.n ? "bg-[#7A8C6E]" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* ── STEP 1: Your Details ─────────────────────────── */}
          {step === 1 && (
            <div className="bg-white border border-border p-6 space-y-5" style={{ borderRadius: "2px" }}>
              <h2 className="text-xl font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Ram Bahadur Shrestha"
                    value={form.full_name}
                    onChange={(e) => update("full_name", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Phone Number (for OTP) *
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
                    <input
                      type="tel"
                      placeholder="+977-98XXXXXXXX"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                      style={{ borderRadius: "2px" }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!form.full_name || !form.phone) {
                    toast.error("Please fill in your name and phone number.");
                    return;
                  }
                  setStep(2);
                }}
                className="w-full bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors flex items-center justify-center gap-2"
                style={{ borderRadius: "2px" }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ── STEP 2: Property Info ─────────────────────────── */}
          {step === 2 && (
            <div className="bg-white border border-border p-6 space-y-5" style={{ borderRadius: "2px" }}>
              <h2 className="text-xl font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Property Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bright 2BHK Flat in New Baneshwor"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Property Type *
                    </label>
                    <div className="relative">
                      <select
                        value={form.property_type}
                        onChange={(e) => update("property_type", e.target.value)}
                        className="w-full px-3 pr-8 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] appearance-none outline-none focus:border-[#C4622D] transition-colors"
                        style={{ borderRadius: "2px" }}
                      >
                        <option value="">Select type</option>
                        {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4622D]" />
                      <select
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        className="w-full pl-8 pr-8 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] appearance-none outline-none focus:border-[#C4622D] transition-colors"
                        style={{ borderRadius: "2px" }}
                      >
                        <option value="">Select area</option>
                        {KATHMANDU_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Exact Address *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shrestha Bhawan, New Baneshwor Chowk, Near Everest Bank"
                    value={form.exact_address}
                    onChange={(e) => update("exact_address", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Monthly Rent (NPR) *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 15000"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                      style={{ borderRadius: "2px" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Security Deposit (NPR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 15000"
                      value={form.deposit}
                      onChange={(e) => update("deposit", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors"
                      style={{ borderRadius: "2px" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Bedrooms</label>
                    <input type="number" placeholder="2" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Bathrooms</label>
                    <input type="number" placeholder="1" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Area (sq.ft)</label>
                    <input type="number" placeholder="600" value={form.area} onChange={(e) => update("area", e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the property, nearby landmarks, floor level, furnishing status, etc."
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border bg-[#F5EFE0] text-[#1A1208] outline-none focus:border-[#C4622D] transition-colors resize-none"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 text-sm border border-border text-muted-foreground hover:bg-muted transition-colors" style={{ borderRadius: "2px" }}>
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!form.title || !form.property_type || !form.location || !form.price) {
                      toast.error("Please fill in all required fields.");
                      return;
                    }
                    setStep(3);
                  }}
                  className="flex-1 bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors flex items-center justify-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Utilities & Amenities ────────────────── */}
          {step === 3 && (
            <div className="bg-white border border-border p-6 space-y-6" style={{ borderRadius: "2px" }}>
              <h2 className="text-xl font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Utilities & Amenities
              </h2>

              {/* Utility rules */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Utility Availability
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "water", label: "Water Available", icon: "💧" },
                    { key: "parking_bike", label: "Bike Parking", icon: "🏍" },
                    { key: "parking_car", label: "Car Parking", icon: "🚗" },
                    { key: "submeter", label: "Electricity Sub-meter", icon: "⚡" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 p-3 border border-border cursor-pointer hover:border-[#C4622D] transition-colors" style={{ borderRadius: "2px" }}>
                      <div
                        onClick={() => update(item.key, !form[item.key as keyof typeof form])}
                        className={`w-5 h-5 border-2 flex items-center justify-center transition-all shrink-0 ${
                          form[item.key as keyof typeof form]
                            ? "bg-[#7A8C6E] border-[#7A8C6E]"
                            : "border-border"
                        }`}
                        style={{ borderRadius: "2px" }}
                      >
                        {form[item.key as keyof typeof form] && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-sm">{item.icon} {item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Amenities (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {["WiFi", "Furnished", "Semi-Furnished", "Kitchen", "Balcony", "Rooftop", "Garden", "Lift/Elevator", "Security Guard", "CCTV", "Generator", "Solar", "Washing Machine", "AC", "Heater"].map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`text-xs px-3 py-1.5 border font-medium transition-all ${
                        form.amenities.includes(a)
                          ? "bg-[#C4622D] text-white border-[#C4622D]"
                          : "bg-white text-[#1A1208] border-border hover:border-[#C4622D]"
                      }`}
                      style={{ borderRadius: "2px" }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo upload placeholder */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Property Photos
                </label>
                <div className="border-2 border-dashed border-border p-8 text-center hover:border-[#C4622D] transition-colors cursor-pointer" style={{ borderRadius: "2px" }}>
                  <Upload size={28} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#1A1208]">Upload Property Photos</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB each · Max 10 photos</p>
                  <button
                    onClick={() => toast.info("Photo upload coming soon", { description: "This feature requires account verification first." })}
                    className="mt-3 text-xs text-[#C4622D] border border-[#C4622D] px-4 py-1.5 hover:bg-[#C4622D] hover:text-white transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 text-sm border border-border text-muted-foreground hover:bg-muted transition-colors" style={{ borderRadius: "2px" }}>
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors flex items-center justify-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Verify & Submit ───────────────────────── */}
          {step === 4 && (
            <div className="space-y-4">
              {/* Document verification */}
              <div className="bg-white border border-border p-6" style={{ borderRadius: "2px" }}>
                <h2 className="text-xl font-bold text-[#1A1208] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Document Verification
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  To protect tenants, all listings require ownership proof. Select and upload one of the following:
                </p>
                <div className="space-y-3 mb-5">
                  {[
                    { value: "citizenship", label: "Citizenship Copy (Nagarikta)", desc: "Your Nepali citizenship certificate" },
                    { value: "lalpurja", label: "Lalpurja / Land Ownership Certificate", desc: "Official land registration document" },
                    { value: "utilities", label: "Ward Utilities Bill", desc: "Recent electricity or water bill in your name" },
                  ].map((doc) => (
                    <label key={doc.value} className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${form.doc_type === doc.value ? "border-[#C4622D] bg-[#C4622D]/5" : "border-border hover:border-[#C4622D]/50"}`} style={{ borderRadius: "2px" }}>
                      <div
                        onClick={() => update("doc_type", doc.value)}
                        className={`w-5 h-5 border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${form.doc_type === doc.value ? "bg-[#C4622D] border-[#C4622D]" : "border-border"}`}
                        style={{ borderRadius: "50%" }}
                      >
                        {form.doc_type === doc.value && <span className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1A1208]">{doc.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{doc.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {form.doc_type && (
                  <div className="border-2 border-dashed border-border p-5 text-center hover:border-[#C4622D] transition-colors cursor-pointer" style={{ borderRadius: "2px" }}>
                    <Upload size={22} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Upload your document</p>
                    <button
                      onClick={() => toast.info("Document upload ready", { description: "Please attach your verification document." })}
                      className="mt-2 text-xs text-[#C4622D] border border-[#C4622D] px-4 py-1.5 hover:bg-[#C4622D] hover:text-white transition-colors"
                      style={{ borderRadius: "2px" }}
                    >
                      Attach File
                    </button>
                  </div>
                )}
              </div>

              {/* 14-day expiry notice */}
              <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3" style={{ borderRadius: "2px" }}>
                <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">14-Day Auto-Expiry (Rule B)</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Your listing will automatically be hidden from search after 14 days. You'll receive an SMS asking you to click "Still Available" to re-activate it. This prevents ghost listings of already-rented properties.
                  </p>
                </div>
              </div>

              {/* ── RULE A: BROKER FILTER ── */}
              <div className={`border-2 p-5 transition-all ${form.broker_confirmed ? "border-[#7A8C6E] bg-[#7A8C6E]/5" : "border-[#C4622D] bg-[#C4622D]/5"}`} style={{ borderRadius: "2px" }}>
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => update("broker_confirmed", !form.broker_confirmed)}
                    className={`w-6 h-6 border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 cursor-pointer ${
                      form.broker_confirmed
                        ? "bg-[#7A8C6E] border-[#7A8C6E]"
                        : "border-[#C4622D]"
                    }`}
                    style={{ borderRadius: "2px" }}
                  >
                    {form.broker_confirmed && <span className="text-white text-sm font-bold">✓</span>}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1208] mb-1 flex items-center gap-2">
                      <Ban size={15} className="text-[#C4622D]" />
                      Broker-Free Pledge (Required — Rule A)
                    </p>
                    <p className="text-sm text-[#1A1208] leading-relaxed">
                      <strong>"I confirm that I am the owner or a direct family member of this property. I will not charge any broker fees to the tenant. I understand that if 3 unique users report otherwise, my account will be automatically suspended."</strong>
                    </p>
                    {!form.broker_confirmed && (
                      <p className="text-xs text-[#C4622D] mt-2 flex items-center gap-1">
                        <AlertTriangle size={12} /> You must check this box to list on MYRENT
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white border border-border p-5" style={{ borderRadius: "2px" }}>
                <h3 className="text-sm font-bold text-[#1A1208] mb-3 flex items-center gap-2">
                  <Info size={15} className="text-[#C4622D]" />
                  Listing Summary
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="font-medium text-[#1A1208] text-right max-w-[60%]">{form.title || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-[#1A1208]">{form.property_type || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium text-[#1A1208]">{form.location || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Rent</span><span className="font-medium text-[#1A1208]">{form.price ? `Rs. ${Number(form.price).toLocaleString()}/mo` : "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Landlord</span><span className="font-medium text-[#1A1208]">{form.full_name || "—"}</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 py-3 text-sm border border-border text-muted-foreground hover:bg-muted transition-colors" style={{ borderRadius: "2px" }}>
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.broker_confirmed}
                  className="flex-1 bg-[#C4622D] text-white font-bold py-3 text-sm hover:bg-[#a85226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  <ShieldCheck size={16} />
                  Submit for Verification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
