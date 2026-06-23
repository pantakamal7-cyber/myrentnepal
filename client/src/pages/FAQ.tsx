import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ_ITEMS = [
  {
    category: "For Tenants",
    items: [
      {
        q: "Is MYRENT completely free for tenants?",
        a: "Yes. Browsing all listings, viewing landlord contact details, and calling landlords directly is 100% free for tenants. There are no hidden charges, subscription fees, or commissions. MYRENT earns from optional premium listing features for landlords.",
      },
      {
        q: "How do I contact a landlord?",
        a: "On any property detail page, you will see two buttons: 'Call Landlord Directly' and 'WhatsApp / Viber'. Tapping either button connects you instantly to the landlord's registered phone number. No messaging system, no delays — just a direct call.",
      },
      {
        q: "What does the Verified badge (✓) mean?",
        a: "The Verified badge means our team has confirmed: (1) the landlord submitted valid ownership documents (Citizenship, Lalpurja, or Ward Utilities Bill), (2) the property address matches the documents, and (3) the landlord has pledged they will not charge broker fees. We recommend only contacting verified landlords.",
      },
      {
        q: "Can I trust an unverified listing?",
        a: "Unverified listings are properties where the landlord has not yet submitted documents. Proceed with extra caution — always meet in person, never pay in advance, and verify ownership documents yourself before signing any agreement.",
      },
      {
        q: "How do I report a fake or already-rented listing?",
        a: "On every property page, there is a 'Report Listing' button. Click it, select a reason (fake photos, already rented, broker fees charged, etc.) and submit. Our team reviews reports within 24 hours. You can also visit our Report Listing page directly.",
      },
      {
        q: "What should I bring when visiting a property?",
        a: "Bring a copy of your citizenship for registration purposes, and ask the landlord to show their property ownership documents (Lalpurja or citizenship). Take photos of the room, note any damage already present, and get the agreed rent in writing before paying any deposit.",
      },
    ],
  },
  {
    category: "For Landlords",
    items: [
      {
        q: "How do I list my property on MYRENT?",
        a: "Click the '+ List Property' button in the top navigation bar. Fill in your property details across 4 simple steps: (1) Your contact information, (2) Property details and amenities, (3) Upload at least 2 photos, (4) Submit documents for verification. Your listing goes live after admin approval within 24–48 hours.",
      },
      {
        q: "What is the broker-free pledge?",
        a: "When listing a property, you must check a box confirming: 'I am the owner or direct family member of this property. I will NOT charge any broker fees to the tenant.' This is a binding commitment. If 3 unique users report you for charging broker fees, your account will be automatically suspended.",
      },
      {
        q: "Why did my listing disappear after 14 days?",
        a: "To prevent 'ghost listings' (rented properties that stay online for months), every MYRENT listing automatically expires after 14 days. Before expiry, you receive an SMS with a one-tap 'Still Available' button. Tapping it reactivates your listing for another 14 days. If you don't tap it, the listing is hidden but not deleted — you can reactivate it from your dashboard.",
      },
      {
        q: "How long does verification take?",
        a: "Document review typically takes 24–48 hours on working days. Once approved, your listing gets the Verified badge and appears higher in search results. In high-demand areas, a field agent may physically visit your property, which may take up to 3 working days.",
      },
      {
        q: "Can family members list property on my behalf?",
        a: "Yes. Direct family members (spouse, parents, children, siblings) of the property owner can list the property. They must still submit the owner's Citizenship or Lalpurja document and check the broker-free pledge box. The registered phone number must be reachable for tenant enquiries.",
      },
      {
        q: "What happens if someone reports my listing?",
        a: "Our team reviews every report manually within 24 hours. If the report is valid, we will contact you to resolve the issue. 3+ confirmed reports will temporarily hide your listing. 5+ confirmed reports will permanently remove it. We give landlords a chance to respond before taking permanent action.",
      },
    ],
  },
  {
    category: "Platform & Safety",
    items: [
      {
        q: "Is MYRENT only for Kathmandu?",
        a: "Currently, MYRENT focuses exclusively on the Kathmandu Valley — including Kathmandu Metropolitan, Lalitpur Metropolitan, and Bhaktapur. We cover 30+ specific neighborhoods and wards. We plan to expand to Pokhara and other major cities of Nepal in 2026.",
      },
      {
        q: "How is my phone number protected?",
        a: "Your phone number is used for OTP login verification only. We do not share your number with third parties. Landlord phone numbers are visible to tenants to enable direct contact. Tenant phone numbers are never shared with landlords unless you call them directly.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
      >
        <span className="font-semibold text-[#1A1208] text-sm leading-relaxed group-hover:text-[#C4622D] transition-colors">
          {q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#C4622D] shrink-0 mt-0.5" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground shrink-0 mt-0.5" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm text-[#1A1208]/75 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <div className="bg-[#1A1208] text-[#F5EFE0] py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#C4622D]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">Help Centre</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-[#F5EFE0]/70 text-lg">
            Everything you need to know about renting and listing on MYRENT.
          </p>
        </div>
      </div>

      <div className="container max-w-3xl py-12 flex-1 space-y-10">
        {FAQ_ITEMS.map((section) => (
          <section key={section.category}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#C4622D]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D]">{section.category}</span>
            </div>
            <div className="bg-white border border-border px-5" style={{ borderRadius: "2px" }}>
              {section.items.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        {/* Still have questions */}
        <section className="bg-[#1A1208] text-[#F5EFE0] p-8 text-center" style={{ borderRadius: "2px" }}>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Still Have a Question?
          </h2>
          <p className="text-sm text-[#F5EFE0]/70 mb-6">Our support team is available Monday to Saturday, 9am–6pm NPT.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+977014MYRENT" className="flex items-center gap-2 text-sm font-semibold text-[#C4622D] hover:underline">
              <Phone size={15} /> +977-01-MYRENT
            </a>
            <a href="mailto:hello@myrent.com.np" className="flex items-center gap-2 text-sm font-semibold text-[#C4622D] hover:underline">
              <Mail size={15} /> hello@myrent.com.np
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
