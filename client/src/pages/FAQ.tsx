import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQ() {
  const faqs = [
    { q: "Is MYRENT free for tenants?", a: "Yes, browsing listings and contacting direct property owners is completely free for tenants. No hidden commissions or broker charges." },
    { q: "How do I list my property?", a: "Click the '+ List Property' button in the navbar, fill out your room/flat criteria details, and submit it for our verification check loop." },
    { q: "What does the Verified badge mean?", a: "It means our team has cross-verified the property location parameters, room layout conditions, and confirmed the landlord details directly." }
  ];
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="container px-4 flex-1 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1208] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border pb-4">
              <h3 className="font-bold text-[#1A1208] text-base mb-1.5">{faq.q}</h3>
              <p className="text-sm text-[#1A1208]/80 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
