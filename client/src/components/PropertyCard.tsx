/*
 * MYRENT PropertyCard – Terracotta & Ink design
 * Displays listing summary with verified badge, expiry warning, and quick info
 * Fully Crash-Protected for Real Database Syncing
 */
import { Link } from "wouter";
import { MapPin, Eye, Clock, ShieldCheck, AlertTriangle, Bike, Car, Droplets, Zap } from "lucide-react";
import { formatNPR, getDaysUntilExpiry } from "@/lib/data";

interface PropertyCardProps {
  property: any; // Changed to accept dynamic live database objects
  index?: number;
}

export default function PropertyCard({ property: listing, index = 0 }: PropertyCardProps) {
  // Safe default fallback checks to prevent system-crashing runtime failures
  const expiryDate = listing?.expiry_date || listing?.expiry || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const dateListed = listing?.date_listed || listing?.created_at || new Date().toISOString();
  const imageArray = Array.isArray(listing?.images) && listing.images.length > 0 ? listing.images : ["https://placehold.co"];
  
  // Safe handling for string splits
  const wardString = listing?.ward ? String(listing.ward).split(",")[0] : "Ward -";
  
  // Variable field mappings to match multiple common structural layouts
  const title = listing?.title || "Untitled Property";
  const location = listing?.location || "Kathmandu";
  const propertyType = listing?.property_type || listing?.type || "Flat";
  const viewCount = Number(listing?.view_count || 0);
  const priceNpr = Number(listing?.price_npr || listing?.price || 0);
  const depositNpr = Number(listing?.security_deposit_npr || listing?.deposit || 0);

  // Expiry calculation hook blocks
  const daysLeft = getDaysUntilExpiry(expiryDate);
  const isExpiringSoon = daysLeft <= 3 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  return (
    <Link href={`/property/${listing?.property_id || listing?.id}`}>
      <div className={`property-card animate-fade-in-up ${staggerClass} group`}>
        {/* Image Display */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img
            src={imageArray[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {(listing?.is_verified === true || listing?.is_verified === "TRUE") && (
              <span className="verified-badge">
                <ShieldCheck size={10} />
                Verified
              </span>
            )}
            {(listing?.is_broker_free === true || listing?.is_broker_free === "TRUE") && (
              <span className="broker-free-badge">
                No Broker
              </span>
            )}
          </div>
          {/* Property type pill */}
          <div className="absolute top-2 right-2">
            <span
              className="text-xs font-semibold px-2 py-0.5 text-white"
              style={{
                background: "rgba(26,18,8,0.75)",
                backdropFilter: "blur(4px)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {propertyType}
            </span>
          </div>
          {/* View count */}
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 text-white text-xs"
            style={{
              background: "rgba(26,18,8,0.6)",
              backdropFilter: "blur(4px)",
              padding: "2px 6px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Eye size={10} />
            {viewCount}
          </div>
        </div>

        {/* Content Layout Body */}
        <div className="p-4">
          {/* Location details */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <MapPin size={11} className="text-[#C4622D]" />
            <span className="font-medium text-[#C4622D]">{location}</span>
            <span className="text-muted-foreground/60">· {wardString}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-[#1A1208] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#C4622D] transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h3>

          {/* Price details */}
          <div className="mb-3">
            <span
              className="text-2xl font-bold text-[#1A1208]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {formatNPR(priceNpr)}
            </span>
            <span className="text-sm text-muted-foreground ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              /month
            </span>
            {depositNpr > 0 && (
              <div className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                + {formatNPR(depositNpr)} deposit
              </div>
            )}
          </div>

          {/* Utility tracking parameter rows */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`flex items-center gap-1 text-xs ${listing?.water_availability ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Droplets size={12} />
              Water
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${listing?.parking_bike ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Bike size={12} />
              Bike
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${listing?.parking_car ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Car size={12} />
              Car
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${listing?.electricity_submeter ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Zap size={12} />
              Sub-meter
            </span>
          </div>

          {/* Condition tracking display fields */}
          {isExpiringSoon && (
            <div className="expiry-warning flex items-center gap-2 mb-2">
              <Clock size={12} className="text-amber-600 shrink-0" />
              <span>Listing expires in {daysLeft} day{daysLeft !== 1 ? "s" : ""} — contact soon</span>
            </div>
          )}
          {isExpired && (
            <div className="expiry-warning flex items-center gap-2 mb-2 border-l-red-500 bg-red-50">
              <AlertTriangle size={12} className="text-red-600 shrink-0" />
              <span className="text-red-700">Listing may be expired — verify availability</span>
            </div>
          )}

          {/* Footer view details row */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Listed {new Date(dateListed).toLocaleDateString("en-NP", { day: "numeric", month: "short" })}
            </span>
            <span
              className="text-xs font-semibold text-[#C4622D] group-hover:underline"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

