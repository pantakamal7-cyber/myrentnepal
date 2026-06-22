/*
 * MYRENT Property Detail Page – "Nepali Terracotta & Ink" Design
 * Prioritizes real photos, large bold pricing, utility rules, and direct CTA buttons.
 * Includes Report button (Rule C), Broker-free confirmation, and expiry warning.
 */
import { useState } from "react";
import { useParams, useLocation } from "wouter";
import {
  MapPin, Phone, MessageCircle, Flag, ShieldCheck, Ban, Clock,
  Droplets, Bike, Car, Zap, Eye, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle2, XCircle, Share2, Heart, Home,
  Bed, Bath, Maximize2, Calendar
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_LISTINGS, getStoredListings, formatNPR, getDaysUntilExpiry } from "@/lib/data";
import { MapView } from "@/components/Map";

const PLACEHOLDER_IMG = "https://placehold.co/800x450?text=No+Image";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [currentImg, setCurrentImg] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const allListings = [...MOCK_LISTINGS, ...getStoredListings()];
  const listing = allListings.find((l) => l.property_id === id);

  // Ensure images array always has at least one entry to prevent crashes
  const images = listing && listing.images.length > 0 ? listing.images : [PLACEHOLDER_IMG];

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Listing Not Found
            </h2>
            <p className="text-muted-foreground mb-4">This property may have been removed or rented.</p>
            <button
              onClick={() => navigate("/listings")}
              className="bg-[#C4622D] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#a85226] transition-colors"
              style={{ borderRadius: "2px" }}
            >
              Browse All Listings
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const daysLeft = getDaysUntilExpiry(listing.expiry_date);
  const isExpiringSoon = daysLeft <= 3 && daysLeft > 0;
  const related = allListings.filter(
    (l) => l.property_id !== listing.property_id && l.location === listing.location && l.availability_status === "Available"
  ).slice(0, 3);

  const handleCall = () => {
    window.location.href = `tel:${listing.landlord_phone}`;
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I found your listing on MYRENT: "${listing.title}" in ${listing.location}. Is it still available?`);
    window.open(`https://wa.me/${listing.landlord_phone.replace(/[^0-9]/g, "")}?text=${msg}`, "_blank");
  };

  const handleViber = () => {
    toast.info("Opening Viber...", { description: `Calling ${listing.landlord_phone}` });
  };

  const handleReport = () => {
    if (!reportReason) {
      toast.error("Please select a reason for reporting.");
      return;
    }
    setReportSubmitted(true);
    toast.success("Report submitted", {
      description: "Our team will review this listing within 24 hours. Thank you for keeping MYRENT safe.",
    });
    setTimeout(() => setReportOpen(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-[#F5EFE0] border-b border-border py-3">
        <div className="container">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <button onClick={() => navigate("/")} className="hover:text-[#C4622D] flex items-center gap-1">
              <Home size={12} /> Home
            </button>
            <span>/</span>
            <button onClick={() => navigate("/listings")} className="hover:text-[#C4622D]">Listings</button>
            <span>/</span>
            <button onClick={() => navigate(`/listings?location=${listing.location}`)} className="hover:text-[#C4622D]">
              {listing.location}
            </button>
            <span>/</span>
            <span className="text-[#1A1208] font-medium truncate max-w-[200px]">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COLUMN: Photos + Details ─────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Photo Gallery */}
              <div className="relative overflow-hidden bg-[#1A1208]" style={{ borderRadius: "2px", aspectRatio: "16/9" }}>
                <img
                  src={images[currentImg]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {listing.is_verified && (
                    <span className="verified-badge">
                      <ShieldCheck size={10} /> Verified
                    </span>
                  )}
                  {listing.is_broker_free && (
                    <span className="broker-free-badge">
                      <Ban size={10} /> No Broker
                    </span>
                  )}
                </div>
                {/* Property type */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold px-2 py-1 text-white" style={{ background: "rgba(26,18,8,0.75)", backdropFilter: "blur(4px)" }}>
                    {listing.property_type}
                  </span>
                </div>
                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImg((i) => Math.max(0, i - 1))}
                      disabled={currentImg === 0}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 disabled:opacity-30 transition-all"
                      style={{ borderRadius: "2px" }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setCurrentImg((i) => Math.min(images.length - 1, i + 1))}
                      disabled={currentImg === images.length - 1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 disabled:opacity-30 transition-all"
                      style={{ borderRadius: "2px" }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 text-white text-xs px-2 py-1" style={{ background: "rgba(26,18,8,0.6)", backdropFilter: "blur(4px)" }}>
                  {currentImg + 1} / {images.length}
                </div>
                {/* View count */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs" style={{ background: "rgba(26,18,8,0.6)", backdropFilter: "blur(4px)", padding: "3px 8px" }}>
                  <Eye size={11} /> {listing.view_count} views
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`w-20 h-14 overflow-hidden border-2 transition-all ${i === currentImg ? "border-[#C4622D]" : "border-transparent opacity-70 hover:opacity-100"}`}
                      style={{ borderRadius: "2px" }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Expiry warning */}
              {isExpiringSoon && (
                <div className="expiry-warning flex items-center gap-3">
                  <Clock size={16} className="text-amber-600 shrink-0" />
                  <div>
                    <span className="font-semibold">Listing expires in {daysLeft} day{daysLeft !== 1 ? "s" : ""}</span>
                    <span className="text-muted-foreground ml-1">— contact the landlord soon to confirm availability.</span>
                  </div>
                </div>
              )}

              {/* Title & Location */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#C4622D]" />
                  <span className="text-sm font-semibold text-[#C4622D]">{listing.location}</span>
                  <span className="text-sm text-muted-foreground">· {listing.ward}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#1A1208] leading-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {listing.title}
                </h1>
                <p className="text-sm text-muted-foreground">{listing.exact_address}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {listing.bedrooms && (
                  <div className="bg-white border border-border p-3 text-center" style={{ borderRadius: "2px" }}>
                    <Bed size={18} className="text-[#C4622D] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>{listing.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">Bedroom{listing.bedrooms !== 1 ? "s" : ""}</div>
                  </div>
                )}
                {listing.bathrooms !== undefined && (
                  <div className="bg-white border border-border p-3 text-center" style={{ borderRadius: "2px" }}>
                    <Bath size={18} className="text-[#C4622D] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>{listing.bathrooms}</div>
                    <div className="text-xs text-muted-foreground">Bathroom{listing.bathrooms !== 1 ? "s" : ""}</div>
                  </div>
                )}
                {listing.area_sqft && (
                  <div className="bg-white border border-border p-3 text-center" style={{ borderRadius: "2px" }}>
                    <Maximize2 size={18} className="text-[#C4622D] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>{listing.area_sqft}</div>
                    <div className="text-xs text-muted-foreground">sq.ft</div>
                  </div>
                )}
                <div className="bg-white border border-border p-3 text-center" style={{ borderRadius: "2px" }}>
                  <Calendar size={18} className="text-[#C4622D] mx-auto mb-1" />
                  <div className="text-sm font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {new Date(listing.date_listed).toLocaleDateString("en-NP", { day: "numeric", month: "short" })}
                  </div>
                  <div className="text-xs text-muted-foreground">Listed</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  About This Property
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-bold text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs font-medium px-3 py-1.5 bg-[#F5EFE0] text-[#1A1208] border border-border"
                      style={{ borderRadius: "2px" }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Utility Rules */}
              <div>
                <h2 className="text-xl font-bold text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Utility Rules
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Water Availability", value: listing.water_availability, icon: Droplets, yes: "Available", no: "Not Available" },
                    { label: "Bike Parking", value: listing.parking_bike, icon: Bike, yes: "Available", no: "Not Available" },
                    { label: "Car Parking", value: listing.parking_car, icon: Car, yes: "Available", no: "Not Available" },
                    { label: "Electricity Sub-meter", value: listing.electricity_submeter, icon: Zap, yes: "Installed (Pay per use)", no: "Shared meter" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-start gap-3 p-3 border ${item.value ? "bg-[#7A8C6E]/5 border-[#7A8C6E]/20" : "bg-muted/30 border-border"}`}
                        style={{ borderRadius: "2px" }}
                      >
                        <Icon size={16} className={item.value ? "text-[#7A8C6E] mt-0.5 shrink-0" : "text-muted-foreground mt-0.5 shrink-0"} />
                        <div>
                          <div className="text-xs font-semibold text-[#1A1208]">{item.label}</div>
                          <div className={`text-xs mt-0.5 ${item.value ? "text-[#7A8C6E]" : "text-muted-foreground"}`}>
                            {item.value ? item.yes : item.no}
                          </div>
                        </div>
                        {item.value
                          ? <CheckCircle2 size={14} className="text-[#7A8C6E] ml-auto mt-0.5 shrink-0" />
                          : <XCircle size={14} className="text-muted-foreground ml-auto mt-0.5 shrink-0" />
                        }
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map */}
              {listing.lat && listing.lng && (
                <div>
                  <h2 className="text-xl font-bold text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Location Map
                  </h2>
                  <div className="border border-border overflow-hidden" style={{ borderRadius: "2px", height: "280px" }}>
                    <MapView
                      onMapReady={(map) => {
                        map.setCenter({ lat: listing.lat!, lng: listing.lng! });
                        map.setZoom(15);
                        new google.maps.Marker({
                          position: { lat: listing.lat!, lng: listing.lng! },
                          map,
                          title: listing.title,
                        });
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <MapPin size={11} /> {listing.exact_address}
                  </p>
                </div>
              )}

              {/* Report Button (Rule C) */}
              <div className="border border-border bg-white p-4" style={{ borderRadius: "2px" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1208] mb-1">Something wrong with this listing?</h3>
                    <p className="text-xs text-muted-foreground">
                      If this property is already rented, fake, or the landlord is charging broker fees, please report it. High report counts trigger admin review.
                    </p>
                  </div>
                  <button
                    onClick={() => setReportOpen(true)}
                    className="btn-report shrink-0"
                    style={{ borderRadius: "2px" }}
                  >
                    <Flag size={14} />
                    Report
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Price + CTA + Landlord ─────────── */}
            <div className="space-y-4">
              {/* Price Card */}
              <div className="bg-white border border-border p-5 sticky top-32" style={{ borderRadius: "2px" }}>
                {/* Price */}
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="text-4xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {formatNPR(listing.price_npr)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">/month</div>
                  <div className="mt-2 text-sm font-semibold text-[#1A1208]">
                    + {formatNPR(listing.security_deposit_npr)}{" "}
                    <span className="text-muted-foreground font-normal">security deposit</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    (1 month deposit · refundable)
                  </div>
                </div>

                {/* Trust badges */}
                <div className="space-y-2 mb-5">
                  {listing.is_verified && (
                    <div className="flex items-center gap-2 text-xs text-[#7A8C6E]">
                      <ShieldCheck size={14} />
                      <span className="font-semibold">Document Verified Listing</span>
                    </div>
                  )}
                  {listing.is_broker_free && (
                    <div className="flex items-center gap-2 text-xs text-[#C4622D]">
                      <Ban size={14} />
                      <span className="font-semibold">Zero Broker Fee Guaranteed</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={14} />
                    <span>Listing valid until {new Date(listing.expiry_date).toLocaleDateString("en-NP", { day: "numeric", month: "long" })}</span>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="space-y-3">
                  <button
                    onClick={handleCall}
                    className="w-full btn-call justify-center text-base"
                    style={{ borderRadius: "2px" }}
                  >
                    <Phone size={18} />
                    Call Landlord Directly
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full btn-whatsapp justify-center text-base"
                    style={{ borderRadius: "2px" }}
                  >
                    <MessageCircle size={18} />
                    WhatsApp / Viber Chat
                  </button>
                </div>

                {/* Phone number visible */}
                <div className="mt-3 text-center">
                  <a
                    href={`tel:${listing.landlord_phone}`}
                    className="text-sm font-bold text-[#1A1208] hover:text-[#C4622D] transition-colors"
                  >
                    {listing.landlord_phone}
                  </a>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    No registration required to call
                  </div>
                </div>

                {/* Save & Share */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => { setSaved(!saved); toast.success(saved ? "Removed from saved" : "Saved to your list"); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm border transition-colors ${saved ? "bg-[#C4622D]/10 border-[#C4622D] text-[#C4622D]" : "border-border text-muted-foreground hover:border-[#C4622D] hover:text-[#C4622D]"}`}
                    style={{ borderRadius: "2px" }}
                  >
                    <Heart size={14} className={saved ? "fill-[#C4622D]" : ""} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm border border-border text-muted-foreground hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>

              {/* Landlord Card */}
              <div className="bg-[#1A1208] text-[#F5EFE0] p-5" style={{ borderRadius: "2px" }}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE0]/60 mb-3">
                  Landlord
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#C4622D] flex items-center justify-center text-white font-bold text-lg" style={{ borderRadius: "2px" }}>
                    {listing.landlord_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#F5EFE0]">{listing.landlord_name}</div>
                    <div className="text-xs text-[#F5EFE0]/50">Direct Owner</div>
                  </div>
                </div>
                {listing.is_broker_free && (
                  <div className="text-xs text-[#7A8C6E] flex items-start gap-2 bg-[#7A8C6E]/10 p-2.5 border border-[#7A8C6E]/20" style={{ borderRadius: "2px" }}>
                    <Ban size={12} className="shrink-0 mt-0.5" />
                    <span>
                      This landlord has confirmed: <strong>"I am the owner/direct family member. I will not charge broker fees."</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Verification Status */}
              <div className="bg-white border border-border p-4" style={{ borderRadius: "2px" }}>
                <h3 className="text-sm font-bold text-[#1A1208] mb-3 flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#C4622D]" />
                  Verification Status
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Document Submitted", done: true },
                    { label: "Admin Verified", done: listing.is_verified },
                    { label: "Owner Confirmed", done: listing.is_broker_free },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs">
                      {item.done
                        ? <CheckCircle2 size={14} className="text-[#7A8C6E]" />
                        : <Clock size={14} className="text-amber-500" />
                      }
                      <span className={item.done ? "text-[#1A1208]" : "text-muted-foreground"}>
                        {item.label}
                      </span>
                      {!item.done && <span className="text-amber-500 ml-auto">Pending</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {related.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-px bg-[#C4622D]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">
                  More in {listing.location}
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Similar Properties Nearby
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((l, i) => <PropertyCard key={l.property_id} property={l} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {reportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setReportOpen(false)} />
          <div className="relative bg-white w-full max-w-md p-6 shadow-2xl" style={{ borderRadius: "2px" }}>
            <div className="flex items-center gap-2 mb-4">
              <Flag size={18} className="text-red-600" />
              <h3 className="text-lg font-bold text-[#1A1208]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Report This Listing
              </h3>
            </div>
            {reportSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 size={40} className="text-[#7A8C6E] mx-auto mb-3" />
                <p className="font-semibold text-[#1A1208]">Report Submitted</p>
                <p className="text-sm text-muted-foreground mt-1">Our team will review within 24 hours.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Help keep MYRENT safe. Select the reason for reporting:
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "Property is already rented",
                    "Listing details are fake/inaccurate",
                    "Landlord is charging broker fees",
                    "Photos don't match the actual property",
                    "Landlord is not the actual owner",
                    "Other suspicious activity",
                  ].map((reason) => (
                    <label key={reason} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setReportReason(reason)}
                        className={`w-4 h-4 border-2 flex items-center justify-center transition-all shrink-0 ${
                          reportReason === reason
                            ? "bg-red-600 border-red-600"
                            : "border-border group-hover:border-red-400"
                        }`}
                        style={{ borderRadius: "50%" }}
                      >
                        {reportReason === reason && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className="text-sm text-[#1A1208]">{reason}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setReportOpen(false)}
                    className="flex-1 py-2.5 text-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReport}
                    className="flex-1 py-2.5 text-sm bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
