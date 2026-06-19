import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Verification() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Verification Process</h1>
        <div className="space-y-4 text-sm text-[#1A1208]/80 leading-relaxed">
          <p>Our verification process ensures 100% direct connections between tenants and real landlords across Kathmandu.</p>
          <h2 className="text-lg font-bold text-[#1A1208] mt-4">Step 1: Document Review</h2>
          <p>Landlords submit property ownership documents or citizenship proofs to verify their structural identity.</p>
          <h2 className="text-lg font-bold text-[#1A1208] mt-4">Step 2: Virtual or Physical Check</h2>
          <p>Our field agents cross-check structural details, water availability, and parking spaces before turning on the Verified badge status tracker.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
