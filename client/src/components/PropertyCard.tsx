/*
 * MYRENT PropertyCard – Terracotta & Ink design
 * Displays listing summary with verified badge, expiry warning, and quick info
 */
import { Link } from "wouter";
import { MapPin, Eye, Clock, ShieldCheck, AlertTriangle, Bike, Car, Droplets, Zap } from "lucide-react";
import { Listing, formatNPR, getDaysUntilExpiry } from "@/lib/data";

interface PropertyCardProps {
  listing: Listing;
  index?: number;
}

export default function PropertyCard({ listing, index = 0 }: PropertyCardProps) {
  const daysLeft = getDaysUntilExpiry(listing.expiry_date);
  const isExpiringSoon = daysLeft <= 3 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  return (
    <Link href={`/property/${listing.property_id}`}>
      <div className={`property-card animate-fade-in-up ${staggerClass} group`}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {listing.is_verified && (
              <span className="verified-badge">
                <ShieldCheck size={10} />
                Verified
              </span>
            )}
            {listing.is_broker_free && (
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
              {listing.property_type}
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
            {listing.view_count}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <MapPin size={11} className="text-[#C4622D]" />
            <span className="font-medium text-[#C4622D]">{listing.location}</span>
            <span className="text-muted-foreground/60">· {listing.ward.split(",")[0]}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-[#1A1208] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#C4622D] transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {listing.title}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <span
              className="text-2xl font-bold text-[#1A1208]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {formatNPR(listing.price_npr)}
            </span>
            <span className="text-sm text-muted-foreground ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              /month
            </span>
            <div className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              + {formatNPR(listing.security_deposit_npr)} deposit
            </div>
          </div>

          {/* Utility icons */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`flex items-center gap-1 text-xs ${listing.water_availability ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Droplets size={12} />
              Water
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${listing.parking_bike ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Bike size={12} />
              Bike
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${listing.parking_car ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Car size={12} />
              Car
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${listing.electricity_submeter ? "text-[#7A8C6E]" : "text-muted-foreground/40 line-through"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Zap size={12} />
              Sub-meter
            </span>
          </div>

          {/* Expiry warning */}
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

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Listed {new Date(listing.date_listed).toLocaleDateString("en-NP", { day: "numeric", month: "short" })}
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
