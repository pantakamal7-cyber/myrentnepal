/*
 * MYRENT 404 Page – "Nepali Terracotta & Ink" Design
 */
import { useLocation } from "wouter";
import { Home, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-sm">
          <div
            className="text-8xl font-black text-[#C4622D]/20 mb-4 select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            404
          </div>
          <h1
            className="text-3xl font-black text-[#1A1208] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            This page doesn't exist or the listing may have expired. Try browsing our verified listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1208] text-white text-sm font-semibold hover:bg-[#2a2010] transition-colors"
              style={{ borderRadius: "2px" }}
            >
              <Home size={16} /> Go Home
            </button>
            <button
              onClick={() => navigate("/listings")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#a85226] transition-colors"
              style={{ borderRadius: "2px" }}
            >
              <Search size={16} /> Browse Listings
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
