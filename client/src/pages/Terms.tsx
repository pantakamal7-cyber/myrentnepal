import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="flex-1 container max-w-3xl py-12 px-4">
        <h1 className="text-4xl font-black text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: June 2026</p>
        
        <div className="space-y-6 text-[#1A1208]/90 leading-relaxed text-sm">
          <section className="bg-white p-6 border border-border" style={{ borderRadius: "2px" }}>
            <h2 className="font-bold text-lg mb-2 text-[#C4622D]">1. 100% Broker-Free Commitment</h2>
            <p>MYRENT is an exclusive direct-to-tenant property marketplace. Real estate brokers, agents, and middle-men are strictly prohibited from listing properties or charging commissions. If you are found to be a broker representing a property, your listing profile will be permanently banned immediately.</p>
          </section>

          <section className="bg-white p-6 border border-border" style={{ borderRadius: "2px" }}>
            <h2 className="font-bold text-lg mb-2 text-[#1A1208]">2. Listing Validation & Deletion</h2>
            <p>To preserve data accuracy for tenants across Kathmandu, all uploaded listings remain live for a maximum period of <strong>14 days</strong>. Upon expiration, property owners will receive an verification SMS prompting them to confirm if the room remains available or has been rented out.</p>
          </section>

          <section className="bg-white p-6 border border-border" style={{ borderRadius: "2px" }}>
            <h2 className="font-bold text-lg mb-2 text-[#1A1208]">3. Limitation of Liability</h2>
            <p>MYRENT acts purely as an information board matching house owners with tenants. We do not own, manage, or inspect physical room setups. We are not liable for neighborhood water shortages, landlord-tenant arguments, rent pricing disputes, or contract breakages.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
