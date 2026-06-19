import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AntiFraud() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Anti-Fraud Policy</h1>
        <div className="space-y-4 text-sm text-[#1A1208]/80 leading-relaxed">
          <p>At MYRENT, we maintain a zero-tolerance policy for fake listings and rental scams in Kathmandu.</p>
          <h2 className="text-lg font-bold text-[#1A1208] mt-4">1. Verified Landlords</h2>
          <p>All property listings must undergo ownership confirmation before being marked with our official verified badge.</p>
          <h2 className="text-lg font-bold text-[#1A1208] mt-4">2. Safe Transactions</h2>
          <p>Never send advance booking deposits via eSewa, Khalti, or bank transfer before physically inspecting the property and meeting the landlord face-to-face.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
