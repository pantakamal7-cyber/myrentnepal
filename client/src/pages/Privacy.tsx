import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE0]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="flex-1 container max-w-4xl py-12 px-4">
        <h1 className="text-4xl font-black text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold text-[#C4622D] mb-8">
          Last Updated: June 2026
        </p>

        <div className="bg-white border border-border p-8 space-y-6 text-[#1A1208]/90 text-sm leading-relaxed" style={{ borderRadius: "2px" }}>
          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">1. Information We Collect</h2>
            <p>
              We collect user-provided information including full name, phone number, email address, property details, and verification documents (such as Lalpurja or government ID images) required to publish listings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">2. How We Guard Your Verification Files</h2>
            <p>
              Any uploaded proof-of-ownership document or identity card is treated as highly confidential. These documents are encrypted, stored securely, and are accessible only by our internal review staff. They are <strong>never</strong> displayed publicly to users or shared with third-party advertising companies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">3. Communications</h2>
            <p>
              By providing your telephone number, you consent to receive transaction alerts, verification notifications, and availability check reminders via SMS or direct phone call regarding your current properties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1208] mb-2">4. Data Deletion Rights</h2>
            <p>
              Users retain full authority over their personal profiles. You can request the permanent removal of your account, contact records, and verification images at any time by reaching out to our support team.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
